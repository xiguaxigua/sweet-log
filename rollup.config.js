import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import autoprefixer from 'autoprefixer';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    postcss({ plugins: [autoprefixer({})] }),
    uglify(),
  ],
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'SweetLog',
  },
};
