export function is (val, type) {
  return toString.call(val) === `[object ${type}]`;
}

export function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isBoolean (val) {
  return is(val, 'Boolean');
}
