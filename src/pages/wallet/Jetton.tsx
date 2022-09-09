import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, Coins } from 'ton3-core';
import { JettonOperation } from '@tegro/ton3-client';
import { JettonInfo, LocationParams } from '../../types';
import { ReceivedTransaction, SentTransaction } from './Transaction';
import { tonClient } from '../../ton';

export function JettonPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;
    const [jettonInfo, setJettonInfo] = useState<JettonInfo>(
        state.data.jettonInfo as JettonInfo,
    );

    const updateTransactions = async () => {
        const limit = (jettonInfo.transactions?.length ?? 5) + 5;
        const transactions = await tonClient.Jetton.getTransactions(jettonInfo.wallet, limit);// , jettonInfo.jetton.meta.decimal);
        setJettonInfo({
            ...jettonInfo,
            transactions,
        });
    };

    const { t } = useTranslation();

    return (
        <main className="page-main d-block pt-0">
            <div className="wallet-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-lg-5 text-center mx-auto">
                            <img
                                src="/img/logo.webp"
                                className="img-fluid"
                                width="100"
                                height="80"
                                alt="TON Hold"
                            />
                            <h3 className="wallet-title mb-0 mt-5">{`${jettonInfo?.balance} ${jettonInfo?.jetton.meta.symbol}`}</h3>
                            <div
                                className="wallet-balance mx-auto d-flex justify-content-between"
                                style={{ maxWidth: '286px' }}
                            >
                                &nbsp;
                                {/* <div> */}
                                {/*    Your balance: */}
                                {/*    <span className="ml-2">$5.11</span> */}
                                {/* </div> */}
                                {/* <div className="color-green"> */}
                                {/*    <i className="fa-duotone fa-chart-line-up mr-2" /> */}
                                {/*    4.1% */}
                                {/* </div> */}
                            </div>
                            <div
                                className="btn-group d-flex flex-fill mx-auto mt-5"
                                role="group"
                            >
                                <Link
                                    to="/send-ton"
                                    className="btn btn-secondary w-50"
                                    state={{
                                        from: location.pathname,
                                        data: {
                                            walletInfo,
                                            jettonInfo,
                                        },
                                    }}
                                >
                                    {t`wallet.send`}
                                    <i className="fa-regular fa-arrow-up-right font-18 ml-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 mx-auto">
                        <div className="wallet-history wh accordion" id="accordionTon">
                            <div
                                className="wallet-head d-flex align-iteml-center justify-content-between"
                            >
                                <h2 className="wallet-head__title">{t`wallet.all_transactions`}</h2>
                            </div>

                            {jettonInfo?.transactions?.map((tr, i) => {
                                if (tr.operation === JettonOperation.TRANSFER) {
                                    return (
                                        <SentTransaction
                                            amount={new Coins(tr.amount)}
                                            address={tr.destination ?? Address.NONE}
                                            message={tr.comment ?? ''}
                                            timestamp={tr.time}
                                            i={i}
                                            state={{
                                                from: state.from,
                                                data: {
                                                    walletInfo,
                                                    jettonInfo,
                                                },
                                            }}
                                        />
                                    );
                                }
                                if (tr.operation === JettonOperation.INTERNAL_TRANSFER) {
                                    return (
                                        <ReceivedTransaction
                                            amount={new Coins(tr.amount)}
                                            address={tr.from ?? Address.NONE}
                                            message={tr.comment ?? ''}
                                            timestamp={tr.time}
                                            i={i}
                                            state={{
                                                from: state.from,
                                                data: {
                                                    walletInfo,
                                                    jettonInfo,
                                                },
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
