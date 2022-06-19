import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getBalance,
  getMnemonic,
  getTransactions,
  getAddress,
  getSeqno,
  getPubKey,
  loadJettons,
  removeJetton,
  getWallet,
  getWalletType, addJetton,
} from "../../../ton/utils";
import { fromNano } from "ton";
import { ReceivedTransaction, SentTransaction } from "./Transaction";
import { LocationParams, WalletInfo } from "../types";
import { Buffer } from "buffer";

export function WalletPage() {
  const location = useLocation();
  const state = location.state as LocationParams;
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(
    state?.data.walletInfo ||
      ({
        mnemonic: "",
        encrypted: "",
        public_key: Buffer.from("", "hex"),
        walletType: "v3r2",
        wallet: {
          balance: 0,
          address: "",
          seqno: 0,
        },
      } as WalletInfo)
  );

  const updateWalletInfo = async () => {
    const walletType = getWalletType();
    const address = await getAddress(walletType);
    const balance = parseFloat(fromNano(await getBalance(address)));
    const seqno = await getSeqno(address);
    const [mnemonic, encrypted] = await getMnemonic();
    const pub_key = getPubKey();
    const jettons = await loadJettons(address);
    const transactions = await getTransactions(address);
    setWalletInfo({
      ...walletInfo,
      mnemonic: mnemonic,
      encrypted: encrypted,
      public_key: pub_key,
      walletType: walletType,
      wallet: {
        address: address,
        balance: balance,
        seqno: seqno,
        transactions: transactions,
        jettons: jettons,
      },
    });
  };

  const updateJettons = async () => {
    const jettons = await loadJettons(walletInfo.wallet.address);
    setWalletInfo({
      ...walletInfo,
      wallet: { ...walletInfo.wallet, jettons: jettons },
    });
  };

  const updateTransactions = async () => {
    const limit = (walletInfo.wallet.transactions?.length ?? 5) + 5;
    const transactions = await getTransactions(
      walletInfo.wallet.address,
      limit
    );
    setWalletInfo({
      ...walletInfo,
      wallet: { ...walletInfo.wallet, transactions: transactions },
    });
  };

  useEffect(() => {
    updateWalletInfo().then();
  }, []);

  return (
    <main className="page-main d-block pt-0">
      <div className="wallet-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-5 text-center mx-auto">
              <i className="fi-icon icon-diamond main-icon color-blue" />
              <h3 className="wallet-title mb-0 mt-5">
                {walletInfo.wallet.balance} TON
              </h3>
              <div
                className="wallet-balance mx-auto d-flex justify-content-between"
                style={{ maxWidth: "286px" }}
              >
                <div>
                  Your balance: <span className="ml-2">$5.11</span>
                </div>
                <div className="color-green">
                  <i className="fi-icon icon-arrow-growth mr-2" /> 4.1%
                </div>
              </div>
              <div
                className="btn-group d-flex flex-fill mx-auto mt-5"
                role="group"
              >
                <Link
                  to="/receive-ton"
                  className="btn btn-primary w-50"
                  state={{
                    from: location.pathname,
                    data: { walletInfo: walletInfo },
                  }}
                >
                  <i className="fi-icon icon-arrow-down-left font-18 btn-icon mr-2" />
                  Receive
                </Link>
                {walletInfo.wallet.balance > 0 ? (
                  <Link
                    to="/send-ton"
                    className="btn btn-secondary w-50"
                    state={{
                      from: location.pathname,
                      data: { walletInfo: walletInfo },
                    }}
                  >
                    Send
                    <i className="fi-icon icon-u_arrow-up-right font-18 btn-icon ml-2" />
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-5 mx-auto">
            <div className="wallet-token border-bottom pb-5 mb-5">
              <h2 className="wallet-head__title mb-4">Tokens</h2>

              {walletInfo.wallet.jettons?.map((jt) => {
                return (
                  <div className="wh-item position-relative">
                    <Link
                      to="/jetton"
                      className="d-flex align-item-center"
                      state={{
                        from: location.pathname,
                        data: { walletInfo: walletInfo, jettonInfo: jt },
                      }}
                    >
                      <div className="wh-item__icon mr-3">
                        <img
                          src={jt.jetton.meta.image}
                          className="rounded-circle img-fluid"
                          width="48"
                          height="48"
                          alt={jt.jetton.meta.name}
                        />
                      </div>
                      <div className="wh-item__transaction">
                        <h3 className="wh-item__title">
                          {jt.jetton.meta.name}
                        </h3>
                        <p className="wh-item__number">
                          {jt.jetton.meta.description}
                        </p>
                      </div>
                      <div className="wh-item__ton color-blue ml-auto">{`${jt.balance} ${jt.jetton.meta.symbol}`}</div>
                    </Link>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeJetton(jt.jetton.address);
                        updateJettons().then();
                      }}
                      className="wm-item__del"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 18C10.2652 18 10.5196 17.8946 10.7071 17.7071C10.8946 17.5196 11 17.2652 11 17V11C11 10.7348 10.8946 10.4804 10.7071 10.2929C10.5196 10.1054 10.2652 10 10 10C9.73478 10 9.48043 10.1054 9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11V17C9 17.2652 9.10536 17.5196 9.29289 17.7071C9.48043 17.8946 9.73478 18 10 18ZM20 6H16V5C16 4.20435 15.6839 3.44129 15.1213 2.87868C14.5587 2.31607 13.7956 2 13 2H11C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5V6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7C3 7.26522 3.10536 7.51957 3.29289 7.70711C3.48043 7.89464 3.73478 8 4 8H5V19C5 19.7956 5.31607 20.5587 5.87868 21.1213C6.44129 21.6839 7.20435 22 8 22H16C16.7956 22 17.5587 21.6839 18.1213 21.1213C18.6839 20.5587 19 19.7956 19 19V8H20C20.2652 8 20.5196 7.89464 20.7071 7.70711C20.8946 7.51957 21 7.26522 21 7C21 6.73478 20.8946 6.48043 20.7071 6.29289C20.5196 6.10536 20.2652 6 20 6ZM10 5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V6H10V5ZM17 19C17 19.2652 16.8946 19.5196 16.7071 19.7071C16.5196 19.8946 16.2652 20 16 20H8C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V8H17V19ZM14 18C14.2652 18 14.5196 17.8946 14.7071 17.7071C14.8946 17.5196 15 17.2652 15 17V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10C13.7348 10 13.4804 10.1054 13.2929 10.2929C13.1054 10.4804 13 10.7348 13 11V17C13 17.2652 13.1054 17.5196 13.2929 17.7071C13.4804 17.8946 13.7348 18 14 18Z"
                          fill="#D8DFEA"
                        />
                      </svg>
                    </a>
                  </div>
                );
              })}

              <div className="alert border text-center" role="alert">
                You can always add custom tokens <br /> to our wallet to manage
                them.
              </div>
              <div className="text-center">
                <Link
                  to="/add-token"
                  className="btn btn-primary"
                  state={{
                    from: location.pathname,
                    data: { walletInfo: walletInfo },
                  }}
                >
                  Add Custom Token
                </Link>
              </div>
            </div>

            <div className="wallet-history wh accordion" id="accordionTon">
              <div className="wallet-head d-flex align-iteml-center justify-content-between">
                <h2 className="wallet-head__title">All Transactions</h2>
                <div className="dropdown">
                  <a
                    href="#"
                    className="d-flex align-iteml-center small"
                    id="filters"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    30 days <i className="fi-icon icon-arrows-shrink ml-3" />
                  </a>
                  <ul
                    className="dropdown-menu border-0 shadow-sm"
                    aria-labelledby="filters"
                  >
                    <li>
                      <a className="dropdown-item small color-grey" href="#">
                        24 hours
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item small color-grey" href="#">
                        7 days
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item small color-grey" href="#">
                        14 days
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {walletInfo.wallet.transactions?.map(function (tr, i) {
                if (tr.type === "external") {
                  return (
                    <SentTransaction
                      amount={tr.amount}
                      address={tr.address}
                      message={tr.msg}
                      timestamp={tr.timestamp}
                      i={i}
                      state={{
                        from: location.pathname,
                        data: { walletInfo: walletInfo },
                      }}
                    />
                  );
                } else if (tr.type === "internal") {
                  return (
                    <ReceivedTransaction
                      amount={tr.amount}
                      address={tr.address}
                      message={tr.msg}
                      timestamp={tr.timestamp}
                      i={i}
                      state={{
                        from: location.pathname,
                        data: { walletInfo: walletInfo },
                      }}
                    />
                  );
                }
              })}

              <div className="pt-4 text-center">
                <a
                  onClick={async () => updateTransactions()}
                  style={{ cursor: "pointer" }}
                  className="btn btn-secondary"
                >
                  Load more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
