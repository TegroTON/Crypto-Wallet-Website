import {Link} from "react-router-dom";

export function LoadPage() {
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <Link to="/create-wallet-ready">
                            <div className="main-icon fi-spin"><i className="fi-icon icon-settings"/></div>
                        </Link>
                        <h3 className="main-title">
                            Create a wallet
                            <span className="dots">
                             <span className="dot-one">.</span>
                             <span className="dot-two">.</span>
                             <span className="dot-three">.</span>
                            </span>
                        </h3>
                    </div>
                </div>
            </div>
        </main>
    )
}