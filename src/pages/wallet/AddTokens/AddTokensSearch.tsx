import { useEffect, useRef, useState } from 'react';
import YAML from 'yaml';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { JettonsData, LocationParams } from '../../../types';

export function AddTokensSearch() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { selectedJettons } = state.data;
    const navigator = useNavigate();

    const [jettons, setJettons] = useState<JettonsData>({});
    const [selected, setSelected] = useState<JettonsData>(selectedJettons ?? {});

    const updateJettons = async () => setJettons(await fetch('./static/jettons.yml')
        .then((response) => response.text())
        .then((data) => YAML.parse(data) as JettonsData));

    useEffect(() => {
        updateJettons()
            .then();
    }, []);

    const updateSelected = (jetton: string, checked: boolean) => {
        if (checked) {
            setSelected((current) => {
                const copy = { ...current };
                copy[jetton] = jettons[jetton];
                return copy;
            });
        } else if (jetton in selected) {
            setSelected((current) => {
                const copy = { ...current };
                delete copy[jetton];
                return copy;
            });
        }
    };

    const {
        register,
        handleSubmit,
        watch,
    } = useForm({ mode: 'onChange' });

    const search = useRef('');
    search.current = watch('search', 'value');

    const onSubmit = async (data: any) => {
        if (Object.keys(selected).length > 0) {
            navigator('/add-tokens-confirm', {
                state: { data: { selectedJettons: selected } },
            });
        }
    };

    const { t } = useTranslation();

    return (
        <div
            className="tab-pane fade show active"
            id="nav-search"
            role="tabpanel"
            aria-labelledby="nav-search-tab"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="token-form">
                <div className="input-group mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fa-solid fa-magnifying-glass text-muted fa-lg" />
                        </span>
                    </div>
                    <input
                        type="search"
                        className="form-control"
                        placeholder={t`add_tokens.search_placeholder`}
                        {...register('search', {})}
                    />
                </div>
                <div className="alert border text-center p-4 mb-4" role="alert">
                    <i className="fa-regular fa-box-archive color-blue fa-2x mb-3" />
                    <p className="mb-0">
                        {t`add_tokens.search_description`}
                    </p>
                </div>
                <h4 className="token-form__title mb-3">{t`add_tokens.search_results`}</h4>
                <div
                    className="token-list overflow-auto"
                    style={{ maxHeight: '298px' }}
                >
                    {Object.keys(jettons)
                        .map((key) => {
                            if (!(jettons[key].name?.toLowerCase()
                                .includes(search.current.toLowerCase()))
                                && !(jettons[key].symbol.toLowerCase()
                                    .includes(search.current.toLowerCase()))) {
                                return '';
                            }
                            return (
                                <label
                                    className="token-list__item d-flex align-items-center"
                                    style={key in selected ? {
                                        backgroundColor: 'var(--blue-500)',
                                        color: 'var(--white)',
                                    } : {}}
                                >
                                    <input
                                        type="checkbox"
                                        style={{ display: 'none' }}
                                        {...register(key, {
                                            onChange: (event) => updateSelected(event.target.name, event.target.checked),
                                        })}
                                    />
                                    <div
                                        className="token-list__icon"
                                        style={{
                                            background: `url(${jettons[key].image}) no-repeat center center / contain`,
                                            filter: 'drop-shadow(0 0 1px #fff)',
                                        }}
                                    />
                                    <span
                                        className="token-list__name font-weight-medium"
                                    >
                                        {`${jettons[key].name} (${jettons[key].symbol})`}
                                    </span>
                                </label>
                            );
                        })}
                </div>
                <div className="main-buttons">
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        {t`button.next`}
                    </button>
                </div>
            </form>
        </div>
    );
}
