import { isNumber, isIndexed, truthy, existy } from './predicates';
import { fail } from './util';
import { toArray } from 'lodash';

// Function that takes an array or string and returns an element at the
// requested index.
function nth(value, idx) {
  if (!isNumber(idx)) fail('Expecting index to be a number');
  if (!isIndexed(value)) fail('Expecting array or string');
  if ((idx < 0) || (idx > value.length - 1)) {
    fail('Index is out of bounds');
  }
  return value[idx];
}

// Utility functions for accessing variables in indexed data types
export function first(val)  { return nth(val, 0) };
export function second(val) { return nth(val, 1) };
export function third(val)  { return nth(val, 2) };
export function fourth(val) { return nth(val, 3) };
export function fifth(val)  { return nth(val, 4) };

export function rest(array) {
  const [first, ...rest] = array;
  return rest;
}
export function tail(array) { return rest(array) };

export function butLast(coll) {
  return toArray(coll).slice(0, -1);
}

// Utility for creating new collections
export function cat(head, ...rest) {
  if (existy(head))
    return head.concat.apply(head, rest);
  else
    return [];
}
export function construct(head, ...tail) {
  return cat([head], ...tail);
}

// application function that calls a function for every element of the
// collection and then concats the mapped results together.
export function mapcat(fun, collection) {
  return cat.apply(null, collection.map(fun));
}

// Sorting collections
export function comparator(pred) {
  return (x, y) => {
    if (truthy(pred(x, y)))
      return -1;
    else if (truthy(pred(y, x)))
      return 1;
    else
      return 0;
  }
}

