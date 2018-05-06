import callable from 'describe-type/source/is/callable.js';
import string from 'describe-type/source/is/string.js';
import apply from 'describe-type/source/@/apply.js';

const slice = Function.call.bind(Array.prototype.slice);
const setPrototypeOf = Object.setPrototypeOf;
const defineProps = Object.defineProperties;
const create = Object.create;
const keys = Object.keys;

export default (rules, middleware) => {
	function applyRules() {
		const pattern = this.rules.reduce((acc, rule) => {
			if (callable(rules[rule])) {
				const result = apply(rules[rule], this, [acc].concat(slice(this.args[rule])));
				if (string(result)) acc += result;
				else return result;
			} else {
				acc += rules[rule];
			}
			return acc;
		}, '');
		return middleware ? apply(middleware, this, [pattern, arguments], true) : pattern;
	}

	function build(rules, args) {
		function builder() { return apply(applyRules, builder, arguments); }
		builder.rules = rules;
		builder.args = args;
		setPrototypeOf(builder, proto);
		return builder;
	}

	const expressions = keys(rules).reduce((acc, rule) => {
		const isfn = callable(rules[rule]);
		acc[rule] = { [isfn ? 'value' : 'get']: function append() {
			if (isfn === false) return build(this.rules.concat(rule), this.args);
			this.args[rule] = arguments;
			return build(this.rules.concat(rule), this.args);
		}};
		return acc;
	}, create(null));

	const proto = defineProps(function match() {}, expressions);
	return defineProps({ rules }, keys(expressions).reduce((acc, rule) => {
		const isfn = callable(rules[rule]);
		acc[rule] = { [isfn ? 'value' : 'get']: function ground() {
			return build([rule], arguments);
		}};
		return acc;
	}, create(null)));
};
