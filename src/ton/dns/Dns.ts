import { Address, Cell, TonClient } from 'ton';
import BN from 'bn.js';
import { DNS_CATEGORY_WALLET, dnsResolve } from './DnsUtils';

const rootDnsAddress = 'Ef_BimcWrQ5pmAWfRqfeVHUCNV8XgsLqeAMBivKryXrghFW3';

export class Dns {
    constructor(
        private readonly client: TonClient,
    ) {
    }

    getRootDnsAddress(): Address {
        return Address.parse(rootDnsAddress);
    }

    async resolve(
        domain: string,
        category: string | undefined,
        oneStep = false,
    ): Promise<Cell | Address | BN | null> {
        return dnsResolve(this.client, this.getRootDnsAddress(), domain, category, oneStep);
    }

    getWalletAddress(domain: string): Promise<Cell | Address | BN | null> {
        return this.resolve(domain, DNS_CATEGORY_WALLET);
    }
}
