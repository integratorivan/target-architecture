import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr({
            include: '**/*.svg',
            svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
        }),
    ],
    resolve: {
        alias: {
            $__mocks__: resolve(__dirname, './src/__mocks__'),
            $__tests__: resolve(__dirname, './src/__tests__'),
            $app: resolve(__dirname, './src/app'),
            $assets: resolve(__dirname, './src/assets'),
            $domain: resolve(__dirname, './src/domain'),
            $entities: resolve(__dirname, './src/entities'),
            $features: resolve(__dirname, './src/features'),
            $model: resolve(__dirname, './src/model'),
            $pages: resolve(__dirname, './src/pages'),
            $public: resolve(__dirname, './public'),
            $shared: resolve(__dirname, './src/shared'),
            $widgets: resolve(__dirname, './src/widgets'),
        },
    },
    server: {
        host: true,
        port: 3002,
        proxy: {
            '/api': {
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                target: 'https://bot.tapgame.tech',
                ws: true,
            },
        },
    },
});
