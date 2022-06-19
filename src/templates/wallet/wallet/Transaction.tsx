import { fromNano } from "ton";
import BN from "bn.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationParams } from "../types";

export function ReceivedTransaction(props: {
  amount: number | BN;
  address: string | null;
  message: string;
  timestamp: number;
  i: number;
  state: LocationParams;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="wh-item collapsed"
      data-bs-toggle="collapse"
      data-bs-target={`#flush-collapse-${props.i}`}
      aria-expanded="false"
      aria-controls={`flush-collapse-${props.i}`}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-iteml-center">
        <div className="wh-item__icon color-blue bg-soft-blue mr-3">
          <i className="fi-icon icon-arrow-down-left" />
        </div>
        <div className="wh-item__transaction">
          <h3 className="wh-item__title">Received:</h3>
          <p className="wh-item__number">{props.address}</p>
        </div>
        <div className="wh-item__ton color-green ml-auto">
          +{fromNano(props.amount)}
        </div>
      </div>

      <div
        id={`flush-collapse-${props.i}`}
        className="accordion-collapse collapse"
        aria-labelledby="flush-heading-1"
        data-bs-parent="#accordionTon"
      >
        <ul className="wh-item__body mt-2">
          <li className="py-2 border-bottom">
            <h4 className="small mb-0">Date</h4>
            <span className="small color-grey">
              {new Date(props.timestamp * 1000).toLocaleString()}
            </span>
          </li>
          <li className="py-2 border-bottom">
            <h4 className="small mb-0">Sender</h4>
            <span className="small color-grey">{props.address}</span>
          </li>
          {props.message ? (
            <li className="py-2">
              <h4 className="small mb-0">Message</h4>
              <span className="small color-grey">{props.message}</span>
            </li>
          ) : (
            ""
          )}
          <li className="text-center mt-3">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/send-ton?address=${props.address}`, {
                  state: props.state,
                  replace: true,
                });
              }}
              className="btn btn-sm btn-primary"
            >
              Send to this address
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function SentTransaction(props: {
  amount: number | BN;
  address: string | null;
  message: string;
  timestamp: number;
  i: number;
  state: LocationParams;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="wh-item collapsed"
      data-bs-toggle="collapse"
      data-bs-target={`#flush-collapse-${props.i}`}
      aria-expanded="false"
      aria-controls={`flush-collapse-${props.i}`}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex align-iteml-center">
        <div className="wh-item__icon color-red bg-soft-red">
          <i className="fi-icon icon-u_arrow-up-right" />
        </div>
        <div className="wh-item__transaction">
          <h3 className="wh-item__title">Sent:</h3>
          <p className="wh-item__number">{props.address}</p>
        </div>
        <div className="wh-item__ton color-red ml-auto">
          -{fromNano(props.amount)}
        </div>
      </div>

      <div
        id={`flush-collapse-${props.i}`}
        className="accordion-collapse collapse"
        aria-labelledby="flush-heading-2"
        data-bs-parent="#accordionTon"
      >
        <ul className="wh-item__body mt-2">
          <li className="py-3 border-bottom">
            <h4 className="small mb-0">Date</h4>
            <span className="small color-grey">
              {new Date(props.timestamp * 1000).toLocaleString()}
            </span>
          </li>
          <li className="py-3 border-bottom">
            <h4 className="small mb-0">Recipient</h4>
            <span className="small color-grey">{props.address}</span>
          </li>
          {props.message ? (
            <li className="py-2">
              <h4 className="small mb-0">Message</h4>
              <span className="small color-grey">{props.message}</span>
            </li>
          ) : (
            ""
          )}
          <li className="text-center mt-3">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/send-ton?address=${props.address}`, {
                  state: props.state,
                  replace: true,
                });
              }}
              className="btn btn-sm btn-primary"
            >
              Send to this address
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
