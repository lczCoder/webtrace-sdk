import babel from "rollup-plugin-babel"; // babel代码转义
import commonjs from "@rollup/plugin-commonjs"; // commonjs转换
import modules from "@rollup/plugin-node-resolve"; // 解析node_modules中依赖的外部模块
import { terser } from "rollup-plugin-terser"; // js代码格式压缩 支持es6
import alias from "@rollup/plugin-alias"; // 别名
const path = require('path'); 

export default {
  input: "./src/main.js", // 入口文件
  output: { 
    file: "./dist/bundle.es.js",
    format:'es',
  },
  plugins: [
    modules(),
    commonjs(),
    babel({
      exclude: "node_modules/**", // 排除node_modules目录
    }),
    terser(),
    alias({
      entries:[
        {find: '@', replacement: path.resolve(__dirname, 'src')} // 别名设置
      ]
    }),
  ],
  external: [""], // 不打包的第三方库
};
