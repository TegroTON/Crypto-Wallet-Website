import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { createWallet } from '../../ton/wallet';

export function NewPasswordPage() {
    const location = useLocation();
    const navigator = useNavigate();

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        watch,
    } = useForm({ mode: 'onChange' });

    const password = useRef({});
    password.current = watch('password', 'value');

    const { t } = useTranslation();

    const onSubmit = async () => {
        await createWallet(password.current as string);
        navigator('/create-wallet-congratulations', {
            state: {
                from: location.pathname,
                noBack: true,
            },
        });
    };

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-unlock" /></div>
                        <h2 className="main-title">{t`new_password.title`}</h2>
                        <p className="main-desc mb-4">
                            {t`new_password.description`}
                        </p>
                        <form
                            className="main-form mx-auto"
                            style={{ maxWidth: '378px' }}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <i
                                        className="fa-regular fa-unlock font-24"
                                    />
                                </div>
                                <input
                                    type="password"
                                    placeholder={t`password.new_password`}
                                    className="form-control"
                                    {...register('password', {
                                        required: true,
                                        minLength: 1,
                                    })}
                                    style={errors.password ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                />
                            </div>
                            <div className="input-group">
                                <div className="input-group-text">
                                    <i
                                        className="fa-regular fa-unlock font-24"
                                    />
                                </div>
                                <input
                                    type="password"
                                    placeholder={t`password.repeat_password`}
                                    className="form-control"
                                    {...register(
                                        'password_repeat',
                                        {
                                            required: true,
                                            validate: (value) => value === password.current,
                                        },
                                    )}
                                    style={errors.password_repeat ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                />
                            </div>
                            <div className="main-buttons">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
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
