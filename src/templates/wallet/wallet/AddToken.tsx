import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addJetton, checkJettonValid, getJettonData } from '../../../ton/utils';
import { LocationParams } from '../../../types';

export function AddTokenPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;
    const navigator = useNavigate();

    const {
        register,
        formState: { isValid },
        handleSubmit,
        setValue,
    } = useForm({ mode: 'onChange' });

    const handleCheck = async (jettonAddress: string) => {
        const valid = await checkJettonValid(jettonAddress);
        if (valid) {
            const jettonData = await getJettonData(jettonAddress);
            setValue('jetton_symbol', jettonData.symbol);
            setValue('jetton_decimal', jettonData.decimal || 9);
        } else {
            setValue('jetton_symbol', '');
            setValue('jetton_decimal', 9);
        }
        return valid;
    };

    const onSubmit = async (data: any) => {
        await addJetton(data.jetton_address);
        navigator('/wallet', {
            state: {
                from: location.pathname,
                data: { walletInfo },
            },
        });
    };

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center">
                            <i className="fa-duotone fa-hexagon-image" />
                        </div>
                        <h2 className="main-title text-center">{t`add_token.title`}</h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="needs-validation mx-auto mt-5"
                        >
                            <div className="mb-4">
                                <label>{t`add_token.address`}</label>
                                <div className="input-group mt-2">
                                    <input
                                        type="text"
                                        placeholder={t`add_token.address_placeholder`}
                                        className="form-control"
                                        {...register('jetton_address', {
                                            required: true,
                                            validate: (value) => handleCheck(value),
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>{t`add_token.symbol`}</label>
                                <div className="input-group mt-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder={t`add_token.symbol_placeholder`}
                                        className="form-control"
                                        disabled
                                        {...register('jetton_symbol', { required: true })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>{t`add_token.decimal`}</label>
                                <div className="mt-2 mb-2">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="form-control"
                                        defaultValue={9}
                                        disabled
                                        {...register('jetton_decimal', { required: true })}
                                    />
                                </div>
                            </div>
                            <div className="main-buttons">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    {t`button.add_custom_token`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
