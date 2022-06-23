import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NewPasswordPage() {
    const location = useLocation();
    const { register, formState: { isValid }, watch } = useForm({ mode: 'onChange' });
    const password = useRef({});
    password.current = watch('password', 'value');

    const { t } = useTranslation();

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
                        <form action="" className="main-form mx-auto" style={{ maxWidth: '378px' }}>
                            <div className="input-group mb-3">
                                <div className="input-group-text"><i className="fa-regular fa-unlock font-24" /></div>
                                <input
                                    type="password"
                                    placeholder={t`new_password.create_new_password`}
                                    className="form-control"
                                    {...register('password', {
                                        required: true,
                                        validate: (value: string) => (value.length > 0),
                                    })}
                                />
                            </div>
                            <div className="input-group">
                                <div className="input-group-text"><i className="fa-regular fa-unlock font-24" /></div>
                                <input
                                    type="password"
                                    placeholder={t`new_password.repeat_password`}
                                    className="form-control"
                                    {...register(
                                        'password_repeat',
                                        {
                                            required: true,
                                            validate: (value) => value === password.current,
                                        },
                                    )}
                                />
                            </div>
                            <div className="main-buttons">
                                <Link
                                    to="/create-wallet-congratulations"
                                    className="btn btn-primary"
                                    state={{
                                        from: location.pathname,
                                        noBack: true,
                                        data: { pass: password.current },
                                    }}
                                    style={{ pointerEvents: isValid ? 'auto' : 'none' }}
                                >
                                    {t`button.continue`}
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
