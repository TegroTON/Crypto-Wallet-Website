import {
    Address, BOC, Builder, Cell, Coins, Slice,
} from 'ton3-core';
import {
    base64ToBytes, bytesToHex, bytesToString, hexToBytes, stringToBytes,
} from 'ton3-core/dist/utils/helpers';
import { MessageExternalIn } from 'ton3-core/dist/contracts';
import nacl from 'tweetnacl';
import { JettonWallet, StandardWalletTransfer, StandardWalletVersion } from '@tegro/ton3-contracts';
import { JettonOperation, TonTransaction } from '@tegro/ton3-client';
import { decrypt } from './mnemonic/crypto';
import {
    Jetton, JettonInfo, JettonMeta, JettonsData, Send, SendDataType, Transaction, WalletType,
} from '../types';
import { tonClient } from './index';
import { getWallet } from './wallet';
import { getLanguage, setLanguage } from '../utils';
import { getMnemonic, mnemonicToKeyPair } from './mnemonic';
import storage from '../utils/storage';

export function walletTypeNorm(walletType: WalletType): StandardWalletVersion {
    switch (walletType) {
    case 'v3R2':
        return 'org.ton.wallets.v3.r2';
    case 'v4R2':
        return 'org.ton.wallets.v4.r2';
    default:
        throw Error(`Unknown wallet type: ${walletType}`);
    }
}

export async function setWalletType(walletType = 'v3R2'): Promise<WalletType> {
    await storage.setItem('wallet_type', walletType);
    return walletType;
}

export async function getWalletType(): Promise<WalletType> {
    const walletType = await storage.getItem('wallet_type');
    if (walletType) return walletType;
    return setWalletType();
}

export async function getBalance(address: string): Promise<Coins> {
    if (!address) return new Coins(0);
    const balance = await tonClient.getBalance(new Address(address));
    return balance || new Coins(0);
}

function isBrokenTransaction(tr: TonTransaction): boolean {
    return (tr.inMessage?.source === null && tr.outMessages.length === 0);
}

function isJettonTransfer(tr: TonTransaction): boolean {
    const body = tr.inMessage?.source === null ? tr.outMessages[0]?.body : tr.inMessage?.body;
    if (body?.type !== 'data') return false;
    const bodySlice = Slice.parse(BOC.fromStandard(body.data));
    if (bodySlice.bits.length < 32) return false;
    const operation = bodySlice.loadUint(32);
    return (operation === JettonOperation.TRANSFER) || (operation === JettonOperation.EXCESSES);
}

export async function getTransactions(
    address: string,
    limit = 5,
): Promise<Transaction[] | undefined> {
    if (!address) return undefined;
    let trans = await tonClient.getTransactions(new Address(address), {
        limit: limit < 10 ? 10 : limit,
    });
    let filteredTrans = trans.filter((tr) => !isBrokenTransaction(tr));
    filteredTrans = filteredTrans.filter((tr) => !isJettonTransfer(tr));
    let new_limit = limit;
    while ((filteredTrans.length < limit) && (trans.length >= new_limit)) {
        const last_lt = trans.at(-1)?.id.lt;
        const last_hash = trans.at(-1)?.id.hash;
        new_limit += 10;
        const new_trans = await tonClient.getTransactions(new Address(address), {
            limit: 10,
            hash: last_hash,
            lt: last_lt,
        });
        trans = trans.concat(new_trans);
        filteredTrans = trans.filter((tr) => !isBrokenTransaction(tr));
        filteredTrans = filteredTrans.filter((tr) => !isJettonTransfer(tr));
    }
    return filteredTrans.map((tr) => {
        const type = tr.inMessage?.source === null ? 'external' : 'internal';
        if (type === 'internal') {
            return {
                type,
                amount: tr.inMessage?.value,
                address: tr.inMessage?.source,
                msg: tr.inMessage?.body?.type === 'text'
                    ? tr.inMessage?.body.text
                    : null,
                timestamp: tr.time,
            } as Transaction;
        }
        return tr.outMessages.map((msg) => ({
            type,
            amount: msg.value,
            address: msg.destination,
            msg: msg.body?.type === 'text'
                ? msg.body.text
                : null,
            timestamp: tr.time,
        } as Transaction));
    })
        .flat()
        .slice(0, limit);
}

