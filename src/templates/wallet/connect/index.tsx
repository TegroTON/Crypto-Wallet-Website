import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {setMnemonic} from "../../../ton/utils";
import {mnemonicValidate} from "ton-crypto";
import {wordlist} from "ton-crypto/dist/mnemonic/wordlist";

export function ConnectPage() {
    const navigator = useNavigate();

    const { register, formState: {isValid}, handleSubmit } = useForm({mode: "onChange"});

    const onSubmit = async (data: object) => {
        const words = Object.values(data)
        if (await mnemonicValidate(words)) {
            setMnemonic(words);
            navigator('/create-wallet-new-password', {state: { from: location.pathname }})
        }
    }
    // const array = new Array(24).fill(null).map((_, index) => {if (index % 2) { return ((index+1)/2)+12 } else { return (index/2)+1}})

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fi-icon icon-wallet"/></div>
                        <h3 className="main-title">Enter the secret key</h3>
                        <p className="main-desc mb-4">
                            To restore access, enter the 24 secret words <br/> you received when creating a wallet
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
                            <div className="row">
                                { Array(24).fill(null).map((e, i) => {
                                    return (
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-text">{i+1}.</div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register(i+1+"word",
                                                        {required: true,
                                                            validate: value => wordlist.includes(value)
                                                        }
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )
                                }) }
                            </div>

                            <div className="main-buttons">
                                <button type="submit" className="btn btn-primary" disabled={!isValid}>Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}