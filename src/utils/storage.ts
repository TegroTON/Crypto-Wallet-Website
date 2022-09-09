/**
 *  `localStorage` polyfill for Chrome Extension environment
 */

export default chrome.storage ? {
    setItem(key: string, value: any) {
        return chrome.storage.local.set({[key]: value});
    },

    getItem(key: string) {
        return chrome.storage.local.get(key)
            .then(({[key]: value}) => value);
    },

    removeItem(key: string) {
        return chrome.storage.local.remove(key);
    },

    clear() {
        return chrome.storage.local.clear();
    },
} : self.localStorage;
