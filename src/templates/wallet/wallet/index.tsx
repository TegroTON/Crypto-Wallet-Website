import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fromNano } from 'ton';
import { Buffer } from 'buffer';
import { useTranslation } from 'react-i18next';
import {
    getBalance,
    getMnemonic,
    getTransactions,
    getAddress,
    getSeqno,
    getPubKey,
    loadJettons,
    removeJetton,
    getWalletType,
} from '../../../ton/utils';
import { ReceivedTransaction, SentTransaction } from './Transaction';
import { currencies, LocationParams, WalletInfo } from '../../../types';
import { getTONPrice, PriceInfo } from '../../../ton/coingecko';
import { getCurrency, round } from '../../utils';

export function WalletPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const [TONPrice, setTONPrice] = useState<PriceInfo>({
        price: 0,
        priceChange: 0,
    });
    const [walletInfo, setWalletInfo] = useState<WalletInfo>(
        state?.data?.walletInfo || ({
            mnemonic: '',
            encrypted: '',
            public_key: Buffer.from('', 'hex'),
            walletType: 'v3r2',
            wallet: {
                balance: 0,
                address: '',
                seqno: 0,
            },
        } as WalletInfo),
    );

    const currency = getCurrency();

    const { t } = useTranslation();

    const updateWalletInfo = async () => {
        if (walletInfo.wallet.address) setTONPrice(await getTONPrice(currency));
        const walletType = getWalletType();
        const address = getAddress(walletType);
        console.log(walletType, address);
        const balance = getBalance(address);
        const seqno = getSeqno(address);
        const [mnemonic, encrypted] = await getMnemonic();
        const pub_key = getPubKey();
        const jettons = loadJettons(address);
        const transactions = getTransactions(address);
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
        setTONPrice(await getTONPrice(currency));
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

    useEffect(() => {
        updateWalletInfo()
            .then();
        const timer = setInterval(updateWalletInfo, 30 * 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <main className="page-main d-block pt-0">
            <div className="wallet-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-5 text-center mx-auto">
                            <div className="main-icon">
                                <i className="fa-duotone fa-gem" />
                            </div>
                            <h3 className="wallet-title mb-0 mt-5">
                                {walletInfo.wallet.address ? (`${walletInfo.wallet.balance} TON`) : (
                                    <h2 className="main-title" style={{ color: 'white' }}>
                                        {t`wallet.updating`}
                                        <span className="dots">
                                            <span className="dot-one">.</span>
                                            <span className="dot-two">.</span>
                                            <span className="dot-three">.</span>
                                        </span>
                                    </h2>
                                )}
                            </h3>
                            <div
                                className="wallet-balance mx-auto d-flex justify-content-between"
                                style={{ maxWidth: '286px' }}
                            >
                                {TONPrice.price > 0 ? (
                                    <>
                                        <div>
                                            {t`wallet.your_balance`}
                                            <span className="ml-2">
                                                {`${currencies[currency]}${round(TONPrice.price * walletInfo.wallet.balance, 2)}`}
                                            </span>
                                        </div>
                                        {TONPrice.priceChange < 0 ? (
                                            <div className="color-red">
                                                <i className="fa-duotone fa-chart-line-down mr-2" />
                                                {`${round(TONPrice.priceChange, 1)}%`}
                                            </div>
                                        ) : (
                                            <div className="color-green">
                                                <i className="fa-duotone fa-chart-line-up mr-2" />
                                                {`${round(TONPrice.priceChange, 1)}%`}
                                            </div>
                                        )}
                                    </>
                                ) : (<>&nbsp;</>)}

                            </div>
                            <div
                                className="btn-group d-flex flex-fill mx-auto mt-5"
                                role="group"
                            >
                                <Link
                                    to="/receive-ton"
                                    className="btn btn-primary w-50"
                                    state={{
                                        from: location.pathname,
                                        data: { walletInfo },
                                    }}
                                    style={{ pointerEvents: walletInfo.wallet.address ? 'auto' : 'none' }}
                                >
                                    <i className="fa-regular fa-arrow-down-left font-18 mr-3" />
                                    {t`wallet.receive`}
                                </Link>
                                {walletInfo.wallet.balance > 0 ? (
                                    <Link
                                        to="/send-ton"
                                        className="btn btn-secondary w-50"
                                        state={{
                                            from: location.pathname,
                                            data: { walletInfo },
                                        }}
                                    >
                                        {t`wallet.send`}
                                        <i className="fa-regular fa-arrow-up-right font-18 ml-3" />
                                    </Link>
                                ) : ('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 mx-auto">
                        <div className="wallet-token border-bottom pb-5 mb-5">
                            <h2 className="wallet-head__title mb-4">{t`wallet.tokens`}</h2>

                            {walletInfo.wallet.jettons?.map((jt, i) => (
                                <div key={i} className="wh-item position-relative">
                                    <Link
                                        to="/jetton"
                                        className="d-flex align-item-center"
                                        state={{
                                            from: location.pathname,
                                            data: {
                                                walletInfo,
                                                jettonInfo: jt,
                                            },
                                        }}
                                    >
                                        <div className="wh-item__icon mr-3">
                                            <img
                                                src={jt.jetton.meta.image}
                                                className="rounded-circle img-fluid"
                                                width="48"
                                                height="48"
                                                alt={jt.jetton.meta.name}
                                            />
                                        </div>
                                        <div className="wh-item__transaction">
                                            <h3 className="wh-item__title">
                                                {jt.jetton.meta.name}
                                            </h3>
                                            <p className="wh-item__number">
                                                {jt.jetton.meta.description}
                                            </p>
                                        </div>
                                        <div
                                            className="wh-item__ton color-blue ml-auto"
                                        >
                                            {`${jt.balance} ${jt.jetton.meta.symbol}`}
                                        </div>
                                    </Link>
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (confirm(`${t`wallet.delete`} ${jt.jetton.meta.symbol}?`)) removeJetton(jt.jetton.address);
                                            updateJettons()
                                                .then();
                                        }}
                                        className="wm-item__del"
                                    >
                                        <i className="fa-regular fa-trash-can" />
                                    </a>
                                </div>
                            ))}

                            <div className="alert border text-center" role="alert">
                                {t`wallet.add_token_description`}
                            </div>
                            <div className="text-center">
                                <Link
                                    to="/add-token"
                                    className="btn btn-primary"
                                    state={{
                                        from: location.pathname,
                                        data: { walletInfo },
                                    }}
                                >
                                    {t`wallet.add_token_button`}
                                </Link>
                            </div>
                        </div>

                        <div className="wallet-history wh accordion" id="accordionTon">
                            <div
                                className="wallet-head d-flex align-iteml-center justify-content-between"
                            >
                                <h2 className="wallet-head__title">{t`wallet.all_transactions`}</h2>
                            </div>

                            {walletInfo.wallet.transactions?.map((tr, i) => {
                                if (tr.type === 'external') {
                                    return (
                                        <SentTransaction
                                            amount={tr.amount}
                                            address={tr.address}
                                            message={tr.msg}
                                            timestamp={tr.timestamp}
                                            i={i}
                                            state={{
                                                from: location.pathname,
                                                data: { walletInfo },
                                            }}
                                        />
                                    );
                                }
                                if (tr.type === 'internal') {
                                    return (
                                        <ReceivedTransaction
                                            amount={tr.amount}
                                            address={tr.address}
                                            message={tr.msg}
                                            timestamp={tr.timestamp}
                                            i={i}
                                            state={{
                                                from: location.pathname,
                                                data: { walletInfo },
                                            }}
                                        />
                                    );
                                }
                            })}

                            <div className="pt-4 text-center">
                                <a
                                    onClick={async () => updateTransactions()}
                                    style={{ cursor: 'pointer' }}
                                    className="btn btn-secondary"
                                >
                                    {t`wallet.load_more`}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
