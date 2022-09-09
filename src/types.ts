import { Address, Cell, Coins } from 'ton3-core';
import { JettonTransaction } from '@tegro/ton3-client';

export interface LocationParams {
    from: string;
    to?: string;
    noBack?: boolean;
    noLang?: boolean;
    data: {
        walletInfo?: WalletInfo;
        send?: Send;
        jettonAddress?: string;
        pass?: string;
        jettonInfo?: JettonInfo;
        words?: string[];
        selectedJettons?: JettonsData;
        taskInfo?: any;
    };
}

export const walletTypes = ['v3R2', 'v4R2'];

export type WalletType = typeof walletTypes[number];

export type WalletInfo = {
    mnemonic: string;
    encrypted: boolean;
    public_key: string; // hex
    walletType: WalletType;
    wallet: Wallet;
};

export type SendDataType = ('hex' | 'text' | 'base64' | 'boc');

export interface Send {
    data: string;
    dataType: SendDataType;
    stateInit?: string;
    jetton?: JettonInfo;
    address: string;
    amount: number;
    status?: string;
}

type Wallet = {
    address: string;
    balance: Coins;
    seqno?: number;
    transactions?: Transaction[];
    jettons?: JettonInfo[];
};

export interface JettonInfo {
    jetton: Jetton;
    wallet: Address;
    balance: Coins;
    transactions?: JettonTransaction[];
}

export interface Jetton {
    address: string;
    meta: JettonMeta;
}

export interface JettonMeta {
    name: string;
    symbol: string;
    description?: string;
    image?: string;
    image_data?: string;
    decimals: number;
}

export interface JettonsData {
    // for localstorage
    [key: string]: JettonMeta;
}

export interface Transaction {
    type: string;
    amount: Coins;
    address: Address;
    msg: string;
    timestamp: number;
}

export const currencies = {
    usd: '$',
    rub: '₽',
    uah: '₴',
    eur: '€',
};

export type Currency = keyof typeof currencies;

export const languages = {
    en: 'English',
    ru: 'Русский',
};

export type Language = keyof typeof languages;

export const extensionMethods = ['ton_rawSign'];

export type ExtensionMethod = typeof extensionMethods[number];

export type TaskStorage = {
    id: number,
    windowId: number,
    method: ExtensionMethod,
    params: any,
    result?: any
};

export const networks = ['TonMainnet', 'TonTestnet'];

export type NetworkType = typeof networks[number];
