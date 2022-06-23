import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LocationParams } from '../../../types';
import { checkPassValid } from '../../../ton/utils';

export function PaymentProtectionPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;
    const { send } = state.data;
    const navigator = useNavigate();

    const {
        register,
        formState: { isValid },
        handleSubmit,
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (data: any) => {
        navigator('/sending', {
            state: {
                noBack: true,
                data: {
                    walletInfo,
                    send,
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
                        <h2 className="main-title">{t`payment_protect.enter_password`}</h2>
                        <p className="main-desc mb-4">{t`payment_protect.to_make_trans`}</p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="main-form mx-auto"
                            style={{ maxWidth: '350px' }}
                        >
                            <div className="input-group mb-3" style={{ height: '60px' }}>
                                <div className="input-group-text"><i className="fa-regular fa-unlock font-24" /></div>
                                <input
                                    type="password"
                                    placeholder={t`payment_protect.password`}
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
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    {`${t`payment_protect.send`} ${send?.jetton ? send.jetton.jetton.meta.symbol : 'TON'}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
