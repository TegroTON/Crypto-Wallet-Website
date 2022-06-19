import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationParams, Send, WalletInfo } from "../types";
import { useForm } from "react-hook-form";
import { checkPassValid, sendTransaction } from "../../../ton/utils";

export function PaymentProtectionPage() {
  const location = useLocation();
  const state = location.state as LocationParams;
  const walletInfo = state.data.walletInfo;
  const send = state.data.send;
  const navigator = useNavigate();

  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data: any) => {
    navigator("/sending", {
      state: {
        from: location.pathname,
        data: {
          walletInfo: walletInfo,
          send: send,
          pass: data.password,
        },
      },
    });
  };

  return (
    <main className="page-main">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-4 mx-auto text-center">
            <div className="main-icon">
              <i className="fi-icon icon-unlock" />
            </div>
            <h2 className="main-title">Enter password</h2>
            <p className="main-desc mb-4">To make a transaction</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="main-form mx-auto"
              style={{ maxWidth: "350px" }}
            >
              <div className="input-group mb-3" style={{ height: "60px" }}>
                <div className="input-group-text">
                  <i className="fi-icon icon-unlock font-24" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  style={{ height: "60px" }}
                  {...register("password", {
                    required: true,
                    validate: (value) => checkPassValid(value),
                  })}
                />
              </div>
              <div className="main-buttons">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!isValid}
                >
                  Send Ton coins
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
