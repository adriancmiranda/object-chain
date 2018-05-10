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
  arrayFrom(args).reduce((acc, arg) => {
    acc[acc.length] = callable(arg) ? arg() : arg;
    return acc;
  }, initialValue)
);

const transform = (object, middleware) => {
  function chain() {
    const pattern = this.object.reduce((acc, item, index) => {
      if (callable(object[item.name])) {
        const args = processArgs(item.args, [acc]);
        const result = apply(object[item.name], this, args);
        if (string(result)) acc += result;
        else return result;
      } else {
        acc += object[item.name];
      }
      return acc;
    }, '');
    return middleware ? apply(middleware, this, [pattern, arguments], true) : pattern;
  }

  function connect(object) {
    function link() { return apply(chain, link, arguments); }
    link.object = object;
    setPrototypeOf(link, proto);
    return link;
  }

  const expressions = keys(object).reduce((acc, name) => {
    const isfn = callable(object[name]);
    acc[name] = { [isfn ? 'value' : 'get']: function append() {
      return connect(this.object.concat({ name, args: arguments }));
    }};
    return acc;
  }, create(null));

  const proto = defineProps(function match() {}, expressions);
  return defineProps({ object }, keys(expressions).reduce((acc, name) => {
    const isfn = callable(object[name]);
    acc[name] = { [isfn ? 'value' : 'get']: function append() {
      return connect([{ name, args: arguments }]);
    }};
    return acc;
  }, create(null)));
};

export default transform;
