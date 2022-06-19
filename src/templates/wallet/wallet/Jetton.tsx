import { Link, useLocation } from "react-router-dom";
import { JettonInfo, LocationParams } from "../types";
import { ReceivedTransaction, SentTransaction } from "./Transaction";
import { JettonOperation } from "../../../ton/jettons/enums/JettonOperation";
import { useState } from "react";

export function JettonPage() {
  const location = useLocation();
  const state = location.state as LocationParams;
  const walletInfo = state.data.walletInfo;
  const [jettonInfo, setJettonInfo] = useState<JettonInfo>(
    state.data.jettonInfo as JettonInfo
  );
  console.log("jetton wallet", jettonInfo?.wallet.address.toFriendly());

  const updateTransactions = async () => {
    const limit = (jettonInfo.transactions?.length ?? 5) + 5;
    const transactions = await jettonInfo.wallet.getTransactions(limit);
    setJettonInfo({ ...jettonInfo, transactions: transactions });
  };

  return (
    <main className="page-main d-block pt-0">
      <div className="wallet-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-5 text-center mx-auto">
              <i className="fi-icon icon-diamond main-icon color-blue" />
              <h3 className="wallet-title mb-0 mt-5">{`${jettonInfo?.balance} ${jettonInfo?.jetton.meta.symbol}`}</h3>
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
                  to="/send-ton"
                  className="btn btn-secondary w-50"
                  state={{
                    from: location.pathname,
                    data: { walletInfo: walletInfo, jettonInfo: jettonInfo },
                  }}
                >
                  Send
                  <i className="fi-icon icon-u_arrow-up-right font-18 btn-icon ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-5 mx-auto">
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

              {jettonInfo?.transactions?.map(function (tr, i) {
                if (tr.operation === JettonOperation.TRANSFER) {
                  return (
                    <SentTransaction
                      amount={parseInt(tr.amount)}
                      address={tr.destination}
                      message={tr.comment}
                      timestamp={tr.time}
                      i={i}
                      state={{
                        from: state.from,
                        data: { walletInfo: walletInfo },
                      }}
                    />
                  );
                } else if (tr.operation === JettonOperation.INTERNAL_TRANSFER) {
                  return (
                    <ReceivedTransaction
                      amount={parseInt(tr.amount)}
                      address={tr.from}
                      message={tr.comment}
                      timestamp={tr.time}
                      i={i}
                      state={{
                        from: state.from,
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