export async function getPubKey(): Promise<Uint8Array> {
    const pubKey = await storage.getItem('public_key');
    return hexToBytes(pubKey || '0');
}

export async function getAddress(walletType = 'v3R2'): Promise<string> {
    const wallet = await getWallet(walletType);
    return wallet.address.toString('base64', {
        bounceable: true,
        testOnly: false,
    });
}

export async function checkPassValid(password: string) {
    const mnemonic = await storage.getItem('mnemonic') || '';
    try {
        await decrypt(mnemonic, password);
        return true;
    } catch {
        return false;
    }
}

async function getSecretKey(password: string): Promise<Uint8Array> {
    const [mnemonic] = await getMnemonic(password);
    const keyPair = await mnemonicToKeyPair(mnemonic);
    return keyPair.private;
}

export async function getSeqno(address: string): Promise<number> {
    const {
        stack,
        exitCode,
    } = await tonClient.callGetMethod(new Address(address), 'seqno');
    switch (exitCode) {
    case -13:
        return 0;
    case 0:
        return Number(stack[0]);
    default:
        throw Error('getSeqno Error');
    }
}

export function sumFee(args: {
    inFwdFee: Coins,
    storageFee: Coins,
    gasFee: Coins,
    fwdFee: Coins,
}): Coins {
    return new Coins(0)
        .add(args.inFwdFee)
        .add(args.storageFee)
        .add(args.gasFee)
        .add(args.fwdFee);
}

function bytesToSnake(bytes: Uint8Array, prefix?: Uint8Array): Slice {
    let builder = new Builder();
    let remBytes = bytes;

    if (prefix) builder.storeBytes(prefix);

    while (remBytes.length > 0) {
        const available = Math.floor(builder.remainder / 8);
        if (remBytes.length <= available) {
            builder.storeBytes(remBytes);
            break;
        }
        builder.storeBytes(remBytes.slice(-available));
        remBytes = remBytes.slice(0, -available);
        builder = new Builder().storeRef(builder.cell());
    }

    return Slice.parse(builder.cell());
}

function generatePayload(data: string, dataType: SendDataType): Cell {
    switch (dataType) {
    case 'base64':
        return new Builder()
            .storeSlice(bytesToSnake(base64ToBytes(data)))
            .cell();
    case 'hex':
        return new Builder()
            .storeSlice(bytesToSnake(hexToBytes(data)))
            .cell();
    case 'boc':
        return BOC.fromStandard(data);
    default:
        return new Builder()
            .storeSlice(bytesToSnake(stringToBytes(data), new Uint8Array(4)))
            .cell();
    }
}

export async function generateTransferMessage(tr_info: Send): Promise<MessageExternalIn> {
    const wallet = await getWallet();
    const seqNo = await getSeqno(wallet.address.toString());
    const recipientAddress = new Address(tr_info.address, { bounceable: false });

    const forwardPayload = generatePayload(tr_info.data, tr_info.dataType);

    if (tr_info.jetton) {
        const to = tr_info.jetton.wallet;
        const { decimals } = tr_info.jetton.jetton.meta;

        const payload = JettonWallet.createTransferRequest({
            queryId: ~~(Date.now() / 1000),
            forwardPayload: tr_info.data.length > 0 ? forwardPayload : null,
            responseDestination: wallet.address,
            forwardAmount: new Coins(0),
            amount: new Coins(tr_info.amount, { decimals }),
            destination: recipientAddress,
        });
        const transfer = {
            destination: to,
            amount: new Coins(0.099),
            body: payload,
            mode: 2,
        };
        return wallet.createTransferMessage([transfer], seqNo, 60);
    }

    const transfer = {
        destination: recipientAddress,
        amount: new Coins(tr_info.amount),
        body: forwardPayload,
        mode: 3,
        init: tr_info.stateInit,
    } as StandardWalletTransfer;
    return wallet.createTransferMessage([transfer], seqNo, 6000);
}

export async function sendTransaction(tr_info: Send, password: string) {
    const secretKey = await getSecretKey(password);
    const transferMessage = await generateTransferMessage(tr_info);
    const msgBoc = transferMessage.sign(secretKey);

    for (let i = 0; i < 3; i++) {
        await tonClient.sendBoc(msgBoc);
    }
}

