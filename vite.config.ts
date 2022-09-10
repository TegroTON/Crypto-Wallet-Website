import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // {
        //     name: 'no-util-polyfill',
        //     resolveId(id) {
        //         // console.log(id) // never equals 'text-encoding' exactly
        //         if (id.indexOf('util') > -1) return id // but has it in the id
        //     },
        //     load(id) {
        //         if (id.indexOf('util') > -1) return `export default {}`
        //     }
        // }
    ],
    resolve: {
        alias: {
            // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
            // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
            // process and buffer are excluded because already managed
            // by node-globals-polyfill
            // util: 'rollup-plugin-polyfill-node/polyfills/util',
            // sys: 'util',
            util: 'web-encoding'
            // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder',
        }
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                }),
            ],
        },
    },
    build: {
        target: ['ESNext'],
        rollupOptions: {
            plugins: [
                nodePolyfills(),
                NodeModulesPolyfillPlugin(),
                nodeResolve({browser: true}),
            ]
        },
        emptyOutDir: false
    }
});
