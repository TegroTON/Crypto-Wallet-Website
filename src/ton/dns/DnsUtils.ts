import BN from 'bn.js';
import { Address, Cell, TonClient } from 'ton';
import { Buffer } from 'buffer';
import { sha256 } from 'ton-crypto';

export const DNS_CATEGORY_NEXT_RESOLVER = 'dns_next_resolver'; // Smart Contract address
export const DNS_CATEGORY_WALLET = 'wallet'; // Smart Contract address
export const DNS_CATEGORY_SITE = 'site'; // ADNL address

export async function categoryToBN(category: string | undefined): Promise<BN> {
    if (!category) return new BN(0); // all categories
    const categoryBytes = Buffer.from(category, 'utf-8');
    const categoryHash = await sha256(categoryBytes);
    return new BN(categoryHash.toString('hex'), 16);
}

export function createSmartContractAddressRecord(smartContractAddress: Address): Cell {
    const cell = new Cell();
    cell.bits.writeUint(0x9fd3, 16); // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L827
    cell.bits.writeAddress(smartContractAddress);
    cell.bits.writeUint(0, 8);
    return cell;
}

export function createAdnlAddressRecord(adnlAddress: BN): Cell {
    const cell = new Cell();
    cell.bits.writeUint(0xad01, 16); // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L821
    cell.bits.writeUint(adnlAddress, 256);
    cell.bits.writeUint(0, 8);
    return cell;
}

export function createNextResolverRecord(smartContractAddress: Address): Cell {
    const cell = new Cell();
    cell.bits.writeUint(0xba93, 16); // https://github.com/ton-blockchain/ton/blob/7e3df93ca2ab336716a230fceb1726d81bac0a06/crypto/block/block.tlb#L819
    cell.bits.writeAddress(smartContractAddress);
    return cell;
}

export function parseSmartContractAddressImpl(
    cell: Cell,
    prefix0: number,
    prefix1: number,
): Address | null {
    const ds = cell.beginParse();
    if (ds.readUintNumber(8) !== prefix0 || ds.readUintNumber(8) !== prefix1) throw new Error('Invalid dns record value prefix');
    return ds.readAddress();
}

export function parseSmartContractAddressRecord(cell: Cell): Address | null {
    return parseSmartContractAddressImpl(cell, 0x9f, 0xd3);
}

export function parseNextResolverRecord(cell: Cell): Address | null {
    return parseSmartContractAddressImpl(cell, 0xba, 0x93);
}

export async function dnsResolveImpl(
    client: TonClient,
    dnsAddress: Address,
    rawDomainBuffer: Buffer,
    category: string | undefined,
    oneStep: boolean | undefined,
): Promise<Cell | Address | BN | null> {
    const len = rawDomainBuffer.length * 8;

    const domainCell = new Cell();
    domainCell.bits.writeBuffer(rawDomainBuffer);

    const categoryBN = await categoryToBN(category);
    await client;
    const {
        stack,
        exit_code,
    } = await client.callGetMethodWithError(
        dnsAddress,
        'dnsresolve',
        [['tvm.Slice', domainCell.toBoc({ idx: false })
            .toString('base64')], ['num', categoryBN.toString()]],
    );
    if (stack.length !== 2) {
        throw new Error('Invalid dnsresolve response');
    }
    const resultLen = new BN(stack[0][1].replace(/^0x/, ''), 'hex').toNumber();

    const cell = Cell.fromBoc(Buffer.from(stack[1][1].bytes, 'base64'))[0];

    if (cell && !cell.bits) { // not a Cell
        throw new Error('Invalid dnsresolve response');
    }

    if (resultLen === 0) {
        return null; // domain cannot be resolved
    }

    if (resultLen % 8 !== 0) {
        throw new Error('domain split not at a component boundary');
    }

    if (resultLen > len) {
        throw new Error(`invalid response ${resultLen}/${len}`);
    } else if (resultLen === len) {
        if (category === DNS_CATEGORY_NEXT_RESOLVER) {
            return cell ? parseNextResolverRecord(cell) : null;
        }
        if (category === DNS_CATEGORY_WALLET) {
            return cell ? parseSmartContractAddressRecord(cell) : null;
        }
        if (category === DNS_CATEGORY_SITE) {
            return cell || null; // todo: convert to BN;
        }
        return cell;
    } else {
        if (!cell) {
            return null; // domain cannot be resolved
        }
        const nextAddress = parseNextResolverRecord(cell);
        if (oneStep) {
            if (category === DNS_CATEGORY_NEXT_RESOLVER) {
                return nextAddress;
            }
            return null;
        }
        return dnsResolveImpl(
            client,
            nextAddress as Address,
            rawDomainBuffer.slice(resultLen / 8),
            category,
            false,
        );
    }
}

export function domainToBuffer(domain: string): Buffer {
    if (!domain || !domain.length) {
        throw new Error('empty domain');
    }
    if (domain === '.') {
        return Buffer.from([0]);
    }

    const domainNorm = domain.toLowerCase();

    for (let i = 0; i < domainNorm.length; i++) {
        if (domainNorm.charCodeAt(i) <= 32) {
            throw new Error('bytes in range 0..32 are not allowed in domain names');
        }
    }

    for (let i = 0; i < domainNorm.length; i++) {
        const s = domainNorm.substring(i, i + 1);
        for (let c = 127; c <= 159; c++) { // another control codes range
            if (s === String.fromCharCode(c)) {
                throw new Error('bytes in range 127..159 are not allowed in domain names');
            }
        }
    }

    const arr = domainNorm.split('.');

    arr.forEach((part) => {
        if (!part.length) {
            throw new Error('domain name cannot have an empty component');
        }
    });

    const rawDomain = `\0${arr.reverse()
        .join('\0')}\0`;
    return Buffer.from(rawDomain, 'utf-8');
}

export async function dnsResolve(
    client: TonClient,
    rootDnsAddress: Address,
    domain: string,
    category: string | undefined,
    oneStep: boolean | undefined,
): Promise<Cell | Address | BN | null> {
    console.log('domain', domain);
    const rawDomainBuffer = domainToBuffer(domain);

    return dnsResolveImpl(client, rootDnsAddress, rawDomainBuffer, category, oneStep);
}
