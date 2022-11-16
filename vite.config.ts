import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 设置项目根目录
  root: resolve(__dirname, './client'),
  build: {
    // 修改构建目录
    outDir: '../dist'
  }
})
