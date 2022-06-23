import { useTranslation } from 'react-i18next';
import {
    getCurrency, getLanguage, setCurrency, setLanguage,
} from '../../utils';
import {
    Currency, currencies, Language, languages, WalletType, walletTypes,
} from '../../../types';
import { clearStorage, getWalletType, setWalletType } from '../../../ton/utils';

export function SettingsPage() {
    const language = getLanguage();
    const currency = getCurrency();
    const walletType = getWalletType();
    const { t, i18n } = useTranslation();

    const changeLang = (lang: string) => {
        setLanguage(lang as Language);
        i18n.changeLanguage(lang);
    };

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center"><i className="fa-duotone fa-gear" /></div>
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
                                        style={{ height: '34px', fontSize: '14px' }}
                                        defaultValue={language}
                                        onChange={(e) => changeLang(e.target.value)}
                                    >
                                        {Object.keys(languages).map((key) => (
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
                                        style={{ height: '34px', fontSize: '14px' }}
                                        defaultValue={currency}
                                        onChange={(e) => setCurrency(e.target.value as Currency)}
                                    >
                                        {Object.keys(currencies).map((key) => (
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
                                        style={{ height: '34px', fontSize: '14px' }}
                                        defaultValue={walletType}
                                        onChange={(e) => setWalletType(e.target.value as WalletType)}
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
                                <li className="py-3">
                                    <a
                                        href="https://t.me/TonHoldWallet"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="d-flex align-items-center"
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-paper-plane fa-lg" />
                                        </div>
                                        <span className="font-16">{t`settings.contact_support`}</span>
                                    </a>
                                </li>
                                <li className="py-3">
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (confirm(t`settings.reset_wallet_confirm`)) {
                                                clearStorage();
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
