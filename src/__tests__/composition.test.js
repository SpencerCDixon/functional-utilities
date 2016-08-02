import test from 'ava';
import { HOF } from './macros';
import { spy } from 'sinon';
import { isEven, always } from '..';
import {
  doWhen,
  invoker,
  fnull,
  checker,
  validator,
  dispatch,
  curry, curry2, curry3,
  partial, partial1, partial2,
  compose,
  identity,
} from '..';

test('doWhen calls action when truthy', t => {
  const action = spy();
  doWhen(true, action);
  t.is(action.calledOnce, true);
});
test('doWhen doesnt call action when falsy', t => {
  const action = spy();
  doWhen(false, action);
  t.is(action.calledOnce, false);
});

test('invoker is a higher order function', HOF, invoker);
test('invoker fails when not given a target', t => {
  const hof = invoker('reverse', Array.prototype.reverse);
  t.throws(hof, "Must provide a target");
});
test('invoker calls method if it exists on target', t => {
  const method = spy();
  const target = { myMethod: method };
  const hof = invoker('myMethod', method);

  hof(target, 'arg1');

  t.is(method.calledOnce, true);
  t.is(method.calledWith('arg1'), true);
});

test('fnull is a higher order function', HOF, fnull);
test('fnull replaces null/undefined with defaults', t => {
  const nums = [1, 2, 3, null, 5];
  const safeMultiply = fnull((x, y) => x * y, 1, 1);
  t.is(nums.reduce(safeMultiply), 30);
});

test('validator is a higher order function', HOF, validator);
test('validator adds a message to the new func to conform with checker API', t => {
  const isEven = validator('must be even', isEven);
  t.is(isEven.message, 'must be even');
});

test('checker is a higher order function', HOF, checker);
test('checker returns an array of errors if there are any', t => {
  const onlyEven = checker(
    validator('must be even', isEven)
  );

  t.deepEqual(onlyEven(1), ['must be even']);
});
test('checker returns an empty array if no errors', t => {
  const noChecks = checker();
  t.deepEqual(noChecks(), []);
});

test('dispatch is a higher order function', HOF, dispatch);
test('dispatch returns when a func returns something other than undefined', t => {
  const str = dispatch(
    invoker('toString', Array.prototype.toString),
    invoker('toString', String.prototype.toString)
  );
  t.is(str('a'), 'a');
  t.is(str([1, 2]), "1,2");
});
test('dispatch calls funcs left to right', t => {
  const always10 = dispatch(always(10), invoker('toString', String.prototype.toString));
  t.is(always10('not gonna reverse'), 10);
});

test('curry is a higher order function', HOF, curry);
test('curry2 is a higher order function', HOF, curry2);
test('curry3 is a higher order function', HOF, curry3);
test('curry only allows one arg to be passed into its returned func', t => {
  const parseBase10 = curry(parseInt);
  const nums = ['1', '2', '3'];
  t.deepEqual(nums.map(parseBase10), [1, 2, 3]);
});

test('curry2 allows you to bind two args into func', t => {
  const greater = (lhs, rhs) => lhs > rhs;
  const greaterThan10 = curry2(greater)(10);

  t.false(greaterThan10(5));
  t.true(greaterThan10(15));
});

test('curry3 allows you to bind three args into func', t => {
  const add3 = (one, two, three) => one + two + three;
  const add100 = curry3(add3)(75)(25);

  t.is(add100(10), 110);
});

test('partial is a higher order function', HOF, partial);
test('partial1 is a higher order function', HOF, partial1);
test('partial2 is a higher order function', HOF, partial2);

test('partial1 allows you to apply one arg', t => {
  const div = (x, y) => x / y;
  const divBy10 = partial1(div, 10, 2);

  t.is(divBy10(2), 5);
});
test('partial2 allows you to apply two args', t => {
  const div = (x, y) => x / y;
  const div2By10 = partial2(div, 10, 2);

  t.is(div2By10(), 5);
});
test('partial lets you apply as many args as you want', t => {
  const add3 = (one, two, three) => one + two + three;
  const oneHundred = partial(add3, 60, 30, 10);
  t.is(oneHundred(), 100);
});

test('compose composes from right to left', t => {
  const double = x => x * 2
  const square = x => x * x
  t.is(compose(square)(5), 25)
  t.is(compose(square, double)(5), 100)
  t.is(compose(double, square, double)(5), 200)
})
test('compose can be seeded with multiple arguments', t => {
  const square = x => x * x
  const add = (x, y) => x + y
  t.is(compose(square, add)(1, 2), 9)
})
test('compose returns the identity function if given no arguments', t => {
  t.is(compose()(1, 2), 1)
  t.is(compose()(3), 3)
  t.is(compose()(), undefined)
})
test('compose returns the first function if given only one', t => {
  const fn = () => {}
  t.is(compose(fn), fn)
})

test('identity always returns the value given to it', t => {
  const array = [];
  const object = {};
  const undef = undefined;
  const string = 'string';
  const number = 42;
  const func = () => {};

  t.is(identity(array), array);
  t.is(identity(object), object);
  t.is(identity(undef), undef);
  t.is(identity(string), string);
  t.is(identity(number), number);
  t.is(identity(func), func);
});
