import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocationParams, Send } from '../../types';
import { checkSeqnoUpdate, sendTransaction } from '../../ton/utils';
import storage from '../../utils/storage';

export function SendingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationParams;
    const {
        data: {
            walletInfo,
            send,
            taskInfo,
            pass,
        },
    } = state;

    const main = async () => {
        await sendTransaction(send as Send, pass || '');
        if (taskInfo) {
            await storage.setItem('activeTask', JSON.stringify({
                ...taskInfo,
                result: true,
            }));
            navigate('/wallet');
        }
    };

    useEffect(() => {
        main()
            .then();
        if (!taskInfo) {
            const interval = setInterval(async () => {
                if (await checkSeqnoUpdate(walletInfo?.wallet.seqno || 0, walletInfo?.walletType)) {
                    clearInterval(interval);
                    navigate('/successful', {
                        state: {
                            noBack: true,
                            data: { walletInfo },
                        },
                    });
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, []);

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 mx-auto text-center">
                        <div className="main-icon fi-spin">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjMDA3YWZmIj48cGF0aCBkPSJNNTA0LjEgMzE1LjFjMC04LjY1Mi00LjYwNy0xNi44NC0xMi4zNi0yMS4zOWwtMzIuOTEtMTguOTdDNDU5LjUgMjY5LjEgNDU5LjggMjYyLjUgNDU5LjggMjU2cy0uMzIyOC0xMy4xLS45NjgzLTE5LjYybDMyLjkxLTE4Ljk3YzcuNzUyLTQuNTQ4IDEyLjM2LTEyLjc0IDEyLjM2LTIxLjM5YzAtMjEuMjctNDkuMzItMTI4LjItODQuNTItMTI4LjJjLTQuMjQ0IDAtOC41MSAxLjA5NC0xMi4zNyAzLjM1N2wtMzIuNzggMTguOTdjLTEwLjcxLTcuNzQyLTIyLjA3LTE0LjMyLTM0LjA3LTE5Ljc0VjMyLjQ5YzAtMTEuMjMtNy40ODQtMjEuMDQtMTguMzMtMjMuODhDMzAwLjUgMi44NzEgMjc4LjMgMCAyNTYgMEMyMzMuOCAwIDIxMS41IDIuODcxIDE4OS45IDguNjEzQzE3OS4xIDExLjQ1IDE3MS42IDIxLjI2IDE3MS42IDMyLjQ5djM3Ljk0Yy0xMiA1LjQyLTIzLjM2IDEyLTM0LjA3IDE5Ljc0bC0zMi43OC0xOC45N0MxMDAuOSA2OC45NCA5Ni42MyA2Ny44NSA5Mi4zOCA2Ny44NWMtLjAwMjUgMCAuMDAyNSAwIDAgMGMtMzIuNDYgMC04NC41MiAxMDEuNy04NC41MiAxMjguMmMwIDguNjUyIDQuNjA3IDE2Ljg0IDEyLjM2IDIxLjM5bDMyLjkxIDE4Ljk3QzUyLjQ5IDI0Mi45IDUyLjE3IDI0OS41IDUyLjE3IDI1NnMuMzIyOCAxMy4xIC45NjgzIDE5LjYyTDIwLjIzIDI5NC42QzEyLjQ3IDI5OS4xIDcuODY3IDMwNy4zIDcuODY3IDMxNS4xYzAgMjEuMjcgNDkuMzIgMTI4LjIgODQuNTIgMTI4LjJjNC4yNDQgMCA4LjUxLTEuMDk0IDEyLjM3LTMuMzU3bDMyLjc4LTE4Ljk3YzEwLjcxIDcuNzQyIDIyLjA3IDE0LjMyIDM0LjA3IDE5Ljc0djM3Ljk0YzAgMTEuMjMgNy40ODQgMjEuMDQgMTguMzMgMjMuODhDMjExLjUgNTA5LjEgMjMzLjcgNTEyIDI1NS4xIDUxMmMyMi4yNSAwIDQ0LjQ3LTIuODcxIDY2LjA4LTguNjEzYzEwLjg0LTIuODQgMTguMzMtMTIuNjUgMTguMzMtMjMuODh2LTM3Ljk0YzEyLTUuNDIgMjMuMzYtMTIgMzQuMDctMTkuNzRsMzIuNzggMTguOTdjMy44NTUgMi4yNjQgOC4xMjMgMy4zNTcgMTIuMzcgMy4zNTdDNDUyLjEgNDQ0LjIgNTA0LjEgMzQyLjQgNTA0LjEgMzE1LjF6TTQxNS4yIDM4OS4xbC00My42Ni0yNS4yNmMtNDIuMDYgMzAuMzktMzIuMzMgMjQuNzMtNzkuMTcgNDUuODl2NTAuMjRjLTEzLjI5IDIuMzQxLTI1LjU4IDMuMTgtMzYuNDQgMy4xOGMtMTUuNDIgMC0yNy45NS0xLjY5My0zNi4zNi0zLjE3NnYtNTAuMjRjLTQ2Ljk1LTIxLjIxLTM3LjE4LTE1LjU0LTc5LjE3LTQ1Ljg5bC00My42NCAyNS4yNWMtMTUuNzQtMTguNjktMjguMDctNDAuMDUtMzYuNDEtNjMuMTFMMTAzLjEgMzAxLjdDMTAxLjQgMjc2LjEgMTAwLjEgMjY2LjEgMTAwLjEgMjU2YzAtMTAuMDIgMS4yNjgtMjAuMDggMy44MS00NS43Nkw2MC4zNyAxODUuMkM2OC42OSAxNjIuMSA4MS4wNSAxNDAuNyA5Ni43NyAxMjJsNDMuNjYgMjUuMjZjNDIuMDYtMzAuMzkgMzIuMzMtMjQuNzMgNzkuMTctNDUuODlWNTEuMThjMTMuMjktMi4zNDEgMjUuNTgtMy4xOCAzNi40NC0zLjE4YzE1LjQyIDAgMjcuOTUgMS42OTMgMzYuMzYgMy4xNzZ2NTAuMjRjNDYuOTUgMjEuMjEgMzcuMTggMTUuNTQgNzkuMTcgNDUuODlsNDMuNjQtMjUuMjVjMTUuNzQgMTguNjkgMjguMDcgNDAuMDUgMzYuNCA2My4xMUw0MDggMjEwLjNjMi41MzggMjUuNjQgMy44MSAzNS42NCAzLjgxIDQ1LjY4YzAgMTAuMDItMS4yNjggMjAuMDgtMy44MSA0NS43Nmw0My41OCAyNS4xMkM0NDMuMyAzNDkuOSA0MzAuOSAzNzEuMyA0MTUuMiAzODkuMXpNMjU2IDE1OS4xYy01Mi44OCAwLTk2IDQzLjEzLTk2IDk2UzIwMy4xIDM1MS4xIDI1NiAzNTEuMXM5Ni00My4xMyA5Ni05NlMzMDguOSAxNTkuMSAyNTYgMTU5LjF6TTI1NiAzMDRDMjI5LjUgMzA0IDIwOCAyODIuNSAyMDggMjU2UzIyOS41IDIwOCAyNTYgMjA4czQ4IDIxLjUzIDQ4IDQ4UzI4Mi41IDMwNCAyNTYgMzA0eiIvPjwvc3ZnPg=="
                                alt=""
                            />
                        </div>
                        <h2 className="main-title">
                            {t`sending.title`}
                            <span className="dots">
                                <span className="dot-one">.</span>
                                <span className="dot-two">.</span>
                                <span className="dot-three">.</span>
                            </span>
                        </h2>
                        <p className="main-desc">
                            {t`sending.description`}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
