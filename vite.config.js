import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        plugins: [
            vue(),
            /*legacyPlugin({
                targets: ["last 200 versions"],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
                renderLegacyChunks: true,
                polyfills: [
                    'es.symbol',
                    'es.promise',
                    'es.promise.finally',
                    'es/map',
                    'es/set',
                    'es.array.filter',
                    'es.array.for-each',
                    'es.array.flat-map',
                    'es.object.define-properties',
                    'es.object.define-property',
                    'es.object.get-own-property-descriptor',
                    'es.object.get-own-property-descriptors',
                    'es.object.keys',
                    'es.object.to-string',
                    'web.dom-collections.for-each',
                    'esnext.global-this',
                    'esnext.string.match-all'
                ]
            })*/
        ],
    },
    build: {
        target: [
            'es2015',
            'chrome58',
            'safari12',
            'ios12'
        ],
        cssTarget: [
            'es2015',
            'chrome58',
            'safari12',
            'ios12'
        ],
    }
})
