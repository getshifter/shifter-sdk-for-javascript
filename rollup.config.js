import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
export default {
  input: './libs/index.ts',
  output: [{
    file: './dist/index.js',
    format: 'cjs'
  }, {
    file: './dist/index.umd.js',
    format: 'umd',
    name: 'Shifter'
  }],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfigOverride: {
        comppilerOptions: {
          module: 'es2015',
          moduleResolution: 'node'
        }
      }
    })
  ]
}