import BN from 'bn.js';
import { Buffer } from 'buffer';
import { JettonWalletContract } from './ton/jettons/contracts/JettonWalletContract';
import { JettonTransaction } from './ton/jettons/types/JettonTransaction';

export interface LocationParams {
    from: string;
    noBack?: boolean;
    noLang?: boolean;
    data: {
        walletInfo?: WalletInfo;
        send?: Send;
        jettonAddress?: string;
        pass?: string;
        jettonInfo?: JettonInfo;
        words?: string[]
    };
}

export const walletTypes = ['v3r2', 'v4r2'];

export type WalletType = typeof walletTypes[number];

export interface WalletInfo {
    mnemonic: string;
    encrypted: string;
    public_key: Buffer;
    walletType: WalletType;
    wallet: Wallet;
}

export interface Send {
    jetton?: JettonInfo;
    address: string;
    amount: number;
    message: string;
    status?: string;
}

interface Wallet {
    address: string;
    balance: number;
    seqno?: number;
    transactions?: Transaction[];
    jettons?: JettonInfo[];
}

export interface JettonInfo {
    jetton: Jetton;
    wallet: JettonWalletContract;
    balance: number;
    transactions?: JettonTransaction[];
}

export interface Jetton {
    address: string;
    meta: JettonMeta;
}

export interface JettonMeta {
    name?: string;
    symbol: string;
    description?: string;
    image?: string;
    image_data?: string;
    decimal?: number;
}

export interface JettonsData {
    // for localstorage
    [key: string]: JettonMeta;
}

export interface Transaction {
    type: string;
    amount: number | BN;
    address: string;
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
