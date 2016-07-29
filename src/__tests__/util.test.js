import test from 'ava';
import sinon from 'sinon';
import { HOF } from './macros';
import {
  fail, warn, note, log,
  T, F,
  always, k,
} from '..';

test('fail throws an error with proper message', t => {
  t.throws(fail.bind(null, 'message'), 'message');
});

test('warn prepends message with WARNING', t => {
  sinon.stub(console, 'log');
  warn('you should check this out');

  t.true(console.log.calledOnce);
  t.true(console.log.calledWith('WARNING: you should check this out'));

  console.log.restore();
});
test('note prepends message with NOTE', t => {
  sinon.stub(console, 'log');
  note('something good happened');

  t.true(console.log.calledOnce);
  t.true(console.log.calledWith('NOTE: something good happened'));

  console.log.restore();
});
test('log is a wrapper around console.log', t => {
  sinon.stub(console, 'log');
  log('just logging away');

  t.true(console.log.calledOnce);
  t.true(console.log.calledWith('just logging away'));

  console.log.restore();
});

test('T always returns true', t => {
  t.true(T());
});
test('F always returns false', t => {
  t.false(F());
});

test('always is a higher order function', HOF, always);
test('k is a higher order function', HOF, k);
test('always returns its argument wrapped in a func', t => {
  const forty = always(40);
  t.is(forty(), 40);
});
test('k always returns its argument wrapped in a func', t => {
  const meaningOfLife = k(42);
  t.is(meaningOfLife(), 42);
});
