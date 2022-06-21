import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LocationParams } from '../types';

export function SecretCheckPage() {
    const location = useLocation();
    const navigator = useNavigate();
    const state = location.state as LocationParams;
    const wordList = state.data.words || [] as string[];
    const getRandNumbers = () => {
        const arr = [];
        while (arr.length < 3) {
            const r = Math.floor(Math.random() * 24) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return arr.sort((a, b) => a - b);
    };

    const onSubmit = async () => {
        navigator('/create-wallet-new-password', { state: { from: location.pathname, data: { words: wordList } } });
    };

    const [rNumbers] = useState(getRandNumbers());

    const {
        register, formState: { isValid, errors }, handleSubmit, getValues,
    } = useForm();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-microchip" /></div>
                        <h2 className="main-title">Let&apos;s check</h2>
                        <p className="main-desc mb-4">
                            To make sure you spelled the words correctly, enter words
                            {' '}
                            {`${rNumbers[0]}, ${rNumbers[1]} and ${rNumbers[2]}`}
                            .
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{ maxWidth: '378px' }}>
                            {rNumbers.map((i) => (
                                <div className="input-group mb-3">
                                    <div className="input-group-text">
                                        {i}
                                        .
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register(
                                            `${i}`,
                                            {
                                                required: true,
                                                validate: (value) => value === wordList[i - 1],
                                            },
                                        )}
                                        style={errors[`${i}`] ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                    />
                                </div>
                            ))}
                            <div className="main-buttons">
                                <button type="submit" className="btn btn-primary">Continue</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
