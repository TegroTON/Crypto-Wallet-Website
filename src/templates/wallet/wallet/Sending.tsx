import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LocationParams, Send } from '../types';
import { checkSeqnoUpdate, sendTransaction } from '../../../ton/utils';

export function SendingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;
    const { send } = state.data;

    useEffect(() => {
        sendTransaction(send as Send, state.data.pass || '').then();
        const interval = setInterval(async () => {
            if (await checkSeqnoUpdate(walletInfo.wallet.seqno || 0)) {
                clearInterval(interval);
                navigate('/successful', {
                    state: { noBack: true, data: { walletInfo } },
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 mx-auto text-center">
                        <div className="main-icon fi-spin"><i className="fa-regular fa-gear" /></div>
                        <h2 className="main-title">
                            Transaction processing
                            <span className="dots">
                                <span className="dot-one">.</span>
                                <span className="dot-two">.</span>
                                <span className="dot-three">.</span>
                            </span>
                        </h2>
                        <p className="main-desc">
                            This may take a few minutes, please be patient.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
