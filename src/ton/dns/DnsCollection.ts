import {
    Address, Cell, Contract, contractAddress, TonClient,
} from 'ton';
import BN from 'bn.js';
import { Buffer } from 'buffer';
import { DnsCollectionSource } from './sources/DnsCollectionSource';
import { DnsItem } from './DnsItem';
import { dnsResolve } from './DnsUtils';

export class DnsCollection implements Contract {
    static create(client: TonClient, opts: {
        collectionContent: Cell,
        dnsItemCodeHex: string
        address?: Address
    }) {
        const wc = 0;
        const source = DnsCollectionSource.create({
            workchain: 0,
            collectionContent: opts.collectionContent,
            dnsItemCodeHex: opts.dnsItemCodeHex,
        });
        const address = contractAddress(source);

        return new DnsCollection(
            client,
            wc,
            opts.collectionContent,
            opts.dnsItemCodeHex,
            source,
            address,
        );
    }

    readonly client: TonClient;

    readonly address: Address;

    readonly source: DnsCollectionSource;

    readonly wc: number;

    readonly collectionContent: Cell;

    readonly dnsItemCodeHex: string;

    constructor(
        client: TonClient,
        wc: number,
        collectionContent: Cell,
        dnsItemCodeHex: string,
        source: DnsCollectionSource,
        address: Address,
    ) {
        this.client = client;
        this.address = address;
        this.source = source;
        this.wc = wc;
        this.collectionContent = collectionContent;
        this.dnsItemCodeHex = dnsItemCodeHex;
    }

    async getCollectionData(): Promise<{
        collectionContentUri: string,
        collectionContent: Cell,
        ownerAddress: Address | null,
        nextItemIndex: number,
    }> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_collection_data');

        const collectionContent = Cell.fromBoc(Buffer.from(stack[1][1].bytes, 'base64'))[0];
        const collectionContentUri = collectionContent.bits.buffer.slice(1)
            .toString();
        return {
            collectionContentUri,
            collectionContent,
            ownerAddress: null,
            nextItemIndex: 0,
        };
    }

    async getNftItemContent(nftItem: DnsItem): Promise<{
        isInitialized: boolean,
        index: BN,
        collectionAddress: Address | null,
        ownerAddress: Address | null,
        contentCell: Cell
    }> {
        return nftItem.getData();
    }

    async getNftItemAddressByIndex(index: BN): Promise<Address> {
        const { stack } = await this.client.callGetMethod(this.address, 'get_nft_address_by_index', [['num', index.toString()]]);

        return Cell
            .fromBoc(Buffer.from(stack[0][1].bytes, 'base64'))[0]
            .beginParse()
            .readAddress()!;
    }

    async resolve(
        domain: string,
        category?: string,
        oneStep?: boolean,
    ): Promise<Cell | Address | BN | null> {
        return dnsResolve(this.client, this.address, domain, category, oneStep);
    }
}
