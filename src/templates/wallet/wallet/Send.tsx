import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { useState } from 'react';
import { LocationParams, JettonInfo } from '../types';
import { checkAddrValid } from '../../../ton/utils';

export function SendPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = state.data;
    const { jettonInfo } = state.data;
    const { send } = state.data;
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        register,
        formState: { isValid },
        handleSubmit,
    } = useForm({ mode: 'onChange' });

    const [jetton, setJetton] = useState<JettonInfo | undefined>(
        send?.jetton || jettonInfo,
    );

    const onSubmit = (data: any) => {
        navigator('/payment-protect', {
            state: {
                from: location.pathname,
                data: {
                    walletInfo,
                    send: {
                        address: data.recipient_address,
                        amount: data.amount,
                        message: data.message,
                        jetton: jetton ?? undefined,
                    },
                },
            },
        });
    };

    const installJetton = (address: string) => {
        if (!address) setJetton(undefined);
        for (const jettonInfo of walletInfo.wallet.jettons as JettonInfo[]) {
            if (jettonInfo.jetton.address === address) {
                setJetton(jettonInfo);
            }
        }
    };

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center">
                            <i className="fa-duotone fa-paper-plane-top fa-rotate-270" />
                        </div>
                        <h1 className="main-title text-center">
                            {`Send ${!jetton ? 'TON' : jetton.jetton.meta.symbol}`}
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="needs-validation mx-auto mt-5"
                        >
                            <div className="mb-4">
                                <label>Recipient</label>
                                <div className="input-group mt-2">
                                    <div className="input-group-text">
                                        <i className="fa-regular fa-qrcode fa-xl" />
                                    </div>
                                    <input
                                        defaultValue={
                                            send?.address || searchParams.get('address') || ''
                                        }
                                        type="text"
                                        placeholder="Enter wallet address"
                                        className="form-control"
                                        {...register('recipient_address', {
                                            required: true,
                                            validate: (value) => checkAddrValid(value),
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>Amount</label>
                                <div
                                    className="d-flex align-items-center border"
                                    style={{ height: '60px', borderRadius: '8px' }}
                                >
                                    <Dropdown
                                        onSelect={(eventKey) => {
                                            installJetton(eventKey || '');
                                        }}
                                    >
                                        {jetton ? (
                                            <DropdownToggle
                                                as="a"
                                                className="px-3 align-items-center"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    src={jetton.jetton.meta.image || ''}
                                                    width="24"
                                                    height="24"
                                                    alt={jetton.jetton.meta.name || ''}
                                                />
                                                <span className="ml-2 small">
                                                    {jetton.jetton.meta.symbol}
                                                </span>
                                            </DropdownToggle>
                                        ) : (
                                            <DropdownToggle
                                                as="a"
                                                className="px-3 align-items-center"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <img
                                                    src="/img/ton.png"
                                                    width="24"
                                                    height="24"
                                                    alt="Ton Coin"
                                                />
                                                <span className="ml-2 small">TON</span>
                                            </DropdownToggle>
                                        )}

                                        <DropdownMenu className="mt-4">
                                            <DropdownItem
                                                className="d-flex align-items-center"
                                                eventKey=""
                                            >
                                                <img
                                                    src="/img/ton.png"
                                                    width="24"
                                                    height="24"
                                                    alt="Ton Coin"
                                                />
                                                <span className="ml-2 small">TON</span>
                                            </DropdownItem>
                                            {walletInfo.wallet.jettons?.map((jt) => (
                                                <DropdownItem
                                                    className="d-flex align-items-center"
                                                    eventKey={jt.jetton.address}
                                                >
                                                    <img
                                                        src={jt.jetton.meta.image}
                                                        width="24"
                                                        height="24"
                                                        alt={jt.jetton.meta.name}
                                                    />
                                                    <span className="ml-2 small">
                                                        {jt.jetton.meta.symbol}
                                                    </span>
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>

                                    <div className="w-75">
                                        <input
                                            defaultValue={
                                                searchParams.get('amount') || send?.amount || 0
                                            }
                                            type="number"
                                            placeholder="0"
                                            className="text-center form-control border-0"
                                            style={{
                                                height: '58px',
                                                fontSize: '18px',
                                                borderTopLeftRadius: '0',
                                                borderBottomLeftRadius: '0',
                                            }}
                                            min={0}
                                            step="any"
                                            {...register('amount', {
                                                required: true,
                                                max: !jetton
                                                    ? walletInfo.wallet.balance
                                                    : jetton.balance,
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center font-14 m-2">
                                    <span className="color-grey">Your Balance</span>
                                    <span className="ml-auto color-blue">
                                        {jetton
                                            ? `${jetton.balance.toString()} ${
                                                jetton.jetton.meta.symbol
                                            }`
                                            : `${walletInfo.wallet.balance} TON`}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>Message</label>
                                <textarea
                                    defaultValue={
                                        searchParams.get('message') || send?.message || ''
                                    }
                                    id=""
                                    cols={30}
                                    rows={3}
                                    placeholder="Messages are not encrypted (optional)"
                                    className="mt-2 form-control"
                                    {...register('message')}
                                />
                            </div>
                            <div className="main-buttons">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
