import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";

export function SecretCheckPage() {
    const location = useLocation();
    const wordList = location.state as {words: string[]};
    const getRandNumbers = () => {
        let arr = [];
        while(arr.length < 3){
            const r = Math.floor(Math.random() * 24) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr.sort(function(a,b){ return a - b });
    }

    const [rNumbers] = useState(getRandNumbers())

    const { register, formState: {isValid} } = useForm({mode: "onChange"});

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fi-icon icon-cpu"/></div>
                        <h2 className="main-title">Let's check</h2>
                        <p className="main-desc mb-4">
                            To make sure you spelled the words correctly, enter words {`${rNumbers[0]}, ${rNumbers[1]} and ${rNumbers[2]}`}.
                        </p>
                        <form action="" className="mx-auto" style={{maxWidth: "378px"}}>
                            {rNumbers.map(function(i){
                                return (
                                    <div className="input-group mb-3">
                                        <div className="input-group-text">{i}.</div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register(`${i}`,
                                                {required: true,
                                                    validate: value => value === wordList?.words[i-1]}
                                            )}
                                        />
                                    </div>
                                )
                            })}
                            <div className="main-buttons">
                                <Link
                                    to="/create-wallet-new-password"
                                    className="btn btn-primary"
                                    style={{pointerEvents: isValid ? 'auto' : 'none'}}>Continue</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}