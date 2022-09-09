// inject provider to page
const container = document.head || document.documentElement;
const scriptTag = document.createElement('script');
scriptTag.async = false;
scriptTag.src = chrome.runtime.getURL('/js/extension/provider.js');
container.insertBefore(scriptTag, container.children[0]);
container.removeChild(scriptTag);
//

const PORT_NAME = 'TONHoldContentScript';
let port = chrome.runtime.connect({name: PORT_NAME});

const sendMessageToActivePort = (payload: any, isRepeat = false) => {
    try {
        port.postMessage(payload);
    } catch (err: any) {
        const isInvalidated = err.message.toString()
            .includes('Extension context invalidated');
        if (isInvalidated) {
            self.removeEventListener('message', onPageMessage);
            return;
        }

        const isDisconnected = err.message.toString()
            .includes('disconnected port');

        if (!isRepeat && isDisconnected) {
            port = chrome.runtime.connect({name: PORT_NAME});
            port.onMessage.addListener(onPortMessage);
            sendMessageToActivePort(payload, true);
        } else {
            onPortMessage(JSON.stringify({
                type: 'TONHoldAPI',
                message: {
                    id: payload?.message?.id,
                    method: payload?.message?.method,
                    error: {message: err.message},
                    jsonrpc: true,
                },
            }));
        }
    }
};

const onPortMessage = (data: any) => {
    self.postMessage(data, '*'); // todo: origin
};

const onPageMessage = (e: { data: { type: string; }; }) => {
    if (!e.data) return;
    if (e.data.type !== 'TONHoldAPI_ton_provider_write'
        && e.data.type !== 'TONHoldAPI_ton_provider_connect'
    ) {
        return;
    }

    sendMessageToActivePort(e.data);
};

port.onMessage.addListener(onPortMessage);

self.addEventListener('message', onPageMessage);
