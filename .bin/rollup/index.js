const flow = require('rollup-plugin-flow');
const nodeResolve = require('rollup-plugin-node-resolve');
const es3 = require('rollup-plugin-es3');
const cjs = require('rollup-plugin-commonjs');
const optimizeJs = require('rollup-plugin-optimize-js');
const gzip = require('rollup-plugin-gzip');
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const alias = require('rollup-plugin-alias');
const replace = require('rollup-plugin-replace');
const { minify } = require('uglify-es');
const { env, aliases, flag, vars } = require('../config');
const targets = require('./targets');
const watch = require('./watch');

module.exports = file => ({
  watch,
  input: file.source,
  output: targets.parseOutput(file),
  plugins: [
    replace(vars),
    flow({ all: false, pretty: true }),
    nodeResolve({ jsnext: true, main: true, browser: !targets.hasFormat(file, 'cjs') }),
    cjs(),
    buble(),
    es3(['defineProperty', 'freeze']),
    alias(Object.assign({ resolve: ['.js', '.json'] }, aliases)),
  ].concat(file.plugins || []).concat(env.MINIFY ? [
    uglify({ output: { preamble: flag, ascii_only: true } }, minify),
    optimizeJs(),
  ].concat(env.GZIP ? [gzip()] : []) : []),
});
