import {useEffect} from "react";
import {getMnemonic} from "../../../ton/utils";
import {Link} from "react-router-dom";

export function ReadyPage() {
    useEffect(() => {
        getMnemonic().then();
    }, []);
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fi-icon icon-edit"/></div>
                        <h2 className="main-title">Take a pen and paper</h2>
                        <p className="main-desc">
                            Get ready to write down the secret key. This is the only way to regain access to the wallet.
                            It's safest not to store key on devices.
                        </p>
                        <div className="main-buttons">
                            <Link to="/create-wallet-secret" className="btn btn-primary">Got it, let's continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}