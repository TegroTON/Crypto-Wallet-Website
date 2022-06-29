import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { JettonMeta, LocationParams } from '../../../types';
import { addCustomJetton, checkJettonValid, getJettonData } from '../../../ton/utils';

export function AddTokensCustom() {
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
        await addCustomJetton(data.jetton_address);
        navigator('/wallet', {
            state: {
                from: location.pathname,
                data: { walletInfo },
            },
        });
    };

    const { t } = useTranslation();

    return (
        <>
            <div className="alert border d-flex p-3 mb-4" role="alert">
                <i className="fa-regular fa-circle-info mt-1 mr-3 color-blue" />
                <p className="mb-0 small">
                    {t`add_tokens.custom_description`}
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="needs-validation mx-auto mt-5"
            >
                <div className="mb-4">
                    <label>{t`add_tokens.address`}</label>
                    <div className="input-group mt-2">
                        <input
                            type="text"
                            placeholder={t`add_tokens.address_placeholder`}
                            className="form-control"
                            {...register('jetton_address', {
                                required: true,
                                validate: (value) => handleCheck(value),
                            })}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label>{t`add_tokens.symbol`}</label>
                    <div className="input-group mt-2 mb-2">
                        <input
                            type="text"
                            placeholder={t`add_tokens.symbol_placeholder`}
                            className="form-control"
                            disabled
                            {...register('jetton_symbol', { required: true })}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label>{t`add_tokens.decimal`}</label>
                    <div className="mt-2 mb-2">
                        <input
                            type="number"
                            placeholder="0"
                            className="form-control"
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
        </>
    );
}
