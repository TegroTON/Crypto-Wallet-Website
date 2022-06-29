import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocationParams, JettonsData } from '../../../types';
import { addCustomJetton } from '../../../ton/utils';

export function AddTokensConfirmPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const selectedJettons = state.data?.selectedJettons ?? {} as JettonsData;
    const navigator = useNavigate();

    const addJettons = () => {
        Object.keys(selectedJettons)
            .map((key) => addCustomJetton(key, selectedJettons[key]));
        navigator('/wallet');
    };

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center">
                            <i
                                className="fa-duotone fa-hexagon-image"
                            />
                        </div>
                        <div className="text-center mb-4 pb-4 border-bottom">
                            <h2 className="main-title">{t`add_tokens.title`}</h2>
                            <p className="mb-0">{t`add_tokens.confirm_description`}</p>
                        </div>
                        <form onSubmit={addJettons} className="token-form">
                            <div className="token-list">
                                {Object.keys(selectedJettons)
                                    .map((key) => (
                                        <label
                                            className="token-list__item d-flex align-items-center"
                                        >
                                            <div
                                                className="token-list__icon"
                                                style={{ background: `url(${selectedJettons[key].image}) no-repeat center center / contain` }}
                                            />
                                            <span
                                                className="token-list__name font-weight-medium"
                                            >
                                                {`${selectedJettons[key].name} (${selectedJettons[key].symbol})`}
                                            </span>
                                        </label>
                                    ))}
                            </div>
                            <div className="main-buttons d-flex">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="btn btn-outline-primary mr-3"
                                    onClick={() => navigator(-1)}
                                >
                                    <i
                                        className="fa-regular fa-chevron-left mr-2"
                                    />
                                    {t`button.back`}
                                </a>
                                <button className="btn btn-primary" type="submit">
                                    {t`button.confirm_import`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
