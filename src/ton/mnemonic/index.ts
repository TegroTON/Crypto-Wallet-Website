import { mnemonicNew, mnemonicToWalletKey } from 'ton-crypto';
import { hexToBytes } from 'ton3-core/dist/utils/helpers';
import { KeyPair } from 'ton3-core';
import { decrypt, encrypt } from './crypto';
import storage from '../../utils/storage';

export async function setMnemonic(wordsOrMnemonic: string[] | string) {
    await storage.setItem('mnemonic', typeof wordsOrMnemonic === 'object' ? wordsOrMnemonic.join(' ') : wordsOrMnemonic);
    await storage.setItem('encrypted', 'false');
}

export async function createMnemonic(): Promise<[string, boolean]> {
    const words = await mnemonicNew();
    const mnemonic = words.join(' ');
    await setMnemonic(mnemonic);
    return [mnemonic, false];
}

export async function getMnemonic(
    password?: string,
): Promise<[string, boolean]> {
    let mnemonic = await storage.getItem('mnemonic') || '';
    if (password) mnemonic = await decrypt(mnemonic, password);
    const words = mnemonic.split(' ');
    const encrypted = await storage.getItem('encrypted');

    if (words.length === 24) {
        return [mnemonic, !!encrypted];
    }
    if (mnemonic && encrypted === 'true') {
        return [mnemonic, true];
    }

    return createMnemonic();
}

export async function mnemonicToKeyPair(mnemonic: string): Promise<KeyPair> {
    const words = mnemonic.split(' ');
    const key = await mnemonicToWalletKey(words);
    return {
        private: hexToBytes(key.secretKey.toString('hex')),
        public: hexToBytes(key.publicKey.toString('hex')),
    };
}

export async function encryptMnemonic(pass: string) {
    const [mnemonic] = await getMnemonic();
    await storage.setItem('mnemonic', await encrypt(mnemonic, pass));
    await storage.setItem('encrypted', 'true');
}

export async function reencryptMnemonic(pass: string, new_pass: string) {
    const [mnemonic] = await getMnemonic(pass);
    await storage.setItem('mnemonic', await encrypt(mnemonic, new_pass));
    await storage.setItem('encrypted', 'true');
}
