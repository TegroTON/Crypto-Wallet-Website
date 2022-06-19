import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LocationParams, WalletInfo } from "../types";
import QRCode from "qrcode-svg";

export function ReceivePage() {
  const location = useLocation();
  const state = location.state as LocationParams;
  const walletInfo = state.data.walletInfo;

  const getQR = () => {
    return new QRCode({
      content: walletInfo.wallet.address || "TON FOUNDATION",
      container: "svg-viewbox",
      padding: 1,
      ecl: "H",
    }).svg();
  };

  return (
    <main className="page-main">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-4 text-center mx-auto">
            <div className="main-icon text-center">
              <i className="fi-icon icon-diamond" />
            </div>
            <h3 className="main-title text-center">Receive ton coins</h3>
            <form
              action=""
              className="mx-auto mt-5"
              style={{ maxWidth: "328px" }}
            >
              <div className="mb-5">
                <label>QRcode</label>
                <div
                  className="qrcode mt-3"
                  dangerouslySetInnerHTML={{ __html: getQR() }}
                />
              </div>
              <div className="mb-5">
                <label>Wallet address</label>
                <input
                  disabled
                  type="text"
                  placeholder="0"
                  className="text-center form-control mt-3"
                  value={walletInfo.wallet.address}
                />
              </div>
              <div className="btn-group d-flex flex-fill" role="group">
                <a
                  style={{ cursor: "pointer" }}
                  className="btn btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(walletInfo.wallet.address);
                  }}
                >
                  <i className="fi-icon icon-copy mr-2" />
                  Copy
                </a>
                <a href="#" className="btn btn-secondary btn-secondary-700">
                  Share
                  <i className="fi-icon icon-share ml-2" />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
