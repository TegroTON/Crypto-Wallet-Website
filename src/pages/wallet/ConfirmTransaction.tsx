import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BOC, Coins } from 'ton3-core';
import { useTranslation } from 'react-i18next';
import { LocationParams, TaskStorage } from '../../types';

export function ConfirmTransactionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationParams;
    const { data: { taskInfo } } = state;
    const { params } = taskInfo as TaskStorage;
    const {
        to,
        value,
        data,
        dataType,
        stateInit,
    } = params;

    const amount = new Coins(value ?? 0, { isNano: true }).toString();

    const handleSubmit = () => {
        const send = {
            data,
            dataType,
            stateInit: stateInit ? BOC.fromStandard(stateInit) : stateInit,
            amount,
            address: to,
        };
        navigate('/protect', {
            state: {
                ...state,
                data: {
                    ...state.data,
                    send,
                },
                to: '/sending',
            },
        });
    };

    const { t } = useTranslation();

    return (
        <main className="page-main justify-content-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 col-xl-4 mx-auto">
                        <div className="main-icon  text-center">
                            <i
                                className="fa-duotone fa-paper-plane-top fa-rotate-270"
                            />
                        </div>
                        <h3
                            className="main-title text-center"
                            style={{
                                maxWidth: '416px',
                            }}
                        >
                            {t`confirm_transaction.title`}
                        </h3>
                        <ul className="p-3 p-lg-4 rounded alert list-unstyled mb-3 mt-5">
                            <p className="mb-3 text-center font-18 fw-bold">
                                {t`confirm_transaction.question`}
                            </p>
                            <li className="d-flex justify-content-between">
                                <div
                                    className="fw-medium p-2 font-14"
                                >
                                    {t`confirm_transaction.to`}
                                </div>
                                <div
                                    className="fw-medium p-2 font-14"
                                    style={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {to}
                                </div>
                            </li>
                            <li className="d-flex justify-content-between">
                                <div
                                    className="fw-medium p-2 font-14"
                                >
                                    {t`confirm_transaction.amount`}
                                </div>
                                <div
                                    className="fw-medium p-2 font-14"
                                    style={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {`${amount} TON`}
                                </div>
                            </li>
                        </ul>
                        <div className="main-buttons d-flex justify-content-between">
                            <a
                                onClick={() => navigate('/wallet')}
                                className="btn btn-secondary"
                            >
                                {t`button.cancel`}
                            </a>
                            <a
                                onClick={handleSubmit}
                                className="btn btn-primary"
                            >
                                {t`button.continue`}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
