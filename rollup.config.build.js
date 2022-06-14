import babel from "rollup-plugin-babel"; // babel代码转义
import commonjs from "@rollup/plugin-commonjs"; // commonjs转换
import modules from "@rollup/plugin-node-resolve"; // 解析node_modules中依赖的外部模块
import json from '@rollup/plugin-json'
import { terser } from "rollup-plugin-terser"; // js代码格式压缩 支持es6
import alias from "@rollup/plugin-alias"; // 别名
const path = require('path'); 
import pkg from './package.json'

export default {
  input: "./src/main.js", // 入口文件
  // output: { 
  //   file: "lib/bundle.umd.js",
  //   format:'umd',
  //   name: "WebTraceSdk"
  // },
  output: [
    {
      file:pkg.main,
      format:'cjs',
    },
    {
      file:pkg.module,
      format:'esm',
    },
    {
      file:pkg.browser,
      format:'umd',
      name:'WebTraceSdk'
    }
  ],
  plugins: [
    modules({
      preferBuiltins: true,
      jsnext: true,
      main: true,
      brower: true,
    }),
    commonjs(),
    json(),
    babel({
      exclude: "node_modules/**", // 排除node_modules目录
    }),
    terser(),
    alias({
      entries:[
        {find: '@', replacement: path.resolve(__dirname, 'src')}, // 别名设置
        {find: '@m', replacement: path.resolve(__dirname, 'src/module')},
        { find: "@u", replacement: path.resolve(__dirname, "src/utils") },
      ]
    }),
  ],
  external: [""], // 不打包的第三方库
};
