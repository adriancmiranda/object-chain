import callable from 'describe-type/source/is/callable.js';
import string from 'describe-type/source/is/string.js';
import undef from 'describe-type/source/is/undef.js';
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
        const args = slice(this.args[rule]);
        const result = apply(rules[rule], this, [acc].concat(args));
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
      if (undef(this.args)) this.args = [];
      if (isfn) this.args[rule] = arguments;
      return build(this.rules.concat(rule), this.args);
    }};
    return acc;
  }, create(null));

  const proto = defineProps(function match() {}, expressions);
  return defineProps({ rules }, keys(expressions).reduce((acc, rule) => {
    const isfn = callable(rules[rule]);
    acc[rule] = { [isfn ? 'value' : 'get']: function ground() {
      if (undef(this.args)) this.args = [];
      if (isfn) this.args[rule] = arguments;
      return build([rule], this.args);
    }};
    return acc;
  }, create(null)));
};
