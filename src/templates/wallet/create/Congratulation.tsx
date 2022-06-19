import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {createWallet} from "../../../ton/utils";

export function CongratulationPage() {
    const [createDone, setCreateDone] = useState(false);
    const location = useLocation();
    const password = typeof location.state === 'string' ? location.state : "";

    const getCreateWallet = async () => {
        setCreateDone(await createWallet(password));
    }

    useEffect(() => {
        getCreateWallet().then();
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fi-icon icon-pocket"/></div>
                        <h2 className="main-title">Congratulations!</h2>
                        <p className="main-desc">
                            Your wallet has been successfully created
                        </p>
                        <div className="main-buttons">
                            <Link
                                to="/wallet"
                                className="btn btn-primary"
                                style={{pointerEvents: createDone ? 'auto' : 'none'}}>Got it, Start using</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}