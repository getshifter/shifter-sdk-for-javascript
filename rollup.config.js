// import nodeResolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
export default {
  input: './libs/index.ts',
  output: [{
    file: './dist/index.js',
    format: 'cjs'
  }, {
    file: './umd/index.js',
    format: 'umd',
    name: 'Shifter'
  }],
  plugins: [
    // nodeResolve({jsnext: true}),
    // commonjs(),
    // json(),
    typescript({
      tsconfigOverride: {
        comppilerOptions: {
          module: 'es2015',
          moduleResolution: 'node'
        }
      }
    }),
  ]
}