const create = Object.create;
const keys = Object.keys;

exports.param = key => {
  const multi = /,/;
  if ((typeof key === 'string' || key instanceof String) && multi.test(key)) {
    key = key.split(multi);
  }
  if (/^false$/i.test(key)) {
    return false;
  }
  if (/^true$/i.test(key)) {
    return true;
  }
  if (/^([0-9]+|NaN|Infinity)$/.test(key)) {
    return Number(key);
  }
  return key;
};

exports.params = env => {
  const params = create(null);
  keys(env || '').forEach(key => {
    params[key] = exports.param(env[key]);
  });
  return params;
};
