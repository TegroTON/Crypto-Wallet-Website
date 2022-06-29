import {
    Cell, ConfigStore, ContractSource,
} from 'ton';

const DNS_COLLECTION_CODE_HEX = 'B5EE9C72410217010001F6000114FF00F4A413F4BCF2C80B0102016202030202CC0405020120111202012006070201D40F1002012008090201200D0E01F743221C70094840FF2F0DED0D3030171B0915BE0FA403001D31FED44D0D4D4303122C0008E5132F00320D74920C218F2E0C8208103F8BBF2E0C978A908C000F2E0CA20F004F2E0CB20F901810309F833206EB38E10D0F4043052108307F40E6FA131F2D0CC9130E2C858CF16C9C85004CF1613CCC9F009E010235F0380A0201200B0C000EC007DC840FF2F000331C27C074C1C07000082CE500A98200B784B98C4830003CB43260004F3223880875D244B5C61673C58875D2883000082CE6C070007CB837C0B50C3400A44C78B98C727420004D47021D7498E1C5CBA20B38E153002D30721C12102C02E12B120B39402A60802DE13DEE66C12BA8002D501C8CBFFF828CF16C97020C8CB0113F400F400CB00C98001B3E401D3232C084B281F2FFF274200039167C01DC087C021DE0063232C15633C59C3E80B2DAF3333260103EC020020120131402012015160007B8B5D318001FBA7A3ED44D0D4D43031F0077001F00880019B905BED44D0D4D4303070016D8009DBA30C3020D74978A908C000F2E04D20D70A07C00021D749C0085210B0935B786DE0209501D3073101DE21F0025122D71830F9018200BA93C8CB0F01820167A3ED43D8CF16C90191789170E212A0018E5BDE763';

export class DnsCollectionSource implements ContractSource {
    static create(opts: { workchain: number, collectionContent: Cell, dnsItemCodeHex: string }) {
        // Resolve parameters
        const {
            workchain,
            collectionContent,
            dnsItemCodeHex,
        } = opts;

        // Build initial code and data
        const initialCode = Cell.fromBoc(DNS_COLLECTION_CODE_HEX)[0];
        const initialData = new Cell();
        initialData.withReference(collectionContent);
        initialData.withReference(Cell.fromBoc(dnsItemCodeHex)[0]);

        return new DnsCollectionSource({
            initialCode,
            initialData,
            workchain,
            collectionContent,
            dnsItemCodeHex,
        });
    }

    static restore(backup: string) {
        const store = new ConfigStore(backup);
        return DnsCollectionSource.create({
            workchain: store.getInt('wc'),
            collectionContent: Cell.fromBoc(store.getBuffer('collectionContent'))[0],
            dnsItemCodeHex: store.getString('dnsItemCodeHex'),
        });
    }

    readonly initialCode: Cell;

    readonly initialData: Cell;

    readonly workchain: number;

    readonly collectionContent: Cell;

    readonly dnsItemCodeHex: string;

    readonly type = 'org.ton.dns.collection';

    private constructor(opts: {
        initialCode: Cell,
        initialData: Cell,
        workchain: number,
        collectionContent: Cell,
        dnsItemCodeHex: string
    }) {
        this.initialCode = opts.initialCode;
        this.initialData = opts.initialData;
        this.workchain = opts.workchain;
        this.collectionContent = opts.collectionContent;
        this.dnsItemCodeHex = opts.dnsItemCodeHex;
        Object.freeze(this);
    }

    backup = () => {
        const store = new ConfigStore();
        store.setInt('wc', this.workchain);
        store.setBuffer('collectionContent', this.collectionContent.toBoc({ idx: false }));
        store.setString('dnsItemCodeHex', this.dnsItemCodeHex);
        return store.save();
    };

    describe = () => 'TON Dns item contract';
}
