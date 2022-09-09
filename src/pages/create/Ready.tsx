import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMnemonic } from '../../ton/mnemonic';

export function ReadyPage() {
    useEffect(() => {
        getMnemonic()
            .then();
    }, []);

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon">
                            <i className="fa-duotone fa-pen-to-square" />
                        </div>
                        <h2 className="main-title">{t`create.title`}</h2>
                        <p className="main-desc">
                            {t`create.description`}
                        </p>
                        <div className="main-buttons">
                            <Link to="/create-wallet-secret" className="btn btn-primary">
                                {t`button.got_it_continue`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
