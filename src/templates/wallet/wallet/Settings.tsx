import { Link } from "react-router-dom";

export function SettingsPage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-4 mx-auto">
            <div className="main-icon text-center">
              <i className="fi-icon icon-settings" />
            </div>
            <h2 className="main-title text-center">Settings</h2>
            <form className="mt-5">
              <ul>
                <li className="d-flex align-items-center py-3">
                  <i className="fi-icon fi-icon-square icon-moon font-18 mr-3" />
                  <span className="font-16">Dark Mode</span>
                  <div className="custom-control custom-switch ml-auto">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customSwitch1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customSwitch1"
                    />
                  </div>
                </li>
                <li className="d-flex align-items-center py-3">
                  <i className="fi-icon fi-icon-square icon-translate font-18 mr-3" />
                  <span className="font-16">Основной язык</span>
                  <select
                    className="custom-select border ml-auto"
                    style={{ height: "34px", fontSize: "14px" }}
                  >
                    <option value="1" selected>
                      English
                    </option>
                    <option value="2">Русский</option>
                  </select>
                </li>
                <li className="d-flex align-items-center py-3">
                  <i className="fi-icon fi-icon-square icon-money font-18 mr-3" />
                  <span className="font-16">Валюта</span>
                  <select
                    className="custom-select border ml-auto"
                    style={{ height: "34px", fontSize: "14px" }}
                  >
                    <option value="1" selected>
                      USD
                    </option>
                    <option value="2">RUB</option>
                  </select>
                </li>
                <li className="py-3">
                  <hr />
                </li>
                <li className="pb-3">
                  <Link to="/privacy" className="d-flex align-items-center">
                    <i className="fi-icon fi-icon-square icon-file-text font-18 mr-3" />
                    <span className="font-16">Политика конфидециальности</span>
                  </Link>
                </li>
                <li className="py-3">
                  <a href="#!" className="d-flex align-items-center">
                    <i className="fi-icon fi-icon-square icon-telegram font-18 mr-3" />
                    <span className="font-16">Написать в поддержку</span>
                  </a>
                </li>
                <li className="py-3">
                  <a href="#!" className="d-flex align-items-center">
                    <i className="fi-icon fi-icon-square icon-minus-circle font-18 mr-3" />
                    <span className="font-16">Сбросить кошелёк</span>
                  </a>
                </li>
              </ul>
              <div className="main-buttons">
                <button className="btn btn-primary" type="submit">
                  Save settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
