#! /usr/bin/env node
const { join, resolve } = require('path');
const { argv } = require('../config');
const spawn = require('cross-spawn');

const args = argv.$.slice(3);
const scripts = argv._;
const context = typeof argv.dir === 'string' ? argv.dir : 'test/unit/**';
const pattern = scripts.length > 1 ? `{${scripts.join(',')}}` : scripts[0] || '*';
const files = resolve(`${join(context, pattern)}?(.unit).js`);

spawn.sync('node', ['node_modules/ava/cli.js', files].concat(args));
