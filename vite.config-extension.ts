import {resolve} from 'path'
import {defineConfig} from 'vite';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    resolve: {
        alias: {
            util: 'web-encoding'
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
        lib: {
            entry: resolve(__dirname, 'src/extension/controller.ts'),
            name: 'Controller',
            fileName: 'js/extension/controller'
        },
        target: ['es2020'],
        rollupOptions: {
            plugins: [
                nodePolyfills(),
                NodeModulesPolyfillPlugin(),
                nodeResolve({browser: true}),
            ]
        },
        outDir: 'dist',
        emptyOutDir: false
    }
});
