import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LocationParams } from '../../types';
import { signData } from '../../ton/utils';
import storage from '../../utils/storage';

export function SigningPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationParams;
    const { data: { taskInfo } } = state;
    const pass = state.data.pass || '';

    const main = async () => {
        const sign = await signData(taskInfo.params, pass);
        await storage.setItem('activeTask', JSON.stringify({
            ...taskInfo,
            result: sign,
        }));
        navigate('/wallet');
    };
    useEffect(() => {
        main()
            .then();
    }, []);

    return (
        <main className="page-main">
            <div className="container">
                Wait
            </div>
        </main>
    );
}
