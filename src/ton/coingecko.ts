import { CoinFullInfo } from 'coingecko-api-v3';
import { Currency } from '../types';

async function callCoingecko() {
    return fetch('https://api.coingecko.com/api/v3/coins/the-open-network')
        .then((response) => response.json())
        .then((data) => data as CoinFullInfo);
}

export async function getTONPrice(currency: Currency = 'usd'): Promise<PriceInfo> {
    const marketInfo = await callCoingecko();
    const price = marketInfo.market_data?.current_price?.[currency] || 0;
    const priceChange = marketInfo.market_data?.price_change_percentage_24h_in_currency?.[currency] || 0;
    return { price, priceChange };
}

export interface PriceInfo {
    price: number,
    priceChange: number
}
