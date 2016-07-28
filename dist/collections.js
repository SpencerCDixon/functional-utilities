'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toArray3 = require('lodash/toArray');

var _toArray4 = _interopRequireDefault(_toArray3);

exports.first = first;
exports.second = second;
exports.third = third;
exports.fourth = fourth;
exports.fifth = fifth;
exports.rest = rest;
exports.tail = tail;
exports.butLast = butLast;
exports.cat = cat;
exports.construct = construct;
exports.mapcat = mapcat;
exports.comparator = comparator;

var _predicates = require('./predicates');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray2(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

// Function that takes an array or string and returns an element at the
// requested index.
function nth(value, idx) {
  if (!(0, _predicates.isNumber)(idx)) (0, _util.fail)('Expecting index to be a number');
  if (!(0, _predicates.isIndexed)(value)) (0, _util.fail)('Expecting array or string');
  if (idx < 0 || idx > value.length - 1) {
    (0, _util.fail)('Index is out of bounds');
  }
  return value[idx];
}

// Utility functions for accessing variables in indexed data types
function first(val) {
  return nth(val, 0);
};
function second(val) {
  return nth(val, 1);
};
function third(val) {
  return nth(val, 2);
};
function fourth(val) {
  return nth(val, 3);
};
function fifth(val) {
  return nth(val, 4);
};

function rest(array) {
  var _array = _toArray2(array);

  var first = _array[0];

  var rest = _array.slice(1);

  return rest;
}
function tail(array) {
  return rest(array);
};

function butLast(coll) {
  return (0, _toArray4.default)(coll).slice(0, -1);
}

// Utility for creating new collections
function cat(head) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if ((0, _predicates.existy)(head)) return head.concat.apply(head, rest);else return [];
}
function construct(head) {
  for (var _len2 = arguments.length, tail = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    tail[_key2 - 1] = arguments[_key2];
  }

  return cat.apply(undefined, [[head]].concat(tail));
}

// application function that calls a function for every element of the
// collection and then concats the mapped results together.
function mapcat(fun, collection) {
  return cat.apply(null, collection.map(fun));
}

// Sorting collections
function comparator(pred) {
  return function (x, y) {
    if ((0, _predicates.truthy)(pred(x, y))) return -1;else if ((0, _predicates.truthy)(pred(y, x))) return 1;else return 0;
  };
}