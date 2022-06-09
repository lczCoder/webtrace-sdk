import babel from "rollup-plugin-babel"; // babel代码转义
import commonjs from "@rollup/plugin-commonjs"; // commonjs转换
import resolve from "@rollup/plugin-node-resolve"; // 解析node_modules中依赖的外部模块
import {terser} from 'rollup-plugin-terser'; // js代码格式压缩 支持es6

export default {
  input: "./src/main.js", // 入口文件
  output: [
    // 五种输出格式：amd / es6 / iife / umd / cjs
    //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
    { file: "./dist/bundle.cjs.js", format: "cjs" },
    { file: "./dist/bundle.es.js", format: "es", sourcemap: true },
    { file: "./dist/bundle.umd.js", format: "umd", name: "bundle" },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除node_modules目录
    }),
    terser()
  ],
  external: ['lodash'], // 不打包的第三方库
};
