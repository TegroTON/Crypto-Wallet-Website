// ATTENTION: Release Candidate, interface may change

import {
    Address, Cell, Contract, contractAddress, ContractSource, TonClient,
} from 'ton';
import BN from 'bn.js';
import { Buffer } from 'buffer';
import { DnsItemSource } from './sources/DnsItemSource';
import { dnsResolve } from './DnsUtils';

export class DnsItem implements Contract {
    static create(client: TonClient, opts: {
        index: BN,
        collectionAddress: Address,
        address?: Address
    }) {
        const wc = 0;
        const source = DnsItemSource.create({
            workchain: 0,
            index: opts.index,
            collectionAddress: opts.collectionAddress,
        });
        const address = contractAddress(source);

        return new DnsItem(
            client,
            wc,
            opts.index,
            opts.collectionAddress,
            source,
            address,
        );
    }

    readonly client: TonClient;

    readonly address: Address;

    readonly source: DnsItemSource;

    readonly wc: number;

    readonly index: BN;

    readonly collectionAddress: Address;

    constructor(
        client: TonClient,
        wc: number,
        index: BN,
        collectionAddress: Address,
        source: DnsItemSource,
        address: Address,
    ) {
        this.client = client;
        this.address = address;
        this.source = source;
        this.wc = wc;
        this.index = index;
        this.collectionAddress = collectionAddress;
    }

    async getData(): Promise<{
        isInitialized: boolean,
        index: BN,
        collectionAddress: Address | null,
        ownerAddress: Address | null,
        contentCell: Cell
    }> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_nft_data');

        const isInitialized = stack[0][1].toNumber() === -1;
        const index = new BN(stack[1][1]);
        const collectionAddress = Address.parse(stack[2][1]);
        const ownerAddress = isInitialized ? Address.parse(stack[3][1]) : null;
        const contentCell = Cell.fromBoc(stack[4][1])[0];

        return {
            isInitialized,
            index,
            collectionAddress,
            ownerAddress,
            contentCell,
        };
    }

    createTransferBody(params: {
        queryId?: number,
        newOwnerAddress: Address,
        forwardAmount?: BN,
        forwardPayload?: Buffer,
        responseAddress: Address
    }): Cell {
        const cell = new Cell();
        cell.bits.writeUint(0x5fcc3d14, 32); // transfer op
        cell.bits.writeUint(params.queryId || 0, 64);
        cell.bits.writeAddress(params.newOwnerAddress);
        cell.bits.writeAddress(params.responseAddress);
        cell.bits.writeBit(false); // null custom_payload
        cell.bits.writeCoins(params.forwardAmount || new BN(0));
        cell.bits.writeBit(false); // forward_payload in this slice, not separate cell

        if (params.forwardPayload) {
            cell.bits.writeBuffer(params.forwardPayload);
        }
        return cell;
    }

    createGetStaticDataBody(params: { queryId?: number }): Cell {
        const body = new Cell();
        body.bits.writeUint(0x2fcb26a2, 32); // OP
        body.bits.writeUint(params.queryId || 0, 64); // query_id
        return body;
    }

    async getDomain(): Promise<string> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_domain');
        return Buffer.from(stack[0][1])
            .toString('utf-8');
    }

    async getAuctionInfo(): Promise<{
        maxBidAddress: Address | null,
        maxBidAmount: BN,
        auctionEndTime: number
    }> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_auction_info');
        const maxBidAddress = Address.parse(stack[0][1]);
        const maxBidAmount = new BN(stack[1][1]);
        const auctionEndTime = new BN(stack[2][1]).toNumber();
        return {
            maxBidAddress,
            maxBidAmount,
            auctionEndTime,
        };
    }

    async getLastFillUpTime(): Promise<number> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_last_fill_up_time');
        return new BN(stack[0][1]).toNumber();
    }

    async resolve(
        domain: string,
        category?: string,
        oneStep?: boolean,
    ): Promise<Cell | Address | BN | null> {
        return dnsResolve(this.client, this.address, domain, category, oneStep);
    }
}

// /**
//  * params   {{category: string, value: Cell|null, queryId?: number}}
//  * @return {Cell}
//  */
// DnsItem.createChangeContentEntryBody = async (params) => {
//     const body = new Cell();
//     body.bits.writeUint(1234, 32); // OP
//     body.bits.writeUint(params.queryId || 0, 64); // query_id
//     body.bits.writeUint(await categoryToBN(params.category), 256);
//     if (params.value) {
//         body.refs[0] = params.value;
//     }
//     return body;
// };
//
// DnsItem.codeHex = DNS_ITEM_CODE_HEX;
//
