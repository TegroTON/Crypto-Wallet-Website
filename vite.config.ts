import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
                NodeModulesPolyfillPlugin()
            ],
        },
    },
    build: {
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                nodePolyfills()
            ]
        }
    }
});