export async function checkSeqnoUpdate(
    seqno: number,
    walletType = 'v3R2',
) {
    return (await getSeqno(await getAddress(walletType))) > seqno;
}

export async function checkJettonValid(jettonAddress: string) {
    if (!Address.isValid(jettonAddress)) return false;
    try {
        await tonClient.Jetton.getWalletAddress(new Address(jettonAddress), new Address(await getAddress()));
        return true;
    } catch {
        return false;
    }
}

export async function getJettonData(jettonAddress: string): Promise<JettonMeta> {
    const { content } = await tonClient.Jetton.getData(new Address(jettonAddress));
    return content as unknown as JettonMeta;
}

async function getJettonsData(): Promise<JettonsData> {
    const data = await storage.getItem('jettons') || '{}';
    return JSON.parse(data) as JettonsData;
}

async function setJettonsData(jettonsData: JettonsData) {
    await storage.setItem('jettons', JSON.stringify(jettonsData));
}

const normalizeIMG = (img: string | undefined) => {
    if (!img) return '';
    if (img.slice(0, 4) === 'data') return img;
    if (img.slice(0, 4) === 'http') return img;
    if (img.slice(0, 11) === 'img/tokens/') return img;
    try {
        const mb_svg = bytesToString(base64ToBytes(img));
        if (mb_svg.includes('svg')) return `data:image/svg+xml;base64,${img}`;
        return '';
    } catch {
        return '';
    }
};

export async function addCustomJetton(jettonAddress: string, jettonMeta?: JettonMeta) {
    const jettonsData = await getJettonsData();
    const jettonData = jettonMeta ?? await getJettonData(jettonAddress);

    jettonsData[jettonAddress] = {
        name: jettonData.name || '',
        symbol: jettonData.symbol,
        description: jettonData.description || '',
        image: normalizeIMG(jettonData.image || jettonData.image_data || ''),
        decimals: jettonData.decimals || 9,
    };
    await setJettonsData(jettonsData);
}

export async function removeJetton(jettonAddress: string) {
    const jettonsData = await getJettonsData();
    if (jettonAddress in jettonsData) {
        delete jettonsData[jettonAddress];
        await setJettonsData(jettonsData);
    }
}

export async function loadJettons(address: string): Promise<JettonInfo[]> {
    await addCustomJetton('EQAvDfWFG0oYX19jwNDNBBL1rKNT9XfaGP9HyTb5nb2Eml6y'); // hardcode TGR
    const jettons: JettonInfo[] = [];
    const jettonsData = await getJettonsData();

    await Promise.all(Object.keys(jettonsData)
        .map(async (jettonAddress) => {
            const jettonWallet = await tonClient.Jetton.getWalletAddress(new Address(jettonAddress), new Address(address));
            const meta = jettonsData[jettonAddress];
            const deployed = await tonClient.isContractDeployed(jettonWallet);
            const balance = deployed ? await tonClient.Jetton.getBalance(jettonWallet) : new Coins(0, { decimals: meta.decimals });
            jettons.push({
                jetton: {
                    address: jettonAddress,
                    meta,
                } as Jetton,
                wallet: jettonWallet,
                balance,
                transactions: deployed ? await tonClient.Jetton.getTransactions(jettonWallet) : [],
            });
        }));
    return jettons.sort((a, b) => {
        if (a.jetton.meta.name > b.jetton.meta.symbol) {
            return 1;
        }
        if (a.jetton.meta.name < b.jetton.meta.symbol) {
            return -1;
        }
        return 0;
    });
}

export function isDomain(str: string): boolean {
    return /\S+.ton\b/.test(str);
}

export async function getAddressFromDomain(domain: string): Promise<string | undefined> {
    try {
        const mbAddr = await tonClient.DNS.getWalletAddress(domain);
        return mbAddr instanceof Address ? mbAddr.toString('base64', { bounceable: false }) : undefined;
    } catch {
        return undefined;
    }
}

export async function signData(data: string, pass: string): Promise<string> {
    return bytesToHex(nacl.sign.detached(hexToBytes(data), await getSecretKey(pass)));
}
