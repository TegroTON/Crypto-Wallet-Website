import { Coins } from 'ton3-core';
import { bytesToHex } from 'ton3-core/dist/utils/helpers';
import { StandardWalletContract, Wallet } from '@tegro/ton3-contracts';
import {
    getPubKey, getWalletType, setWalletType, walletTypeNorm,
} from '../utils';
import { encryptMnemonic, getMnemonic, mnemonicToKeyPair } from '../mnemonic';
import { WalletType, walletTypes } from '../../types';
import { tonClient } from '../index';
import storage from '../../utils/storage';

async function getBestWalletTypeByPublicKey(publicKey: Uint8Array): Promise<WalletType> {
    let maxBalance = new Coins(0);
    let bestContract = walletTypes[0];
    for (const walletType of walletTypes) {
        const wallet = Wallet.openByPubKey({
            workchain: 0,
            publicKey,
            version: walletTypeNorm(walletType),
        });
        const balance = await tonClient.getBalance(wallet.address);
        if (balance.gt(maxBalance)) {
            maxBalance = balance;
            bestContract = walletType;
        }
    }
    return bestContract;
}

export async function createWallet(password: string): Promise<boolean> {
    const [mnemonic] = await getMnemonic();
    const key = await mnemonicToKeyPair(mnemonic);

    const walletType = await getBestWalletTypeByPublicKey(key.public);

    await setWalletType(walletType);
    await storage.setItem('public_key', bytesToHex(key.public));
    await encryptMnemonic(password);
    return true;
}

export async function getWallet(walletType?: WalletType): Promise<StandardWalletContract> {
    const publicKey = await getPubKey();
    return Wallet.openByPubKey({
        publicKey,
        version: walletTypeNorm(walletType ?? await getWalletType()),
    });
}

export async function getWalletByMnemonic(password: string, walletType = 'v3R2'): Promise<StandardWalletContract> {
    const [mnemonic] = await getMnemonic(password);
    const key = await mnemonicToKeyPair(mnemonic);
    return Wallet.openByPubKey({
        publicKey: key.public,
        version: walletTypeNorm(walletType ?? await getWalletType()),
    });
}
