import { TonClient } from "ton";

const rpcUrl = "https://mainnet.tonhubapi.com/jsonRPC";

export const client = new TonClient({ endpoint: rpcUrl });
