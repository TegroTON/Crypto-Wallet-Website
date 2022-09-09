import { TonClient } from '@tegro/ton3-client';

// testnet
// const url = 'https://testnet.toncenter.com/api/v2/jsonRPC';
// const apiKey = '09f1e024cbb6af1b0f608631c42b1427313407b7aa385009195e3f5c09d51fb8';

// mainnet
// const url = 'https://toncenter.com/api/v2/jsonRPC';
const url = 'https://api.tonhold.com/jsonRPC';
// const apiKey = '1048eba2377df542264d2e25589a36b9608d3c746d82b8e99284bc59845b041b';
const apiKey = 'e6eaf213704bad78af061adcbf153727584277b4149c4b16e3a5809ad7b71671'; // запасной

// sandbox
// const url = 'https://sandbox.tonhubapi.com/jsonRPC'
// const apiKey = ''

export const tonClient = new TonClient({
    endpoint: url,
    apiKey,
});
