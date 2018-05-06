import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import optimizeJs from 'rollup-plugin-optimize-js';
import pirateFlag from 'pirate-flag';
import moment from 'moment';
import { minify } from 'uglify-es';
import pack from './package.json';

moment.locale();

const flag = (options) => pirateFlag(pack, {
	moment: moment().format('LLLL'),
	homepage: pack.homepage,
	author: pack.author,
	license: `(c) 2017-${+moment().format('GGGG') + 3}\n`,
}, Object.assign({ comment: true }, options));

export default {
	input: 'index.next.js',
	output: {
		name: 'objectChain',
		file: 'index.js',
		banner: flag(),
		indent: true,
		sourcemap: true,
		format: ['umd'],
	},
	plugins: [
		babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
		nodeResolve({ jsnext: true, main: true, browser: true }), 
		commonjs(),
		uglify({ output: { preamble: flag(), ascii_only: true } }, minify),
		optimizeJs(),
	],
};
