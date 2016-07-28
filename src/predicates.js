import {
  every,
  has,
} from 'lodash';

export function isNumber(value) {
  return typeof value === 'number';
}

export function isString(value) {
  return typeof value === 'string';
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isIndexed(value) {
  return isArray(value) ||  isString(value);
}

export function isEven(val) { return val % 2 === 0 }
export function isOdd(val)  { return !isEven(val) }

export function hasKeys(...keys) {
  return obj => {
    return every(keys, key => has(obj, key));
  }
}
export function hasValidatedKeys(...keys) {
  const fun = () => hasKeys(keys)
  fun.message = `Must have values for: ${keys.join(', ')}`
  return fun;
}

// notice the intentional loose != operator.  Allows us to distinguish between
// null, undefined, and everything else.
export function existy(x) { return x != null }; 
export function truthy(x) { return (x !== false) && existy(x) };

// allows you to reverse a predicate
export function complement(pred) {
  return function(...args) {
    return !pred.apply(null, args);
  }
}
