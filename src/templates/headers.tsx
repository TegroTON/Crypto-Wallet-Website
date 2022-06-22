import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LocationParams, WalletInfo } from './wallet/types';

export function WalletHeader() {
    function refreshPage() {
        window.location.reload();
    }

    return (
        <header className="header header-dark pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        style={{ cursor: 'pointer' }}
                        className="mr-auto"
                        onClick={refreshPage}
                    >
                        <i className="fa-regular fa-arrow-rotate-right fa-2xl" />
                    </a>
                    <a
                        href="#"
                        className="header-translate font-18"
                    >
                        <i className="fa-light fa-globe font-24" />
                    </a>
                    <Link to="/settings" className="font-18 ml-4">
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
        if (!state?.from) {
            navigate(-2);
        } else if (state.from !== location.pathname) {
            navigate(state.from, { state: { ...state, from: false }, replace: true });
        } else navigate('/', { state: { ...state, from: false }, replace: true });
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
                            className="mr-auto text-dark"
                            onClick={go_back}
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fa-regular fa-angle-left fa-2xl" />
                        </a>
                    )}
                    <a
                        href="#"
                        className="header-translate font-18"
                    >
                        <i className="fa-light fa-globe font-24" />
                    </a>
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
        if (!state?.from) {
            navigate(-2);
        } else if (state.from !== location.pathname) {
            navigate(state.from, { state: { ...state, from: false }, replace: true });
        } else navigate('/', { state: { ...state, from: false }, replace: true });
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
                        href="#"
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
                    <a href="#!" className="header-translate font-18"><i className="fi-icon icon-translate" /></a>
                </nav>
            </div>
        </header>
    );
}
