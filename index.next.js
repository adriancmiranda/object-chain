import callable from 'describe-type/source/is/callable.js';
import apply from 'describe-type/source/@/apply.js';

const { setPrototypeOf, defineProperties, create, keys } = Object;
const arrayFrom = Array.from;

const processArgs = (args, initialValue) => (
	arrayFrom(args).reduce((acc, arg) => {
		acc[acc.length] = callable(arg) ? arg() : arg;
		return acc;
	}, initialValue)
);

const transform = (object, middleware) => {
	function chain() {
		const pattern = this.object.reduce((acc, item) => {
			if (callable(object[item.name])) {
				const args = processArgs(item.args, [acc]);
				acc = apply(object[item.name], this, args);
			} else {
				acc += object[item.name];
			}
			return acc;
		}, '');
		return middleware ? apply(middleware, this, [pattern, arguments], true) : pattern;
	}

	function connect(data) {
		function link() { return apply(chain, link, arguments); }
		link.object = data;
		setPrototypeOf(link, proto);
		return link;
	}

	const descriptors = keys(object).reduce((acc, name) => {
		const isfn = callable(object[name]);
		acc[name] = {
			[isfn ? 'value' : 'get']: function connector() {
				return connect(this.object.concat({ name, args: arguments }));
			},
		};
		return acc;
	}, create(null));

	const proto = defineProperties(function ObjectChain() {}, descriptors);
	return defineProperties({ object }, keys(descriptors).reduce((acc, name) => {
		const isfn = callable(object[name]);
		acc[name] = {
			[isfn ? 'value' : 'get']: function startup() {
				return connect([{ name, args: arguments }]);
			},
		};
		return acc;
	}, create(null)));
};

export default transform;
