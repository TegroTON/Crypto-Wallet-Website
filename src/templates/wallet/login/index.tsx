import { Link } from 'react-router-dom';
import { clearStorage } from '../../../ton/utils';

export function LoginPage() {
    clearStorage();

    return (
        <main className="page-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-lg-4 mx-auto text-center">
                        <div className="main-icon"><i className="fa-duotone fa-gem" /></div>
                        <h2 className="main-title main-title__bold">TON Wallet</h2>
                        <p className="main-desc">
                            TON wallet allows you to make fast and secure blockchain-based payments without
                            intermediaries.
                        </p>
                        <div className="main-buttons">
                            <Link to="/connect-wallet" className="btn btn-primary">Connect wallet</Link>
                            <Link to="/create-wallet" className="btn btn-secondary">Create new</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
