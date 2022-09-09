import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocationParams } from '../../types';

export function SuccessfulPage() {
    const location = useLocation();
    const state = location.state as LocationParams;

    const [searchParams] = useSearchParams();
    const eventType = searchParams.get('eventType') || 'transaction';

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon d-flex justify-content-center">
                            <i
                                className={`fa-duotone ${eventType === 'password' ? 'fa-key-skeleton-left-right' : 'fa-cloud-check'}`}
                            />
                        </div>
                        <h2 className="main-title">{t`successful.title`}</h2>
                        <p className="main-desc">{eventType === 'password' ? t`successful.password` : t`successful.description`}</p>
                        <div className="main-buttons">
                            <Link
                                to="/wallet"
                                className="btn btn-primary"
                            >
                                {t`button.go_to_wallet`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
