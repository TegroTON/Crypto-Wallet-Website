import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMnemonic } from '../../../ton/utils';

export function ReadyPage() {
    useEffect(() => {
        getMnemonic().then();
    }, []);
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-pen-to-square" /></div>
                        <h2 className="main-title">Take a pen and paper</h2>
                        <p className="main-desc">
                            Get ready to write down the secret key.
                            This is the only way to regain access to the wallet.
                            It&apos;s safest not to store key on devices.
                        </p>
                        <div className="main-buttons">
                            <Link to="/create-wallet-secret" className="btn btn-primary">
                                Got it, let&apos;s
                                continue
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
