import { Link } from 'react-router-dom';

export function SettingsPage() {
    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto">
                        <div className="main-icon text-center"><i className="fa-duotone fa-gear" /></div>
                        <h2 className="main-title text-center">Settings</h2>
                        <form className="mt-5">
                            <ul>
                                <li className="d-flex align-items-center py-3">
                                    <div className="fi-icon-square mr-3">
                                        <i className="fa-light fa-globe fa-lg" />
                                    </div>
                                    <span className="font-16">Основной язык</span>
                                    <select
                                        className="custom-select border ml-auto"
                                        style={{ height: '34px', fontSize: '14px' }}
                                    >
                                        <option value="1" selected>English</option>
                                        <option value="2">Русский</option>
                                    </select>
                                </li>
                                <li className="d-flex align-items-center py-3">
                                    <div className="fi-icon-square mr-3">
                                        <i className="fa-light fa-money-bill fa-lg" />
                                    </div>
                                    <span className="font-16">Валюта</span>
                                    <select
                                        className="custom-select border ml-auto"
                                        style={{ height: '34px', fontSize: '14px' }}
                                    >
                                        <option value="1" selected>USD</option>
                                        <option value="2">RUB</option>
                                    </select>
                                </li>
                                <li className="py-3">
                                    <hr />
                                </li>
                                <li className="pb-3">
                                    <Link to="/privacy" className="d-flex align-items-center">
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-file-lines fa-lg" />
                                        </div>
                                        <span className="font-16">Политика конфидециальности</span>
                                    </Link>
                                </li>
                                <li className="py-3">
                                    <a href="#!" className="d-flex align-items-center">
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-paper-plane fa-lg" />
                                        </div>
                                        <span className="font-16">Написать в поддержку</span>
                                    </a>
                                </li>
                                <li className="py-3">
                                    <a
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (confirm('Are you really want to reset wallet?')) {
                                                localStorage.clear();
                                                window.location.reload();
                                            }
                                        }}
                                        className="d-flex align-items-center"
                                    >
                                        <div className="fi-icon-square mr-3">
                                            <i className="fa-light fa-circle-minus fa-lg" />
                                        </div>
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
