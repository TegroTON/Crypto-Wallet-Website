import CreateData = chrome.windows.CreateData;
import {getAddress, getBalance, getWalletType} from "../ton/utils";
import storage from "../utils/storage";

type Task = {
    id: number,
    resolve: (...args: any) => void | Promise<void>
    reject: (...args: any) => void | Promise<void>
}

class Controller {
    private _extensionWindowId: number;
    private _activeTask: Task | null;
    private _publicKey: string;
    private _address: string;
    private _walletVersion: string;

    constructor() {
        this._extensionWindowId = -1
        this._activeTask = null;
        this._publicKey = '';
        this._address = '';
        this._walletVersion = '';
    }

    public get extensionWindowId(): number {
        return this._extensionWindowId
    }

    public set extensionWindowId(x: number) {
        this._extensionWindowId = x;
    }

    public get activeTask(): Task | null {
        return this._activeTask
    }

    public set activeTask(x: Task | null) {
        if (x) {
            this._activeTask = {
                ...x,
                resolve: async (r: any) => {
                    x.resolve(r);
                    this.activeTask = null
                    await storage.removeItem('activeTask')
                    await this.closeExtensionWindow()
                },
                reject: async () => {
                    x.resolve(false);
                    this.activeTask = null
                    await storage.removeItem('activeTask')
                    await this.closeExtensionWindow()
                },
            }
        } else {
            this._activeTask = x;
        }
    }

    public get publicKey(): string {
        return this._publicKey
    }

    public set publicKey(x: string) {
        this._publicKey = x;
    }

    public get address(): string {
        return this._address
    }

    public set address(x: string) {
        this._address = x;
    }

    public get walletVersion(): string {
        return this._walletVersion
    }

    public set walletVersion(x: string) {
        this._walletVersion = x;
    }

    async initDapp() {
        this.publicKey = await storage.getItem('public_key');
        if (this.publicKey) {
            this.walletVersion = await getWalletType()
            this.address = await getAddress(this.walletVersion)
            this.sendToDapp('ton_accounts', [this.address])
        }
    }

    sendToDapp(method: string, params: any) {
        contentScriptPorts.forEach((port: any) => {
            port.postMessage(JSON.stringify({
                type: 'TONHoldAPI',
                message: {
                    jsonrpc: '2.0',
                    method: method,
                    params: params
                }
            }));
        });
    }

    showExtensionWindow() {
        return new Promise(async resolve => {
            await this.closeExtensionWindow()

            const windowState = {
                // top: 0,
                // left: 0,
                height: 800,
                width: 480
            };

            chrome.windows.create(Object.assign(windowState, {
                url: 'index.html',
                type: 'popup',
                focused: true
            }) as CreateData, window => {
                this.extensionWindowId = window?.id || -1;
                return resolve(this.extensionWindowId);
            });
        });
    };

    closeExtensionWindow() {
        return new Promise(async resolve => {
            if (this.extensionWindowId > -1) {
                try {
                    await chrome.windows.remove(this.extensionWindowId)
                } catch {
                    // pass
                }
            }
            return resolve(true);
        })
    }

    async createTask(id: number, method: string, params: any) {
        return new Promise(async (resolve, reject) => {
            await this._activeTask?.reject()

            this.activeTask = {
                id,
                resolve,
                reject
            }

            const windowId = await this.showExtensionWindow();
            await storage.setItem('activeTask', JSON.stringify({
                id,
                windowId: windowId as number,
                method,
                params
            }))

        })

    }

    async resolveTask(id: number, v?: any) {
        if (this._activeTask && (this._activeTask.id === id)) {
            this._activeTask.resolve(v);
        }
    }

    async rejectTask(id: number) {
        if (this._activeTask && (this._activeTask.id === id)) {
            this._activeTask.reject();
        }
    }

    async resolver(result: any[]) {
        const id = result[0]
        const resolve = result[1];
        const v = result[2];
        if (resolve) {
            await this.resolveTask(id, v)
        } else {
            await this.rejectTask(id)
        }
    }

    async onDappMessage(id: number, method: string, params: any[]) {
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md
        await this.initDapp();

        switch (method) {
        case 'ton_requestAccounts':
            if (!this.publicKey) return [];
            return ([await getAddress(await getWalletType())]);
        case 'ton_requestWallets':
            if (!this.publicKey) return [];
            return [{
                address: this.address,
                publicKey: this.publicKey,
                walletVersion: this.walletVersion
            }];
        case 'ton_getBalance':
            if (!this.publicKey) return 0;
            return (await getBalance(await getAddress(await getWalletType()))).toString()
        case 'ton_sendTransaction':
            if (!this.publicKey) return false;
            const trans = params[0];
            return this.createTask(id, method, trans);
        case 'ton_rawSign':
            if (!this.publicKey) return false;
            const signParam = params[0];
            return this.createTask(id, method, signParam.data);
        }
    }
}

const IS_EXTENSION = !!(self.chrome && chrome.runtime && chrome.runtime.onConnect);
const controller = new Controller();
const contentScriptPorts = new Set();

if (IS_EXTENSION) {
    chrome.runtime.onConnect.addListener(port => {
        if (port.name === 'TONHoldContentScript') {
            contentScriptPorts.add(port)
            port.onMessage.addListener(async (msg, port) => {
                if (msg.type === 'TONHoldAPI_ton_provider_connect') {
                    await controller.initDapp()
                } else if (msg.type === 'TONHoldAPI_ton_provider_write') {
                    if (!msg.message) return;

                    const result = await controller.onDappMessage(msg.message.id, msg.message.method, msg.message.params);
                    if (port) {
                        port.postMessage(JSON.stringify({
                            type: 'TONHoldAPI',
                            message: {
                                jsonrpc: '2.0',
                                id: msg.message.id,
                                method: msg.message.method,
                                result
                            }
                        }));
                    }
                }
            });
            port.onDisconnect.addListener(port => {
                contentScriptPorts.delete(port)
            })
        } else if (port.name === 'TONHoldPopup') {
            port.onMessage.addListener(async function (msg) {
                if (msg.type === "TONHoldAPI_ton_wallet_response") {
                    if (!msg.message) return;
                    await controller.resolver(msg.message.result)
                } else if (msg.type === "TONHoldAPI_ton_wallet_update") {
                    await controller.initDapp()
                }
            });
        }
    });

    chrome.windows.onRemoved.addListener(removedWindowId => {
        if (removedWindowId !== controller.extensionWindowId) return;
        controller.extensionWindowId = -1;
    });
}
