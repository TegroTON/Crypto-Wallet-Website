import { Navigate } from 'react-router-dom';

export function UnloginOnly({ children }: any) {
    const auth = localStorage.getItem('public_key') != null;
    if (auth) return <Navigate to="/wallet" />;
    return children;
}

export function LoginOnly({ children }: any) {
    const auth = localStorage.getItem('public_key') != null;

    if (!auth) {
        return <Navigate to="/wallet" />;
    }
    return children;
}
