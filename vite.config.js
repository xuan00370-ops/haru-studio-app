import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify('3.1.1-Premium'),
        __APP_BUILD_TIME__: JSON.stringify(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                portal: resolve(__dirname, 'portal.html')
            }
        }
    }
});
