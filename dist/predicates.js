'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _every2 = require('lodash/every');

var _every3 = _interopRequireDefault(_every2);

exports.isNumber = isNumber;
exports.isString = isString;
exports.isArray = isArray;
exports.isIndexed = isIndexed;
exports.isEven = isEven;
exports.isOdd = isOdd;
exports.hasKeys = hasKeys;
exports.hasValidatedKeys = hasValidatedKeys;
exports.existy = existy;
exports.truthy = truthy;
exports.complement = complement;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Commonly used predicates module
 * @module src/predicates
 */

/**
 * Predicate to determine if value is a number
 * @param {*} value - value to be tested
 * @returns {Boolean} - whether or not value is a number
*/
function isNumber(value) {
  return typeof value === 'number';
}

/** Predicate to determine if value is a string */
function isString(value) {
  return typeof value === 'string';
}

/** Predicate to determine if value is an array */
function isArray(value) {
  return Array.isArray(value);
}

/** Predicate to determine if value is an array or string (i.e. indexable) */
function isIndexed(value) {
  return isArray(value) || isString(value);
}

/** Predicate to determine if value is even */
function isEven(val) {
  return val % 2 === 0;
}

/** Predicate to determine if value is odd */
function isOdd(val) {
  return !isEven(val);
}

function hasKeys() {
  for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  return function (obj) {
    return (0, _every3.default)(keys, function (key) {
      return (0, _has3.default)(obj, key);
    });
  };
}
function hasValidatedKeys() {
  for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    keys[_key2] = arguments[_key2];
  }

  var fun = function fun() {
    return hasKeys(keys);
  };
  fun.message = 'Must have values for: ' + keys.join(', ');
  return fun;
}

// notice the intentional loose != operator.  Allows us to distinguish between
// null, undefined, and everything else.
function existy(x) {
  return x != null;
};
function truthy(x) {
  return x !== false && existy(x);
};

// allows you to reverse a predicate
function complement(pred) {
  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return !pred.apply(null, args);
  };
}