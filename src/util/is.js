export function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

export function isArray (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
