import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createWallet } from '../../../ton/utils';
import { LocationParams } from '../../../types';

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

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-shield-check" /></div>
                        <h2 className="main-title">{t`congratulations.title`}</h2>
                        <p className="main-desc">
                            {t`congratulations.description`}
                        </p>
                        <div className="main-buttons">
                            <Link
                                to="/wallet"
                                className="btn btn-primary"
                                style={{ pointerEvents: createDone ? 'auto' : 'none' }}
                            >
                                {t`button.got_it_start_using`}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
