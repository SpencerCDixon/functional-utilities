import test from 'ava';
import { HOF } from './macros';
import {
  comparator,
  first, second, third, fourth, fifth,
  rest, tail, butLast,
  cat, construct, mapcat,
} from '..';

test('comparator is a higher order func', HOF, comparator);
test('comparators can take predicates to and return 1, -1, 0', t => {
  const lessOrEqual = (x, y) => x <= y;
  const sortable = comparator(lessOrEqual);

  t.is(sortable(1, 2), -1);
  t.is(sortable(2, 1), 1);

  const array = [20, -20, 5, 2];
  const sorted = array.sort(sortable);
  t.deepEqual(sorted, [-20, 2, 5, 20]);
});
test('comparator will return 0 when the comparator is not truthy for either options', t => {
  const alwaysZero = (x, y) => false;
  const sortable = comparator(alwaysZero);
  t.is(sortable(1, 2), 0);
});

test('first returns first element', t => {
  t.is(first([1, 2, 3, 4, 5]), 1);
  t.is(first('hello'), 'h');
});

test('second returns second element', t => {
  t.is(second([1, 2, 3, 4, 5]), 2);
  t.is(second('hello'), 'e');
});

test('third returns third element', t => {
  t.is(third([1, 2, 3, 4, 5]), 3);
  t.is(third('hello'), 'l');
});

test('fourth returns fourth element', t => {
  t.is(fourth([1, 2, 3, 4, 5]), 4);
  t.is(fourth('hello'), 'l');
});

test('fifth returns fifth element', t => {
  t.is(fifth([1, 2, 3, 4, 5]), 5);
  t.is(fifth('hello'), 'o');
});

test('rest returns the tail of an array', t => {
  const array = ['first', 'second', 'third'];
  t.deepEqual(rest(array), ['second', 'third']);
});
test('tail is alias for rest', t => {
  const array = ['first', 'second', 'third'];
  t.deepEqual(tail(array), ['second', 'third']);
});

test('butLast returns everything but last elem of collection', t => {
  const array = [1,2,3, 'last'];
  t.deepEqual(butLast(array), [1,2,3]);
});

test('cat combines arrays', t => {
  t.deepEqual(cat([1,2],[3,4],[5,6]), [1,2,3,4,5,6]);
});
test('cat returns empty array when invoked without a head', t => {
  t.deepEqual(cat(), []);
});

test('construct creates a new array out of values', t => {
  t.deepEqual(construct(42, [1,2]), [42, 1, 2]);
});

test('mapcat calls a func for every element and then concats them', t => {
  const nums = [1, 2, 3];
  const addComma = e => construct(e, [',']);
  t.deepEqual(mapcat(addComma, nums), [1, ',', 2, ',', 3, ',']);
});

