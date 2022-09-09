import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, Coins } from 'ton3-core';
import { MessageExternalIn } from 'ton3-core/dist/contracts';
import { LocationParams, JettonInfo, Send } from '../../types';
import {
    generateTransferMessage,
    getAddressFromDomain, isDomain, sumFee,
} from '../../ton/utils';
import { WalletContext, WalletContextType } from '../../context';
import { tonClient } from '../../ton';

export function SendPage() {
    const location = useLocation();
    const state = location.state as LocationParams;
    const { walletInfo } = useContext(WalletContext) as WalletContextType;
    const { jettonInfo } = state.data;
    const { send } = state.data;
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();

    const { t } = useTranslation();

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        watch,
        getValues,
    } = useForm({ mode: 'onChange' });

    const amount = useRef({});
    amount.current = watch('amount', 0);

    const [jetton, setJetton] = useState<JettonInfo | undefined>(
        send?.jetton || jettonInfo,
    );

    const [transferMessage, setTransferMessage] = useState<MessageExternalIn | null>(null);
    const [fee, setFee] = useState<Coins>(new Coins(0.0055));

    const updateTransferMessage = async () => {
        if (isValid) {
            const recipient_address = getValues('recipient_address');
            const message = getValues('message');
            const recipient = isDomain(recipient_address)
                ? await getAddressFromDomain(recipient_address)
                : recipient_address;
            const currentSend: Send = {
                address: recipient,
                amount: Number(amount.current ?? 0),
                data: message,
                dataType: 'text',
                jetton: jetton ?? undefined,
            };
            setTransferMessage(await generateTransferMessage(currentSend));
        }

        setFee(jetton ? new Coins(0.099) : transferMessage !== null ? sumFee(await tonClient.getEstimateFee(transferMessage)) : new Coins(0.0055));
    };

    const symbol = jetton ? jetton.jetton.meta.symbol : 'TON';

    const onSubmit = async (data: any) => {
        const recipient = isDomain(data.recipient_address)
            ? await getAddressFromDomain(data.recipient_address)
            : data.recipient_address;
        navigator('/protect', {
            state: {
                from: location.pathname,
                to: '/sending',
                data: {
                    walletInfo,
                    send: {
                        address: recipient,
                        amount: Number(data.amount ?? 0),
                        data: data.message,
                        dataType: 'text',
                        jetton: jetton ?? undefined,
                    },
                },
            },
        });
    };

    const installJetton = (address: string) => {
        if (!address) setJetton(undefined);
        for (const jI of walletInfo.wallet.jettons as JettonInfo[]) {
            if (jI.jetton.address === address) {
                setJetton(jI);
            }
        }
    };

    const validateAmount = async (value: number) => {
        await updateTransferMessage();
        if (jetton) return (new Coins(value).lte(jetton.balance)) && (walletInfo.wallet.balance.gte(fee));
        return new Coins(value).lte(
            new Coins(walletInfo.wallet.balance).sub(fee)
                .add(new Coins(0.000000001)),
        );
    };

    const validateAddress = async (value: string) => {
        if (isDomain(value)) return !!(await getAddressFromDomain(value));
        return Address.isValid(value);
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
                            {`${t`send.send`} ${symbol}`}
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="needs-validation mx-auto mt-5"
                        >
                            <div className="mb-4">
                                <label>{t`send.recipient`}</label>
                                <div className="input-group mt-2">
                                    <div className="input-group-text">
                                        <i className="fa-regular fa-qrcode fa-xl" />
                                    </div>
                                    <input
                                        defaultValue={
                                            send?.address || searchParams.get('address') || ''
                                        }
                                        type="text"
                                        placeholder={t`send.enter_wallet_address`}
                                        className="form-control"
                                        style={errors.recipient_address ? { boxShadow: '0 0 0 .2rem rgba(255,0,0,0.25)' } : {}}
                                        {...register('recipient_address', {
                                            required: true,
                                            validate: (value) => validateAddress(value),
                                            onBlur: () => updateTransferMessage(),
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>{t`send.amount`}</label>
                                <div
                                    className="d-flex align-items-center border"
                                    style={{
                                        height: '60px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Dropdown
                                        onSelect={(eventKey: any) => {
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
                                                    src="/img/tokens/ton.png"
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
                                                    src="/img/tokens/ton.png"
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
                                                boxShadow: errors.amount ? '0 0 0 .2rem rgba(255,0,0,0.25)' : '',
                                            }}
                                            min={0}
                                            step="any"
                                            {...register('amount', {
                                                required: true,
                                                max: !jetton
                                                    ? Number(walletInfo.wallet.balance.toString())
                                                    : Number(jetton.balance.toString()),
                                                validate: (value) => validateAmount(value),
                                                onBlur: () => updateTransferMessage(),
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center font-14 m-2">
                                    <span className="color-grey">{t`send.your_balance`}</span>
                                    <span className="ml-auto color-blue">
                                        {`${jetton ? jetton.balance : walletInfo.wallet.balance} ${symbol}`}
                                    </span>
                                </div>
                                <div className="alert border my-4 p-3" role="alert">
                                    <div className="d-flex align-items-center small mb-3">
                                        <span
                                            className="color-dark font-weight-medium"
                                        >
                                            {t`send.do_you_send`}
                                        </span>
                                        <span className="ml-auto color-grey">
                                            {`${parseFloat(amount.current as string) || 0} ${symbol}`}
                                        </span>
                                    </div>
                                    <div className="d-flex align-items-center small">
                                        <span
                                            className="color-dark font-weight-medium"
                                        >
                                            {t`send.fee`}
                                        </span>
                                        <span className="ml-auto color-grey">{`~ ${fee} TON`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label>{t`send.message`}</label>
                                <textarea
                                    defaultValue={
                                        searchParams.get('message') || send?.data || ''
                                    }
                                    id=""
                                    cols={30}
                                    rows={3}
                                    placeholder={t`send.message_description`}
                                    className="mt-2 form-control"
                                    {...register('message', {
                                        onBlur: () => updateTransferMessage(),
                                    })}
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
