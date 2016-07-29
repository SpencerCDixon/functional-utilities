import test from 'ava';
import { HOF } from './macros';
import {
  isNumber, isString, isArray, isIndexed,
  existy, truthy,
  complement,
  isOdd, isEven,
  hasKeys,
} from '..';

test('isIndexed returns true for arrays', t => {
  t.true(isIndexed([]));
});

test('isIndexed returns true for strings', t => {
  t.true(isIndexed('hello'));
});

test('isIndexed returns false for objects, undefined, null, and NaN', t => {
  t.false(isIndexed({}));
  t.false(isIndexed(undefined));
  t.false(isIndexed(null));
  t.false(isIndexed(NaN));
});

test('existy returns true for things that exist', t => {
  const obj = { exists: 'yupp' };

  t.true(existy(obj.exists));
  t.true(existy(0));
  t.true(existy(false));
  t.true(existy(() => {}));
});

test('existy returns false for things that arnt real', t => {
  t.false(existy({}.nope));
  t.false(existy(null));
  t.false(existy(undefined));
  t.false(existy((function() {})()));
});

test('truthy returns true for things considered truthy (including 0)', t => {
  t.true(truthy(0));
  t.true(truthy(''));
  t.true(truthy(() => {}));
});

test('truthy returns false for things considered false', t => {
  t.false(truthy(undefined));
  t.false(truthy(null));
  t.false(truthy(false));
});

test('isEven returns true for even nums', t => {
  t.true(isEven(2));
  t.false(isEven(1));
});

test('isOdd returns true for odd nums', t => {
  t.true(isOdd(1));
  t.false(isOdd(2));
});

test('complement is a HOF', HOF, complement);
test('complement returns the opposite of a predicate', t => {
  const notNumber = complement(isNumber);

  t.false(notNumber(4));
  t.true(notNumber(''));
});

test('hasKeys is a HOF', HOF, hasKeys);
test('haskeys returns true if all keys are present in an object', t => {
  const obj = { keyOne: 'here', keyTwo: 'also here' };
  const isValid = hasKeys('keyOne', 'keyTwo');
  const isInvalid = hasKeys('notValidKey');

  t.true(isValid(obj));
  t.false(isInvalid(obj));
});
