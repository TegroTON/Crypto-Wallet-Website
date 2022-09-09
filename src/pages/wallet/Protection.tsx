import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LocationParams } from '../../types';
import { checkPassValid } from '../../ton/utils';

export function ProtectionPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const navigator = useNavigate();

    const { to } = state;

    const {
        register,
        formState: { isValid },
        handleSubmit,
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (data: any) => {
        navigator(to ?? '/', {
            state: {
                ...state,
                noBack: true,
                data: {
                    ...state.data,
                    pass: data.password,
                },
            },
        });
    };

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-unlock" /></div>
                        <h2 className="main-title">{t`protect.enter_password`}</h2>
                        <p className="main-desc mb-4">{t`protect.to_continue`}</p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="main-form mx-auto"
                            style={{ maxWidth: '350px' }}
                        >
                            <div className="input-group mb-3" style={{ height: '60px' }}>
                                <div className="input-group-text">
                                    <i
                                        className="fa-regular fa-unlock font-24"
                                    />
                                </div>
                                <input
                                    type="password"
                                    placeholder={t`protect.password`}
                                    className="form-control"
                                    style={{ height: '60px' }}
                                    {...register('password', {
                                        required: true,
                                        validate: (value) => checkPassValid(value),
                                    })}
                                />
                            </div>
                            <div className="main-buttons">
                                <button
                                    className="btn btn-primary d"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    {t`button.continue`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
