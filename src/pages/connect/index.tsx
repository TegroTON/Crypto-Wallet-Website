import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { mnemonicValidate } from 'ton-crypto';
import { wordlist } from 'ton-crypto/dist/mnemonic/wordlist';
import { useTranslation } from 'react-i18next';
import { setMnemonic } from '../../ton/mnemonic';

export function ConnectPage() {
    const navigator = useNavigate();

    const {
        register,
        formState: {
            errors,
        },
        getValues,
        handleSubmit,
        setValue,
    } = useForm();

    const onSubmit = async (data: object) => {
        const words = Object.values(data);
        if (await mnemonicValidate(words)) {
            await setMnemonic(words);
            navigator('/create-wallet-new-password', { state: { from: location.pathname } });
        }
    };

    const { t } = useTranslation();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-wallet" /></div>
                        <h3 className="main-title">{t`connect.title`}</h3>
                        <p className="main-desc mb-4">
                            {t`connect.description`}
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                            <div className="row">
                                <div className="col-6">
                                    {Array(12)
                                        .fill(null)
                                        .map((e, i) => (
                                            <div key={i} className="input-group mb-3">
                                                <div className="input-group-text">
                                                    {`${i + 1}.`}
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register(`${i + 1}word`, {
                                                        required: true,
                                                        validate: (value) => wordlist.includes(value),
                                                        onChange: (event) => setValue(
                                                            event.target.name,
                                                            event.target.value
                                                                .toLowerCase()
                                                                .replaceAll(/[^a-z]/g, ''),
                                                        ),
                                                    })}
                                                    style={(errors[`${i + 1}word`] && getValues()[`${i + 1}word`]) ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                                />
                                            </div>
                                        ))}
                                </div>
                                <div className="col-6">
                                    {Array(12)
                                        .fill(null)
                                        .map((e, i) => (
                                            <div key={i} className="input-group mb-3">
                                                <div className="input-group-text">
                                                    {`${i + 1 + 12}.`}
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register(`${i + 1 + 12}word`, {
                                                        required: true,
                                                        validate: (value) => wordlist.includes(value),
                                                        onChange: (event) => setValue(
                                                            event.target.name,
                                                            event.target.value
                                                                .toLowerCase()
                                                                .replaceAll(/[^a-z]/g, ''),
                                                        ),
                                                    })}
                                                    style={(errors[`${i + 1 + 12}word`] && getValues()[`${i + 1 + 12}word`]) ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                                />
                                            </div>
                                        ))}
                                </div>
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
