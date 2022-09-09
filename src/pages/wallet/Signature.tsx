import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocationParams, TaskStorage } from '../../types';

export function SignaturePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationParams;
    const { data: { taskInfo } } = state;

    const { params } = taskInfo as TaskStorage;

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-5 col-xl-4 mx-auto">
                        <div className="main-icon  text-center">
                            <i
                                className="fa-duotone fa-file-signature"
                            />
                        </div>
                        <h3
                            className="main-title text-center"
                            style={{
                                maxWidth: '416px',
                            }}
                        >
                            {t`signature.title`}
                        </h3>
                        <ul className="p-3 p-lg-4 rounded alert list-unstyled mb-3 mt-5">
                            <p className="mb-3 text-center font-18 fw-bold">
                                {t`signature.question`}
                            </p>
                            <li className="d-flex justify-content-between">
                                <div className="fw-medium p-2 font-14">{t`signature.data`}</div>
                                <div
                                    className="fw-medium p-2 font-14"
                                    style={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-all',
                                    }}
                                >
                                    {params}
                                </div>
                            </li>
                        </ul>
                        <div className="main-buttons d-flex justify-content-between">
                            <a
                                onClick={() => navigate('/wallet')}
                                className="btn btn-secondary"
                            >
                                {t`button.cancel`}
                            </a>
                            <a
                                onClick={() => navigate('/protect', {
                                    state: {
                                        ...state,
                                        to: '/signing',
                                    },
                                })}
                                className="btn btn-primary"
                            >
                                {t`button.continue`}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
