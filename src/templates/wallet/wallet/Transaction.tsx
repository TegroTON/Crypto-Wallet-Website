import { fromNano } from 'ton';
import BN from 'bn.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocationParams } from '../../../types';

export function ReceivedTransaction({
    address,
    amount,
    i,
    message,
    state,
    timestamp,
}: {
    amount: number | BN;
    address: string | null;
    message: string;
    timestamp: number;
    i: number;
    state: LocationParams;
}) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div
            className="wh-item collapsed"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse-${i}`}
            aria-expanded="false"
            aria-controls={`flush-collapse-${i}`}
            style={{ cursor: 'pointer' }}
        >
            <div className="d-flex align-iteml-center">
                <div className="wh-item__icon color-green bg-soft-green mr-3">
                    <i className="fa-duotone fa-arrow-down-left" />
                </div>
                <div className="wh-item__transaction">
                    <h3 className="wh-item__title">{t`wallet.trans.received`}</h3>
                    <p className="wh-item__number">{`${address?.slice(0, 6)} . . . ${address?.slice(-6)}`}</p>
                </div>
                <div className="wh-item__ton color-green ml-auto">
                    {`+${fromNano(amount)}`}
                </div>
            </div>

            <div
                id={`flush-collapse-${i}`}
                className="accordion-collapse collapse"
                aria-labelledby="flush-heading-1"
                data-bs-parent="#accordionTon"
            >
                <ul className="wh-item__body mt-2">
                    <li className="py-2 border-bottom">
                        <h4 className="small mb-0">{t`wallet.trans.date`}</h4>
                        <span className="small color-grey">
                            {new Date(timestamp * 1000).toLocaleString()}
                        </span>
                    </li>
                    <li className="py-2 border-bottom">
                        <h4 className="small mb-0">{t`wallet.trans.sender`}</h4>
                        <span className="small color-grey">{address}</span>
                    </li>
                    {message ? (
                        <li className="py-2">
                            <h4 className="small mb-0">{t`wallet.trans.message`}</h4>
                            <span className="small color-grey">{message}</span>
                        </li>
                    ) : ('')}
                    <li className="d-flex align-items-center justify-content-between mt-3">
                        <a
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate(`/send-ton?address=${address}`, {
                                    state,
                                    replace: true,
                                });
                            }}
                            className="btn btn-sm btn-primary"
                        >
                            {t`wallet.trans.send_to_this_address`}
                        </a>
                        <a href="#!" target="_blank" className="mr-3">
                            <i className="fa-regular fa-circle-info fa-lg" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export function SentTransaction({
    address,
    amount,
    i,
    message,
    state,
    timestamp,
}: {
    amount: number | BN;
    address: string | null;
    message: string;
    timestamp: number;
    i: number;
    state: LocationParams;
}) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div
            className="wh-item collapsed"
            data-bs-toggle="collapse"
            data-bs-target={`#flush-collapse-${i}`}
            aria-expanded="false"
            aria-controls={`flush-collapse-${i}`}
            style={{ cursor: 'pointer' }}
        >
            <div className="d-flex align-iteml-center">
                <div className="wh-item__icon color-red bg-soft-red">
                    <i className="fa-duotone fa-arrow-up-right" />
                </div>
                <div className="wh-item__transaction">
                    <h3 className="wh-item__title">{t`wallet.trans.sent`}</h3>
                    <p className="wh-item__number">{`${address?.slice(0, 6)} . . . ${address?.slice(-6)}`}</p>
                </div>
                <div className="wh-item__ton color-red ml-auto">
                    {`-${fromNano(amount)}`}
                </div>
            </div>

            <div
                id={`flush-collapse-${i}`}
                className="accordion-collapse collapse"
                aria-labelledby="flush-heading-2"
                data-bs-parent="#accordionTon"
            >
                <ul className="wh-item__body mt-2">
                    <li className="py-3 border-bottom">
                        <h4 className="small mb-0">{t`wallet.trans.date`}</h4>
                        <span className="small color-grey">
                            {new Date(timestamp * 1000).toLocaleString()}
                        </span>
                    </li>
                    <li className="py-3 border-bottom">
                        <h4 className="small mb-0">{t`wallet.trans.recipient`}</h4>
                        <span className="small color-grey">{address}</span>
                    </li>
                    {message ? (
                        <li className="py-2">
                            <h4 className="small mb-0">{t`wallet.trans.message`}</h4>
                            <span className="small color-grey">{message}</span>
                        </li>
                    ) : ('')}
                    <li className="d-flex align-items-center justify-content-between mt-3">
                        <a
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate(`/send-ton?address=${address}`, {
                                    state,
                                    replace: true,
                                });
                            }}
                            className="btn btn-sm btn-primary"
                        >
                            {t`wallet.trans.send_to_this_address`}
                        </a>
                        <a href="#!" target="_blank" className="mr-3">
                            <i className="fa-regular fa-circle-info fa-lg" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
