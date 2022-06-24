import React from 'react';
import { fromNano } from 'ton';
import { Buffer } from 'buffer';
import { WalletInfo } from './types';
import {
    getAddress,
    getBalance,
    getMnemonic,
    getPubKey,
    getSeqno, getTransactions,
    getWalletType,
    loadJettons,
} from './ton/utils';
import { readState } from './templates/utils';

export type WalletContextType = {
    walletInfo: WalletInfo;
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
    const [walletInfo, setWalletInfo] = React.useState<WalletInfo>(readState() || {
        mnemonic: '',
        encrypted: '',
        public_key: Buffer.from('', 'hex'),
        walletType: 'v3r2',
        wallet: {
            balance: 0,
            address: '',
            seqno: 0,
        },
    } as WalletInfo);

    const [updating, setUpdating] = React.useState<boolean>(false);

    const updateWalletInfo = async () => {
        setUpdating(true);
        const walletType = getWalletType();
        const address = getAddress(walletType);
        console.log(walletType, address);
        const balance = getBalance(address);
        const seqno = getSeqno(address);
        const [mnemonic, encrypted] = await getMnemonic();
        const pub_key = getPubKey();
        const jettons = loadJettons(address);
        const transactions = getTransactions(address, walletInfo.wallet.transactions?.length || 5);
        setWalletInfo({
            ...walletInfo,
            mnemonic,
            encrypted,
            public_key: pub_key,
            walletType,
            wallet: {
                address,
                balance: parseFloat(fromNano(await balance)),
                seqno: await seqno,
                transactions: await transactions,
                jettons: await jettons,
            },
        });
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
