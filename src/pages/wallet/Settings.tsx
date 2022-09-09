import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getCurrency, getLanguage, getNetwork, clearStorage, setCurrency, setLanguage, switchNetwork,
} from '../../utils';
import {
    Currency, currencies, Language, languages, WalletType, walletTypes, LocationParams,
} from '../../types';
import { getWalletType, setWalletType } from '../../ton/utils';

export function SettingsPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const [localState, setLocalState] = useState<{
        language: Language, currency: Currency, walletType: WalletType
    }>({
        language: 'en',
        currency: 'usd',
        walletType: 'v3R2',
    });

    const {
        language,
        currency,
        walletType,
    } = localState;

    const {
        t,
        i18n,
    } = useTranslation();

    const changeLang = async (lang: string) => {
        await setLanguage(lang as Language);
        await i18n.changeLanguage(lang);
    };

    const init = async () => {
        setLocalState({
            language: await getLanguage(),
            currency: await getCurrency(),
            walletType: await getWalletType(),
        });
    };

    useEffect(() => {
        init()
            .then();
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center">
                            <i
                                className="fa-duotone fa-gear"
                                // onClick={
                                //     async (e) => {
                                //         if (e.shiftKey) {
                                //             if (confirm('Switch network?')) {
                                //                 await switchNetwork();
                                //             }
                                //         }
                                //     }
                                // }
                            />
                        </div>
                        <h2 className="main-title text-center">{t`settings.settings`}</h2>
                        <form className="mt-5">
                            <ul>
                                <li className="d-flex align-items-center py-3">
                                    <div className="fi-icon-square mr-3">
                                        <i className="fa-light fa-globe fa-lg" />
                                    </div>
                                    <span className="font-16">{t`settings.primary_language`}</span>
                                    <select
                                        className="custom-select border ml-auto"
                                        style={{
                                            height: '34px',
                                            fontSize: '14px',
                                        }}
                                        value={language}
                                        onChange={async (e) => {
                                            await changeLang(e.target.value);
                                            await init();
                                        }}
                                    >
                                        {Object.keys(languages)
                                            .map((key) => (
                                                <option value={key}>
                                                    {languages[key as Language]}
                                                </option>
                                            ))}
                                    </select>
                                </li>
                                <li className="d-flex align-items-center py-3">
                                    <div className="fi-icon-square mr-3">
                                        <i className="fa-light fa-money-bill fa-lg" />
                                    </div>
                                    <span className="font-16">{t`settings.currency`}</span>
                                    <select
                                        className="custom-select border ml-auto"
                                        style={{
                                            height: '34px',
                                            fontSize: '14px',
                                        }}
                                        value={currency}
                                        onChange={async (e) => {
                                            await setCurrency(e.target.value as Currency);
                                            await init();
                                        }}
                                    >
                                        {Object.keys(currencies)
                                            .map((key) => (
                                                <option value={key}>
                                                    {key.toUpperCase()}
                                                </option>
                                            ))}
                                    </select>
                                </li>
                                <li className="d-flex align-items-center py-3">
                                    <div className="fi-icon-square mr-3">
                                        <i className="fa-light fa-binary fa-lg" />
                                    </div>
                                    <span className="font-16">{t`settings.contract_version`}</span>
                                    <select
                                        className="custom-select border ml-auto"
                                        style={{
                                            height: '34px',
                                            fontSize: '14px',
                                        }}
                                        value={walletType}
                                        onChange={async (e) => {
                                            await setWalletType(e.target.value as WalletType);
                                            await init();
                                        }}
                                    >
                                        {walletTypes.map((val) => (
                                            <option value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </li>
                                <li className="py-3">
                                    <hr />
                                </li>
                                <li className="pb-3">
                                    <Link
                                        to="/change-password"
                                        className="d-flex align-items-center"
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-key fa-lg" />
                                        </div>
                                        <span
                                            className="font-16"
                                        >
                                            {t`settings.change_password`}
                                        </span>
                                    </Link>
                                </li>
                                <li className="pb-3">
                                    <Link
                                        to="/protect"
                                        className="d-flex align-items-center"
                                        state={{
                                            ...state,
                                            to: '/create-wallet-secret',
                                            from: location.pathname,
                                            noLang: null,
                                        }}
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-file-pen fa-lg" />
                                        </div>
                                        <span className="font-16">{t`settings.backup_seed`}</span>
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <hr />
                                </li>
                                <li className="py-3">
                                    <a
                                        href="https://t.me/+ELHXqx_uy2o5MWFi"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="d-flex align-items-center"
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-paper-plane fa-lg" />
                                        </div>
                                        <span
                                            className="font-16"
                                        >
                                            {t`settings.contact_support`}
                                        </span>
                                    </a>
                                </li>
                                <li className="py-3">
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={async () => {
                                            if (confirm(t`settings.reset_wallet_confirm`)) {
                                                await clearStorage();
                                                window.location.reload();
                                            }
                                        }}
                                        className="d-flex align-items-center"
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-circle-minus fa-lg" />
                                        </div>
                                        <span className="font-16">{t`settings.reset_wallet`}</span>
                                    </a>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
