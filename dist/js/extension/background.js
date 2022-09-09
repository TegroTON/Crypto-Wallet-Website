// // @ts-ignore
// if (typeof importScripts !== 'function') {
//     const injectScript = (path: string) => {
//         return new Promise(resolve => {
//             const scriptTag = document.createElement('script');
//             scriptTag.setAttribute('src', path);
//             scriptTag.addEventListener('load', resolve);
//             document.body.appendChild(scriptTag);
//         });
//     };
//
//     // @ts-ignore
//     window.importScripts = async (...scripts: any) => {
//         for (const path of scripts) {
//             await injectScript(path);
//         }
//     };
// }
// @ts-ignore
importScripts('/js/extension/controller.umd.js');
