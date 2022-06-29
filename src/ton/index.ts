import { TonClient } from 'ton';
import { Dns } from './dns/Dns';

const rpcUrl = 'https://mainnet.tonhubapi.com/jsonRPC';
const testRpcUrl = 'https://testnet.toncenter.com/api/v2/jsonRPC';
const testApiKey = '09f1e024cbb6af1b0f608631c42b1427313407b7aa385009195e3f5c09d51fb8';

export const client = new TonClient({ endpoint: rpcUrl });

export const testClient = new TonClient({
    endpoint: testRpcUrl,
    apiKey: testApiKey,
});

export const DNS = new Dns(testClient);
