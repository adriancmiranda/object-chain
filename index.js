/*!
 *    /     '      /  /
 *   /__      ___ (  /
 *   \--`-'-|`---\ |
 *    |' _/   ` __/ /
 *    '._  W    ,--'
 *       |_:_._/
 *
 * ~~ object-chain v1.0.3
 *
 * @moment Tuesday, May 8, 2018 6:50 PM
 * @homepage https://github.com/adriancmiranda/object-chain#readme
 * @author Adrian C. Miranda
 * @license (c) 2017-2021
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.objectChain = factory());
}(this, (function () { 'use strict';

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function callable(value) {
		return typeof value === 'function';
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function string(value) {
		return typeof value === 'string' || value instanceof String;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any}
	 * @returns {Boolean}
	 */
	function undef(value) {
		return value === undefined;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function array(value) {
		if (value == null) return false;
		return value.constructor === Array;
	}

	/**
	 *
	 * @function
	 * @memberof is
	 * @param {any} value
	 * @returns {Boolean}
	 */
	function arraylike(value) {
		return array(value) || string(value) || (
			(!!value && typeof value === 'object' && typeof value.length === 'number') &&
			(value.length === 0 || (value.length > 0 && (value.length - 1) in value))
		);
	}

	/**
	 *
	 * @param {Function} cmd - .
	 * @param {any} context - .
	 * @returns {any}
	 */
	function apply(cmd, context, args, blindly) {
		try {
			const $ = arraylike(args) ? args : [];
			switch ($.length) {
				case 0: return cmd.call(context);
				case 1: return cmd.call(context, $[0]);
				case 2: return cmd.call(context, $[0], $[1]);
				case 3: return cmd.call(context, $[0], $[1], $[2]);
				case 4: return cmd.call(context, $[0], $[1], $[2], $[3]);
				case 5: return cmd.call(context, $[0], $[1], $[2], $[3], $[4]);
				case 6: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5]);
				case 7: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6]);
				case 8: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7]);
				case 9: return cmd.call(context, $[0], $[1], $[2], $[3], $[4], $[5], $[6], $[7], $[8]);
				default: return cmd.apply(context, $);
			}
		} catch (err) {
			if (blindly) return err;
			throw err;
		}
	}

	const arrayFrom = Array.from;
	const setPrototypeOf = Object.setPrototypeOf;
	const defineProps = Object.defineProperties;
	const create = Object.create;
	const keys = Object.keys;

	function processArgs(args, initialValue) {
		return arrayFrom(args).reduce((acc, arg, i) => {
			acc[acc.length] = callable(arg) ? arg() : arg;
			return acc;
		}, initialValue);
	}

	var transform = ((rules, middleware) => {
		function applyRules() {
			const pattern = this.rules.reduce((acc, rule, index) => {
				if (callable(rules[rule])) {
					const args = processArgs(this.args[`${rule}${index}`], [acc]);
					const result = apply(rules[rule], this, args);
					if (string(result)) acc += result;else return result;
				} else {
					acc += rules[rule];
				}
				return acc;
			}, '');
			return middleware ? apply(middleware, this, [pattern, arguments], true) : pattern;
		}

		function build(rules, args, index) {
			function builder() {
				return apply(applyRules, builder, arguments);
			}
			builder.rules = rules;
			builder.args = args;
			builder.index = index;
			setPrototypeOf(builder, proto);
			return builder;
		}

		const expressions = keys(rules).reduce((acc, rule, index) => {
			const isfn = callable(rules[rule]);
			acc[rule] = { [isfn ? 'value' : 'get']: function append() {
					this.index += 1;
					if (isfn) this.args[`${rule}${this.index}`] = arguments;
					return build(this.rules.concat(rule), this.args, this.index);
				} };
			return acc;
		}, create(null));

		const proto = defineProps(function match() {}, expressions);
		return defineProps({ rules }, keys(expressions).reduce((acc, rule, index) => {
			const isfn = callable(rules[rule]);
			acc[rule] = { [isfn ? 'value' : 'get']: function append() {
					if (undef(this.args)) this.args = arguments;
					if (isfn) this.args[`${rule}${0}`] = arguments;
					return build([rule], this.args, 0);
				} };
			return acc;
		}, create(null)));
	});

	return transform;

})));
