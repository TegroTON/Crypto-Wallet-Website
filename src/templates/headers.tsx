import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { Language, LocationParams } from '../types';
import { getNextLanguage, setLanguage, writeState } from './utils';
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
        // window.location.reload();
        await updateWalletInfo();
        writeState(walletInfo);
    }

    useEffect(() => {
        refresh();
        // const timer = setInterval(() => refresh(), 10 * 1000);
        // return () => clearInterval(timer);
    }, []);

    const { i18n } = useTranslation();

    const switchLanguage = () => {
        const lang = getNextLanguage();
        setLanguage(lang as Language);
        i18n.changeLanguage(lang);
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
                        <i className="fa-regular fa-arrow-rotate-right fa-2xl" />
                    </a>
                    <a
                        style={{ cursor: 'pointer' }}
                        onClick={() => switchLanguage()}
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

    const switchLanguage = () => {
        const lang = getNextLanguage();
        setLanguage(lang as Language);
        i18n.changeLanguage(lang);
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
                            onClick={() => switchLanguage()}
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

    const switchLanguage = () => {
        const lang = getNextLanguage();
        setLanguage(lang as Language);
        i18n.changeLanguage(lang);
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
                        onClick={() => switchLanguage()}
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

    const switchLanguage = () => {
        const lang = getNextLanguage();
        setLanguage(lang as Language);
        i18n.changeLanguage(lang);
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
                        onClick={() => switchLanguage()}
                        className="header-translate font-18"
                    >
                        <i className="fi-icon icon-translate" />
                    </a>
                </nav>
            </div>
        </header>
    );
}
