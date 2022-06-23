import {
    Address,
    Cell,
    CommentMessage,
    toNano,
    Wallet,
    WalletV1R2Source,
    WalletV1R3Source,
    WalletV2R1Source,
    WalletV2R2Source,
    WalletV3R1Source,
    WalletV3R2Source,
    WalletV4R2Source,
    TonTransaction,
    WalletContractType,
} from 'ton';
import { mnemonicNew, mnemonicToWalletKey } from 'ton-crypto';
import BN from 'bn.js';
import { Buffer } from 'buffer';
import { decrypt, encrypt } from './crypto';
import {
    JettonsData, Send, Transaction, Jetton, JettonMeta, WalletType, walletTypes,
} from '../types';
import { client } from './index';
import { JettonMasterContract } from './jettons/contracts/JettonMasterContract';
import { IPFS_GATEWAY_PREFIX } from './jettons/utils/ipfs';
import { JettonOperation } from './jettons/enums/JettonOperation';
import { getLanguage, setLanguage } from '../templates/utils';

export function openWalletByPublicKey(publicKey: Buffer, type: WalletContractType) {
    if (type === 'org.ton.wallets.simple') {
        throw Error('Unsupported wallet');
    } else if (type === 'org.ton.wallets.simple.r2') {
        return client.openWalletFromCustomContract(
            WalletV1R2Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.simple.r3') {
        return client.openWalletFromCustomContract(
            WalletV1R3Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.v2') {
        return client.openWalletFromCustomContract(
            WalletV2R1Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.v2.r2') {
        return client.openWalletFromCustomContract(
            WalletV2R2Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.v3') {
        return client.openWalletFromCustomContract(
            WalletV3R1Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.v3.r2') {
        return client.openWalletFromCustomContract(
            WalletV3R2Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else if (type === 'org.ton.wallets.v4.r2') {
        return client.openWalletFromCustomContract(
            WalletV4R2Source.create({
                publicKey,
                workchain: 0,
            }),
        );
    } else {
        throw Error(`Unknown wallet type: ${type}`);
    }
}

export function walletTypeNorm(walletType: WalletType): WalletContractType {
    switch (walletType) {
    case 'v3r2':
        return 'org.ton.wallets.v3.r2';
    case 'v4r2':
        return 'org.ton.wallets.v4.r2';
    default:
        throw Error(`Unknown wallet type: ${walletType}`);
    }
}

async function getBestWalletTypeByPublicKey(publicKey: Buffer): Promise<WalletType> {
    let maxBalance = new BN(0);
    let bestContract = walletTypes[0];
    for (const walletType of walletTypes) {
        const wallet = openWalletByPublicKey(publicKey, walletTypeNorm(walletType));
        const balance = await client.getBalance(wallet.address);
        if (balance.gt(maxBalance)) {
            maxBalance = balance;
            bestContract = walletType;
        }
    }
    return bestContract;
}

export async function getMnemonic(
    password?: string,
): Promise<[string, string]> {
    const old_mnemonic = localStorage.getItem('mnemonic');
    const old_encrypted = localStorage.getItem('encrypted');
    if (old_mnemonic) {
        if (old_encrypted === 'false') {
            const old_words = old_mnemonic.split(' ');
            if (old_words.length === 24) return [old_mnemonic, old_encrypted];
        } else {
            if (password) return [await decrypt(old_mnemonic, password), 'true'];
            return [old_mnemonic, 'true'];
        }
    }
    const new_words = await mnemonicNew();
    const new_mnemonic = new_words.join(' ');
    localStorage.setItem('mnemonic', new_mnemonic);
    localStorage.setItem('encrypted', 'false');
    return [new_mnemonic, 'false'];
}

export function setMnemonic(words: string[]) {
    localStorage.setItem('mnemonic', words.join(' '));
    localStorage.setItem('encrypted', 'false');
}

export function setWalletType(walletType = 'v3r2'): WalletType {
    localStorage.setItem('wallet_type', walletType);
    return walletType;
}

export function getWalletType(): WalletType {
    const walletType = localStorage.getItem('wallet_type');
    if (walletType) return walletType;
    return setWalletType();
}

export async function createWallet(password: string): Promise<boolean> {
    const [mnemonic] = await getMnemonic();
    const words = mnemonic.split(' ');
    const key = await mnemonicToWalletKey(words);
    // const wallet = await client.findWalletFromSecretKey({
    // workchain: 0, secretKey: key.secretKey })
    const walletType = await getBestWalletTypeByPublicKey(key.publicKey);
    setWalletType(walletType);
    localStorage.setItem('public_key', key.publicKey.toString('hex'));
    localStorage.setItem('mnemonic', await encrypt(words.join(' '), password));
    localStorage.setItem('encrypted', 'true');
    return true;
}

export async function getWallet(password: string): Promise<Wallet> {
    const [mnemonic] = await getMnemonic(password);
    const words = mnemonic.split(' ');
    const key = await mnemonicToWalletKey(words);
    const type = getWalletType();
    return client.openWalletFromSecretKey({
        workchain: 0,
        secretKey: key.secretKey,
        type: walletTypeNorm(type),
    });
}

export async function getBalance(address: string): Promise<BN> {
    if (!address) return new BN(0);
    const balance = await client.getBalance(Address.parse(address));
    return balance || new BN(0);
}

function isJettonTransfer(tr: TonTransaction): boolean {
    const body = tr.inMessage?.source === null ? tr.outMessages[0].body : tr.inMessage?.body;
    if (body?.type !== 'data') return false;
    const bodySlice = Cell.fromBoc(body.data)[0].beginParse();
    if (bodySlice.remaining < 32) return false;
    const operation = bodySlice.readUint(32)
        .toNumber();
    return (operation === JettonOperation.TRANSFER) || (operation === JettonOperation.EXCESSES);
}

export async function getTransactions(
    address: string,
    limit = 5,
): Promise<Transaction[] | undefined> {
    if (!address) return undefined;
    let trans = await client.getTransactions(Address.parse(address), {
        limit: limit < 10 ? 10 : limit,
    });
    let filtredTrans = trans.filter((tr) => !isJettonTransfer(tr));
    let new_limit = limit;
    while ((filtredTrans.length < limit) && (trans.length >= new_limit)) {
        const last_lt = trans.at(-1)?.id.lt;
        const last_hash = trans.at(-1)?.id.hash;
        new_limit += 10;
        const new_trans = await client.getTransactions(Address.parse(address), {
            limit: 10,
            hash: last_hash,
            lt: last_lt,
        });
        trans = trans.concat(new_trans);
        filtredTrans = trans.filter((tr) => !isJettonTransfer(tr));
    }
    return filtredTrans.map((tr) => {
        const type = tr.inMessage?.source === null ? 'external' : 'internal';
        const amount = type === 'external' ? tr.outMessages[0].value : tr.inMessage?.value;
        const addr = type === 'external'
            ? tr.outMessages[0].destination
            : tr.inMessage?.source;
        const msg = type === 'external'
            ? tr.outMessages[0].body?.type === 'text'
                ? tr.outMessages[0].body.text
                : null
            : tr.inMessage?.body?.type === 'text'
                ? tr.inMessage?.body.text
                : null;
        const timestamp = tr.time;
        return {
            type,
            amount,
            address: addr?.toFriendly(),
            msg,
            timestamp,
        } as Transaction;
    })
        .slice(0, limit);
}

export function checkAddrValid(address: string) {
    try {
        Address.parse(address);
        return true;
    } catch {
        return false;
    }
}

export function getPubKey() {
    const pubKey = localStorage.getItem('public_key');
    if (pubKey) return Buffer.from(pubKey, 'hex');
    return Buffer.from('0', 'hex');
}

export function getAddress(walletType = 'v3r2') {
    const pub_key = getPubKey();
    const wallet = openWalletByPublicKey(
        pub_key,
        walletTypeNorm(walletType),
    );
    return wallet.address.toFriendly();
}

export async function checkPassValid(password: string) {
    const mnemonic = localStorage.getItem('mnemonic') || '';
    try {
        await decrypt(mnemonic, password);
        return true;
    } catch {
        return false;
    }
}

async function getSecretKey(password: string) {
    const mnemonic = await decrypt(
        localStorage.getItem('mnemonic') || '',
        password,
    );
    const words = mnemonic.split(' ');
    const key = await mnemonicToWalletKey(words);

    return key.secretKey;
}

export async function sendTransaction(tr_info: Send, password: string) {
    const wallet = await getWallet(password);
    const secretKey = await getSecretKey(password);
    const seqNo = await wallet.getSeqNo();
    const recipientAddress = Address.parse(tr_info.address);
    const bounce = await client.isContractDeployed(recipientAddress);

    for (let i = 0; i < 3; i++) {
        if (tr_info.jetton) {
            const to = tr_info.jetton.wallet.address;
            const forwardPayload = new Cell();
            new CommentMessage(tr_info.message).writeTo(forwardPayload);

            const payload = tr_info.jetton.wallet.createTransferRequest({
                queryId: Date.now() / 1000,
                forwardPayload: tr_info.message.length > 0 ? forwardPayload : null,
                responseDestination: wallet.address,
                forwardAmount: 0,
                amount: toNano(tr_info.amount),
                destination: recipientAddress,
            });
            await wallet.transfer({
                seqno: seqNo,
                sendMode: 2,
                to,
                secretKey,
                value: new BN(50000000, 10),
                bounce,
                payload,
            });
        } else {
            await wallet.transfer({
                seqno: seqNo,
                to: recipientAddress,
                secretKey,
                value: toNano(tr_info.amount),
                bounce,
                payload: tr_info.message,
            });
        }
    }
}

export function clearStorage() {
    const lang = getLanguage();
    localStorage.clear();
    setLanguage(lang);
}

export async function getSeqno(address: string): Promise<number> {
    const addr = Address.parse(address);
    const wallet = client.openWalletFromAddress({ source: addr });
    return wallet.getSeqNo();
}

export async function checkSeqnoUpdate(
    seqno: number,
    walletType = 'v3r2',
) {
    return (await getSeqno(getAddress(walletType))) > seqno;
}

export async function checkJettonValid(jettonAddress: string) {
    if (!checkAddrValid(jettonAddress)) return false;
    try {
        const contract = new JettonMasterContract(
            client,
            null as any,
            Address.parse(jettonAddress),
        );
        const jetton_wallet = await contract.getJettonWallet(
            Address.parse(getAddress()),
        );
        return true;
    } catch {
        return false;
    }
}

export async function getJettonData(jettonAddress: string): Promise<JettonMeta> {
    const contract = new JettonMasterContract(
        client,
        null as any,
        Address.parse(jettonAddress),
    );
    const { content } = await contract.getJettonData();
    return fetch(content.toString()
        .replace(/^ipfs:\/\//, IPFS_GATEWAY_PREFIX))
        .then((response) => response.json())
        .then((data) => data as JettonMeta);
}

function getJettonsData(): JettonsData {
    const data = localStorage.getItem('jettons') || '{}';
    return JSON.parse(data) as JettonsData;
}

function setJettonsData(jettonsData: JettonsData) {
    localStorage.setItem('jettons', JSON.stringify(jettonsData));
}

const normalizeIMG = (img: string | undefined) => {
    if (!img) return '';
    if (img.slice(0, 4) === 'data') return img;
    const n_img = img.replace(/^ipfs:\/\//, IPFS_GATEWAY_PREFIX);
    if (n_img.slice(0, 4) === 'http') return n_img;
    try {
        const mb_svg = Buffer.from(img, 'base64')
            .toString();
        if (mb_svg.includes('svg')) return `data:image/svg+xml;base64,${n_img}`;
        return '';
    } catch {
        return '';
    }
};

export async function addJetton(jettonAddress: string) {
    const jettonsData = getJettonsData();
    const jettonData = await getJettonData(jettonAddress);

    if (!(jettonAddress in jettonsData)) {
        jettonsData[jettonAddress] = {
            name: jettonData.name || '',
            symbol: jettonData.symbol,
            description: jettonData.description || '',
            image: normalizeIMG(jettonData.image || jettonData.image_data || ''),
            decimal: jettonData.decimal || 9,
        };
        setJettonsData(jettonsData);
    }
}

export function removeJetton(jettonAddress: string) {
    const jettonsData = getJettonsData();
    if (jettonAddress in jettonsData) {
        delete jettonsData[jettonAddress];
        setJettonsData(jettonsData);
    }
}

export async function loadJettons(address: string) {
    await addJetton('EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y'); // hardcode TGR
    const jettons = [];
    const jettonsData = getJettonsData();

    for (const jettonAddress of Object.keys(jettonsData)) {
        const contract = new JettonMasterContract(
            client,
            null as any,
            Address.parse(jettonAddress),
        );
        const jetton_wallet = await contract.getJettonWallet(
            Address.parse(address),
        );
        const { balance } = await jetton_wallet.getData();
        jettons.push({
            jetton: {
                address: jettonAddress,
                meta: jettonsData[jettonAddress],
            } as Jetton,
            wallet: jetton_wallet,
            balance: balance.toNumber() / 10 ** 9,
            transactions: await jetton_wallet.getTransactions(),
        });
    }
    return jettons;
}
