import React from 'react';
import { bytesToHex, bytesToString, hexToBytes } from 'ton3-core/dist/utils/helpers';
import { Coins } from 'ton3-core';
import { WalletInfo } from './types';
import {
    getAddress,
    getBalance,
    getPubKey,
    getSeqno, getTransactions,
    getWalletType,
    loadJettons,
} from './ton/utils';
import { readState, writeState } from './utils';
import { getMnemonic } from './ton/mnemonic';

export type WalletContextType = {
    walletInfo: WalletInfo;
    initWalletInfo: () => Promise<void>;
    updateWalletInfo: () => Promise<void>;
    updateJettons: () => Promise<void>;
    updateTransactions: () => Promise<void>;
    updating: boolean;
};

export const WalletContext = React.createContext<WalletContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const WalletContextProvider: React.FC<Props> = ({ children }) => {
    const [walletInfo, setWalletInfo] = React.useState<WalletInfo>({
        mnemonic: '',
        encrypted: false,
        public_key: '',
        walletType: 'v3R2',
        wallet: {
            balance: new Coins(0),
            address: '',
            seqno: 0,
        },
    } as WalletInfo);

    const [updating, setUpdating] = React.useState<boolean>(false);

    const initWalletInfo = async () => {
        const savedState = await readState();
        if (savedState) setWalletInfo(savedState);
    };

    const updateWalletInfo = async () => {
        setUpdating(true);
        const walletType = await getWalletType();
        const address = await getAddress(walletType);
        const balance = getBalance(address);
        const seqno = getSeqno(address);
        const [mnemonic, encrypted] = await getMnemonic();
        const pub_key = getPubKey();
        const jettons = loadJettons(address);
        const transactions = getTransactions(address, walletInfo.wallet.transactions?.length || 5);
        const newWalletInfo = {
            ...walletInfo,
            mnemonic,
            encrypted,
            public_key: bytesToHex(await pub_key),
            walletType,
            wallet: {
                address,
                balance: await balance,
                seqno: await seqno,
                transactions: await transactions,
                jettons: await jettons,
            },
        };
        await writeState(newWalletInfo);
        setWalletInfo(newWalletInfo);
        setUpdating(false);
    };

    const updateJettons = async () => {
        const jettons = await loadJettons(walletInfo.wallet.address);
        setWalletInfo({
            ...walletInfo,
            wallet: {
                ...walletInfo.wallet,
                jettons,
            },
        });
    };

    const updateTransactions = async () => {
        const limit = (walletInfo.wallet.transactions?.length ?? 5) + 5;
        const transactions = await getTransactions(
            walletInfo.wallet.address,
            limit,
        );
        setWalletInfo({
            ...walletInfo,
            wallet: {
                ...walletInfo.wallet,
                transactions,
            },
        });
    };

    return (
        <WalletContext.Provider value={{
            walletInfo,
            initWalletInfo,
            updateWalletInfo,
            updateJettons,
            updateTransactions,
            updating,
        }}
        >
            {children}
        </WalletContext.Provider>
    );
};
