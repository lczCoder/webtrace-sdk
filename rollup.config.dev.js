import babel from "rollup-plugin-babel"; // babel代码转义
import commonjs from "@rollup/plugin-commonjs"; // commonjs转换
import modules from "@rollup/plugin-node-resolve"; // 解析node_modules中依赖的外部模块
import server from "rollup-plugin-serve"; // 本地服务
import liverload from "rollup-plugin-livereload"; // 热更新
import alias from "@rollup/plugin-alias"; // 别名
const path = require("path");

export default {
  input: "./src/main.js", // 入口文件
  // 五种输出格式：amd / es / iife / umd / cjs
  //当format为iife和umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.A=...
  output: [
    { file: "./dist/bundle.es.js", format: "es" },
    { file: "./dist/bundle.umd.js", format: "umd", name: "WebTraceSdk" },
  ],
  plugins: [
    modules(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除node_modules目录
    }),
    alias({
      entries: [
        { find: "@", replacement: path.resolve(__dirname, "src") },
        { find: "@m", replacement: path.resolve(__dirname, "src/module") },
        { find: "@u", replacement: path.resolve(__dirname, "src/utils") },
      ],
    }),
    server({
      open: true,
      port: 5000,
    }),
    liverload(),
  ],
  external: [""], // 不打包的第三方库
};
