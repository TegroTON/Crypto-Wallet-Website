import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { clearStorage } from '../../utils';

export function LoginPage() {
    clearStorage();

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <img
                            src="/img/logo.webp"
                            className="img-fluid mb-5"
                            width="100"
                            height="80"
                            alt="TON Hold"
                        />
                        <h2 className="main-title main-title__bold">TON Wallet</h2>
                        <p className="main-desc">
                            {t`login.description`}
                        </p>
                        <div className="main-buttons">
                            <Link
                                to="/connect-wallet"
                                className="btn btn-primary"
                            >
                                {t`button.connect_wallet`}
                            </Link>
                            <Link
                                to="/create-wallet"
                                className="btn btn-secondary"
                            >
                                {t`button.create_new`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
