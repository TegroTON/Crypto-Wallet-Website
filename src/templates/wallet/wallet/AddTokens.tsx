import { useTranslation } from 'react-i18next';
import { AddTokensSearch } from './AddTokensSearch';
import { AddTokensCustom } from './AddTokensCustom';

export function AddTokensPage() {
    const { t } = useTranslation();
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center">
                            <i className="fa-duotone fa-hexagon-image" />
                        </div>
                        <h2 className="main-title text-center">{t`add_tokens.title`}</h2>
                        <nav>
                            <div
                                className="nav nav-tabs border-bottom mb-4"
                                id="nav-tab"
                                role="tablist"
                            >
                                <button
                                    className="nav-link active"
                                    id="nav-search-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-search"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-search"
                                    aria-selected="true"
                                >
                                    {t`button.search`}
                                </button>
                                <button
                                    className="nav-link"
                                    id="nav-custom-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-custom"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-custom"
                                    aria-selected="false"
                                >
                                    {t`button.custom_token`}
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div
                                className="tab-pane fade active show"
                                id="nav-search"
                                role="tabpanel"
                                aria-labelledby="nav-search-tab"
                            >
                                <AddTokensSearch />
                            </div>
                            <div
                                className="tab-pane fade"
                                id="nav-custom"
                                role="tabpanel"
                                aria-labelledby="nav-custom-tab"
                            >
                                <AddTokensCustom />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
