import {
  every,
  has,
} from 'lodash';

/**
 * Predicate to determine if value is a number
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is a number
*/
export function isNumber(value) {
  return typeof value === 'number';
}

/** 
 * Predicate to determine if value is a string 
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is a string
*/
export function isString(value) {
  return typeof value === 'string';
}

/** 
 * Predicate to determine if value is an array
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is an array
*/
export function isArray(value) {
  return Array.isArray(value);
}

/** 
 * Predicate to determine if value is an array or string (i.e. indexable)
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is indexable
*/
export function isIndexed(value) {
  return isArray(value) ||  isString(value);
}

/** 
 * Predicate to determine if value is even.
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is even
*/
export function isEven(val) { return val % 2 === 0 }

/** 
 * Predicate to determine if value is odd.
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is odd
*/
export function isOdd(val)  { return !isEven(val) }

/** 
 * HOF that returns a predicate asserting all keys exist on an object
 * @param {*} value - value to be tested
 * @returns {Function} - function that takes an object and returns boolean for 
*/
export function hasKeys(...keys) {
  return obj => {
    return every(keys, key => has(obj, key));
  }
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
