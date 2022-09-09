import { useLocation, useNavigate } from 'react-router-dom';
import storage from './utils/storage';
import { ExtensionMethod, TaskStorage } from './types';
import { getWindowId } from './utils';

const availableUri: { [index: ExtensionMethod]: string[] } = {
    ton_rawSign: ['/', '/signature', '/protect', '/signing'],
    ton_sendTransaction: ['/', '/confirm-transaction', '/protect', '/sending'],
};

export function ExtensionProcess({ children }: any) {
    const location = useLocation();
    const navigate = useNavigate();

    const getTask = async () => {
        const task = await storage.getItem('activeTask');
        return task ? JSON.parse(task) : null;
    };

    const processTask = async (t: TaskStorage) => {
        const port = chrome.runtime.connect({ name: 'TONHoldPopup' });
        const URIs = availableUri[t.method];
        if (t.result) {
            port.postMessage({
                type: 'TONHoldAPI_ton_wallet_response',
                message: {
                    jsonrpc: '2.0',
                    result: [t.id, true, t.result],
                },
            });
        } else if (!(URIs.includes(location.pathname))) {
            port.postMessage({
                type: 'TONHoldAPI_ton_wallet_response',
                message: {
                    jsonrpc: '2.0',
                    result: [t.id, false, 'Handle Cancel'],
                },
            });
        } else if (location.pathname === '/') {
            if (t.method === 'ton_rawSign') {
                navigate('/signature', {
                    state: {
                        from: location.pathname,
                        data: {
                            taskInfo: t,
                        },
                    },
                });
            } else if (t.method === 'ton_sendTransaction') {
                navigate('/confirm-transaction', {
                    state: {
                        from: location.pathname,
                        data: {
                            taskInfo: t,
                        },
                    },
                });
            }
        }
    };

    const pushUpdate = () => {
        const port = chrome.runtime.connect({ name: 'TONHoldPopup' });
        port.postMessage({
            type: 'TONHoldAPI_ton_wallet_update',
            message: {
                jsonrpc: '2.0',
            },
        });
    };

    const main = async () => {
        const task = await getTask();
        const IS_EXTENSION = !!(self.chrome && chrome.runtime && chrome.runtime.onConnect);
        const windowId = await getWindowId();
        if (task && IS_EXTENSION && windowId) await processTask(task);
        if (IS_EXTENSION) {
            chrome.storage.onChanged.addListener(
                async (changes, areaName) => {
                    if (areaName === 'local') await pushUpdate();
                },
            );
        }
    };

    main()
        .then();

    return children;
}
