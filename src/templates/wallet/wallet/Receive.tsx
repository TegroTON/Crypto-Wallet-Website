import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode-svg';
import { useTranslation } from 'react-i18next';
import { LocationParams, WalletInfo } from '../../../types';

export function ReceivePage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;

    const getQR = () => new QRCode({
        content: walletInfo.wallet.address || 'TON FOUNDATION',
        container: 'svg-viewbox',
        padding: 1,
        ecl: 'H',
    }).svg();

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 text-center mx-auto">
                        <div className="main-icon text-center">
                            <i className="fa-duotone fa-paper-plane-top fa-rotate-90" />
                        </div>
                        <h3 className="main-title text-center">{t`wallet.receive`}</h3>
                        <form
                            action=""
                            className="mx-auto mt-5"
                            style={{ maxWidth: '328px' }}
                        >
                            <div className="mb-5">
                                <label>QRcode</label>
                                <div
                                    className="qrcode mt-3"
                                    dangerouslySetInnerHTML={{ __html: getQR() }}
                                />
                            </div>
                            <div className="mb-5">
                                <label>{t`receive.wallet_address`}</label>
                                <input
                                    disabled
                                    type="text"
                                    placeholder="0"
                                    className="text-center form-control mt-3"
                                    value={walletInfo.wallet.address}
                                />
                            </div>
                            <div className="btn-group d-flex flex-fill" role="group">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigator.clipboard.writeText(walletInfo.wallet.address);
                                    }}
                                >
                                    <i className="fa-regular fa-copy mr-3" />
                                    {t`button.copy`}
                                </a>
                                <a href="#" className="btn btn-secondary btn-secondary-700">
                                    {t`button.share`}
                                    <i className="fa-regular fa-share ml-3" />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
