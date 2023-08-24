import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupTypescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import { terser } from 'rollup-plugin-terser'
import dts from "rollup-plugin-dts";

// 读取 package.json 配置
import pkg from './package.json'
// 当前运行环境，可通过 cross-env 命令行设置
const env = process.env.NODE_ENV
// umd 模式的编译结果文件输出的全局变量名称
const name = 'RollupTsTemplate'
const config = { 
  input: "./dist/types/index.d.ts",
  output: [{ file: "dist/types/redis.d.ts", format: "es" }],
  plugins: [
    dts(),
  ]
}

// 若打包正式环境，压缩代码
if (env === 'production') {
  config.plugins.push(terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  }))
}
export default config
