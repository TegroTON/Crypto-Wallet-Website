import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { checkPassValid, reencryptMnemonic } from '../../../ton/utils';

export function ChangePasswordPage() {
    const location = useLocation();
    const navigator = useNavigate();
    const {
        register,
        formState: {
            isValid,
            errors,
        },
        watch,
        handleSubmit,
    } = useForm({ mode: 'onChange' });
    const password = useRef({});
    password.current = watch('password', 'value');

    const onSubmit = async (data: any) => {
        await reencryptMnemonic(data.current_password, data.password);
        navigator('/successful?eventType=password', {
            state: {
                noBack: true,
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
                        <h2 className="main-title">{t`change_password.title`}</h2>
                        <p className="main-desc mb-4">
                            {t`change_password.description`}
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="main-form mx-auto"
                            style={{ maxWidth: '378px' }}
                        >
                            <div className="input-group mb-3">
                                <div className="input-group-text">
                                    <i
                                        className="fa-regular fa-unlock font-24"
                                    />
                                </div>
                                <input
                                    type="password"
                                    placeholder={t`password.current_password`}
                                    className="form-control"
                                    {...register('current_password', {
                                        required: true,
                                        validate: (value: string) => (checkPassValid(value)),
                                    })}
                                    style={errors.current_password ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                />
                            </div>
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
                                    {...register('password_repeat', {
                                        required: true,
                                        validate: (value) => value === password.current,
                                    })}
                                    style={errors.password_repeat ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                />
                            </div>
                            <div className="main-buttons">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
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
