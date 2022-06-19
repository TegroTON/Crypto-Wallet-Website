import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationParams, WalletInfo } from "./wallet/types";

export function WalletHeader() {
    function refreshPage() {
        window.location.reload();
    }

    return (
        <header className="header header-dark pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        style={{ cursor: "pointer" }}
                        className="header-logo mr-auto"
                        onClick={refreshPage}
                    >
                        <i className="fi-icon fi-icon-lg icon-reload" />
                    </a>
                    <a
                        href="src/templates/headers.tsx"
                        className="header-translate font-18"
                    >
                        <i className="fi-icon icon-translate" />
                    </a>
                    <Link to="/settings" className="font-18 ml-4">
                        <i className="fi-icon icon-settings" />
                    </Link>
                    <a
                        href="src/templates/headers.tsx"
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
        if (!state?.from) navigate(-1);
        if (state.from !== location.pathname)
            navigate(state.from, { state: state, replace: true });
        else navigate("/", { state: state, replace: true });
    };
    return (
        <header className="header pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        className="header-logo mr-auto"
                        onClick={go_back}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="fi-icon fi-icon-lg icon-angle-left" />
                    </a>
                    <a
                        href="src/templates/headers.tsx"
                        className="header-translate font-18"
                    >
                        <i className="fi-icon icon-translate" />
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
        if (!state?.from) navigate(-1);
        if (state.from !== location.pathname)
            navigate(state.from, { state: state, replace: true });
        else navigate("/", { state: state, replace: true });
    };
    return (
        <header className="header header-dark pt-3 pb-0">
            <div className="container">
                <nav className="d-flex align-items-center">
                    <a
                        className="header-logo mr-auto"
                        onClick={go_back}
                        style={{ cursor: "pointer" }}
                    >
                        <i className="fi-icon fi-icon-lg icon-angle-left" />
                    </a>
                    <a
                        href="src/templates/headers.tsx"
                        className="header-translate font-18"
                    >
                        <i className="fi-icon icon-translate" />
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
                    <a href="/" className="header-logo d-none d-md-block"><i className="fi-icon icon-diamond"></i></a>
                    <ul className="m-0 p-0">
                        <li><a href="/terms" className="px-3">Terms</a></li>
                        <li><a href="/privacy" className="px-3">Privacy</a></li>
                        <li><a href="#!" className="px-3">Support</a></li>
                    </ul>
                    <a href="#!" className="header-translate font-18"><i className="fi-icon icon-translate"></i></a>
                </nav>
            </div>
        </header>
    )
}