import { Navigate } from 'react-router-dom';

export function UnloginOnly({ children }: any) {
    const pubKey = localStorage.getItem('public_key');
    const mnemonic = localStorage.getItem('mnemonic');
    if (pubKey && mnemonic) return <Navigate to="/wallet" />;
    return children;
}

export function LoginOnly({ children }: any) {
    const pubKey = localStorage.getItem('public_key');
    const mnemonic = localStorage.getItem('mnemonic');
    if (!(pubKey && mnemonic)) return <Navigate to="/" />;
    return children;
}
