import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createWallet } from '../../../ton/utils';
import { LocationParams } from '../types';

export function CongratulationPage() {
    const [createDone, setCreateDone] = useState(false);
    const location = useLocation();
    const state = location.state as LocationParams;
    const password = state.data.pass || '';

    const getCreateWallet = async () => {
        setCreateDone(await createWallet(password));
    };

    useEffect(() => {
        getCreateWallet().then();
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-shield-check" /></div>
                        <h2 className="main-title">Congratulations!</h2>
                        <p className="main-desc">
                            Your wallet has been successfully created
                        </p>
                        <div className="main-buttons">
                            <Link
                                to="/wallet"
                                className="btn btn-primary"
                                style={{ pointerEvents: createDone ? 'auto' : 'none' }}
                            >
                                Got it, Start using
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
