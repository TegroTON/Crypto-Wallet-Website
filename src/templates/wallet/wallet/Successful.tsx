import { Link, useLocation } from "react-router-dom";
import { LocationParams } from "../types";

export function SuccessfulPage() {
  const location = useLocation();
  const state = location.state as LocationParams;
  const walletInfo = state.data.walletInfo;

  return (
    <main className="page-main">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-4 mx-auto text-center">
            <div className="main-icon">
              <i className="fi-icon icon-pocket" />
            </div>
            <h2 className="main-title">Successfully!</h2>
            <p className="main-desc">Transaction confirmed</p>
            <div className="main-buttons">
              <Link
                to="/wallet"
                className="btn btn-primary"
                state={{
                  from: location.pathname,
                  data: { walletInfo: walletInfo },
                }}
              >
                Got to Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
