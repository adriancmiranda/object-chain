import callable from 'describe-type/source/is/callable.js';
import string from 'describe-type/source/is/string.js';
import undef from 'describe-type/source/is/undef.js';
import apply from 'describe-type/source/@/apply.js';

const arrayFrom = Array.from;
const setPrototypeOf = Object.setPrototypeOf;
const defineProps = Object.defineProperties;
const create = Object.create;
const keys = Object.keys;

const processArgs = (args, initialValue) => (
  arrayFrom(args).reduce((acc, arg, i) => {
    acc[acc.length] = callable(arg) ? arg() : arg;
    return acc;
  }, initialValue)
);

const transform = (rules, middleware) => {
  function applyRules() {
    const pattern = this.rules.reduce((acc, rule, index) => {
      if (callable(rules[rule])) {
        const args = processArgs(this.args[`${rule}${index}`], [acc]);
        const result = apply(rules[rule], this, args);
        if (string(result)) acc += result;
        else return result;
      } else {
        acc += rules[rule];
      }
      return acc;
    }, '');
    return middleware ? apply(middleware, this, [pattern, arguments], true) : pattern;
  }

  function build(rules, args, index) {
    function builder() { return apply(applyRules, builder, arguments); }
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
    }};
    return acc;
  }, create(null));

  const proto = defineProps(function match() {}, expressions);
  return defineProps({ rules }, keys(expressions).reduce((acc, rule, index) => {
    const isfn = callable(rules[rule]);
    acc[rule] = { [isfn ? 'value' : 'get']: function append() {
      if (undef(this.args)) this.args = arguments;
      if (isfn) this.args[`${rule}${0}`] = arguments;
      return build([rule], this.args, 0);
    }};
    return acc;
  }, create(null)));
};

export default transform;
