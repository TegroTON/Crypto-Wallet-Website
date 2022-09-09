import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { Language, LocationParams } from '../types';
import { getNextLanguage, setLanguage, writeState } from '../utils';
import { WalletContext, WalletContextType } from '../context';

export function WalletHeader() {
    const location = useLocation();

    const {
        walletInfo,
        updateWalletInfo,
        updateJettons,
        updateTransactions,
        updating,
    } = useContext(WalletContext) as WalletContextType;

    async function refresh() {
        await updateWalletInfo();
    }

    const { i18n } = useTranslation();

    const switchLanguage = async () => {
        const lang = await getNextLanguage();
        await setLanguage(lang as Language);
        await i18n.changeLanguage(lang);
    };

    const state = location.state as LocationParams;

    return (
        <header className="header header-dark pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        style={{ cursor: 'pointer' }}
                        className={`mr-auto${updating ? ' fi-spin' : ''}`}
                        onClick={refresh}
                    >
                        <img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjRkZGRkZGIj48cGF0aCBkPSJNNDk2IDQwdjE2MEM0OTYgMjEzLjMgNDg1LjMgMjI0IDQ3MiAyMjRoLTE2MEMyOTguOCAyMjQgMjg4IDIxMy4zIDI4OCAyMDBzMTAuNzUtMjQgMjQtMjRoMTAwLjVDMzgyLjggMTE4LjMgMzIyLjUgODAgMjU2IDgwQzE1OC4xIDgwIDgwIDE1OC4xIDgwIDI1NnM3OC45NyAxNzYgMTc2IDE3NmM0MS4wOSAwIDgxLjA5LTE0LjQ3IDExMi42LTQwLjc1YzEwLjE2LTguNSAyNS4zMS03LjE1NiAzMy44MSAzLjA2MmM4LjUgMTAuMTkgNy4xMjUgMjUuMzEtMy4wNjIgMzMuODFjLTQwLjE2IDMzLjQ0LTkxLjE3IDUxLjc3LTE0My41IDUxLjc3QzEzMi40IDQ3OS45IDMyIDM3OS41IDMyIDI1NnMxMDAuNC0yMjMuOSAyMjMuOS0yMjMuOWM3OS44NSAwIDE1Mi40IDQzLjQ2IDE5Mi4xIDEwOS4xVjQwYzAtMTMuMjUgMTAuNzUtMjQgMjQtMjRTNDk2IDI2Ljc1IDQ5NiA0MHoiLz48L3N2Zz4="
                            alt=""
                            width="30px"
                            height="30px"
                        />
                    </a>
                    <a
                        style={{ cursor: 'pointer' }}
                        onClick={async () => switchLanguage()}
                        className="header-translate font-18"
                    >
                        <i className="fa-light fa-globe font-24" />
                    </a>
                    <Link
                        to="/settings"
                        className="font-18 ml-4"
                        state={{
                            ...state,
                            noLang: true,
                            from: location.pathname,
                            data: {},
                        }}
                    >
                        <i className="fa-regular fa-gear font-24" />
                    </Link>
                    <a
                        href="#"
                        title="NFT Telegram"
                        className="ntf-avatar tooltip ml-4"
                    >
                        <img src="/img/nft-avatar.png" alt="NFT" />
                        <span className="bage">NFT</span>
                        <span className="tooltip-box">Coming Soon</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}

export function DefaultHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationParams;

    const go_back = () => {
        navigate(-1);
        // if (!state?.from) {
        //     navigate(-2);
        // } else if (state.from !== location.pathname) {
        //     navigate(state.from, {state: {...state, from: false}, replace: true});
        // } else navigate('/', {state: {...state, from: false}, replace: true});
    };

    const { i18n } = useTranslation();

    const switchLanguage = async () => {
        const lang = await getNextLanguage();
        setLanguage(lang as Language);
        await i18n.changeLanguage(lang);
    };

    return (
        <header className="header pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    {(state?.noBack || (location.pathname === '/')) ? (
                        <a
                            className="header-logo d-none d-md-block"
                        />
                    ) : (
                        <a
                            className="mr-auto"
                            onClick={go_back}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fa-regular fa-angle-left fa-2xl" />
                        </a>
                    )}
                    {(state?.noLang || (location.pathname === '/settings')) ? (
                        <a
                            className="header-translate font-18"
                        />
                    ) : (
                        <a
                            style={{ cursor: 'pointer' }}
                            onClick={async () => switchLanguage()}
                            className="header-translate font-18"
                        >
                            <i className="fa-light fa-globe font-24" />
                        </a>
                    )}
                </nav>
            </div>
        </header>
    );
}

export function DefaultDarkHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationParams;

    const go_back = () => {
        navigate(-1);
        // if (!state?.from) {
        //     navigate(-2);
        // } else if (state.from !== location.pathname) {
        //     navigate(state.from, {state: {...state, from: false}, replace: true});
        // } else navigate('/', {state: {...state, from: false}, replace: true});
    };

    const { i18n } = useTranslation();

    const switchLanguage = async () => {
        const lang = await getNextLanguage();
        setLanguage(lang as Language);
        await i18n.changeLanguage(lang);
    };

    return (
        <header className="header header-dark pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        className="mr-auto"
                        onClick={go_back}
                        style={{ cursor: 'pointer' }}
                    >
                        <i className="fa-regular fa-angle-left fa-2xl" />
                    </a>
                    <a
                        style={{ cursor: 'pointer' }}
                        onClick={async () => switchLanguage()}
                        className="header-translate"
                    >
                        <i className="fa-light fa-globe font-24" />
                    </a>
                </nav>
            </div>
        </header>
    );
}

export function MainHeader() {
    const { i18n } = useTranslation();

    const switchLanguage = async () => {
        const lang = await getNextLanguage();
        setLanguage(lang as Language);
        await i18n.changeLanguage(lang);
    };

    return (
        <header className="header pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <Link to="/" className="header-logo d-none d-md-block">
                        <i className="fa-light fa-gem" />
                    </Link>
                    <ul className="m-0 p-0">
                        <li><Link to="/terms" className="px-3">Terms</Link></li>
                        <li><Link to="/privacy" className="px-3">Privacy</Link></li>
                        <li><a href="#!" className="px-3">Support</a></li>
                    </ul>
                    <a
                        style={{ cursor: 'pointer' }}
                        onClick={async () => switchLanguage()}
                        className="header-translate font-18"
                    >
                        <i className="fi-icon icon-translate" />
                    </a>
                </nav>
            </div>
        </header>
    );
}
