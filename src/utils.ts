import { Coins } from 'ton3-core';
import {
    currencies, Currency, languages, Language, WalletInfo, NetworkType, networks,
} from './types';
import storage from './utils/storage';

export function round(number: number, scale: number) {
    return Math.round((number + Number.EPSILON) * 10 ** scale) / 10 ** scale;
}

export async function getCurrency(): Promise<Currency> {
    const cur = await storage.getItem('currency') || '';
    if (cur in currencies) {
        return cur as Currency;
    }
    const default_cur = 'usd';
    await storage.setItem('currency', default_cur);
    return default_cur as Currency;
}

export async function setCurrency(currency: Currency): Promise<Currency> {
    await storage.setItem('currency', currency);
    return currency;
}

export async function setLanguage(language: Language): Promise<Language> {
    await storage.setItem('language', language);
    return language;
}

export async function getLanguage(): Promise<Language> {
    const lang = await storage.getItem('language') || '';
    if (lang in languages) {
        return lang as Language;
    }
    return setLanguage('en');
}

export async function getNextLanguage(): Promise<Language> {
    const lang = await getLanguage();
    const langList = Object.keys(languages);
    return (langList[langList.indexOf(lang) + 1] || langList[0]) as Language;
}

export async function switchLanguage() {
    await setLanguage(await getNextLanguage());
}

export async function writeState(state: WalletInfo) {
    await storage.setItem('state', JSON.stringify({
        ...state,
        wallet: {
            ...state.wallet,
            balance: state.wallet.balance.toString(),
            transactions: [],
            jettons: [],
        },
    }));
}

export async function readState(): Promise<WalletInfo | null> {
    const state_str = await storage.getItem('state');
    if (state_str) {
        let result = JSON.parse(state_str) as WalletInfo;
        result = {
            ...result,
            wallet: {
                ...result.wallet,
                balance: new Coins(result.wallet.balance),
            },
        };
        return result;
    }
    return null;
}

export async function clearStorage() {
    const lang = await getLanguage();
    await storage.clear();
    await setLanguage(lang);
}

export const getWindowId = () => new Promise((resolve) => {
    const IS_EXTENSION = !!(self.chrome && chrome.runtime && chrome.runtime.onConnect);
    if (IS_EXTENSION) {
        chrome.tabs.getCurrent((tab) => {
            resolve(tab?.windowId);
        });
    } else {
        resolve(undefined);
    }
});

export async function setNetwork(network: NetworkType): Promise<NetworkType> {
    await storage.setItem('network', network);
    return network;
}

export async function getNetwork(): Promise<NetworkType> {
    const net = await storage.getItem('network') || '';
    if (networks.includes(net)) {
        return net as NetworkType;
    }
    return setNetwork('TonMainnet');
}

export async function getNextNetwork(): Promise<NetworkType> {
    const net = await getNetwork();
    return (networks[networks.indexOf(net) + 1] || networks[0]) as NetworkType;
}

export async function switchNetwork() {
    await setNetwork(await getNextNetwork());
}
