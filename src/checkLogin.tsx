import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from './utils/storage';
import { getWindowId } from './utils';

export function CheckLogin() {
    const navigate = useNavigate();

    const init = async () => {
        const pubKey = await storage.getItem('public_key');
        const mnemonic = await storage.getItem('mnemonic');
        const windowId = await getWindowId();

        if (windowId) { // тут было сравнение winId. Его можно делать, если весь кошелёк будет в окне.
            return;
        }

        if (pubKey && mnemonic) {
            navigate('/wallet');
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        init()
            .then();
    }, []);

    return (
        <>
        </>
    );
}
