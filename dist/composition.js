'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.doWhen = doWhen;
exports.invoker = invoker;
exports.fnull = fnull;
exports.validator = validator;
exports.checker = checker;
exports.dispatch = dispatch;
exports.curry = curry;
exports.curry2 = curry2;
exports.curry3 = curry3;
exports.partial1 = partial1;
exports.partial2 = partial2;
exports.partial = partial;
exports.compose = compose;

var _predicates = require('./predicates');

var _collections = require('./collections');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Composition module for creating functional pipelines
 * @module src/composition
 */

/** 
 * Wrapper function that will call an action when condition is true 
 * @param {Boolean} - condition to determine whether or not to call action
 * @param {Function} - action to be called if condition is true
*/
function doWhen(cond, action) {
  if ((0, _predicates.truthy)(cond)) return action();else return undefined;
}

function invoker(name, method) {
  return function (target) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!(0, _predicates.existy)(target)) (0, _util.fail)("Must provide a target");

    var targetMethod = target[name];
    return doWhen((0, _predicates.existy)(targetMethod) && method === targetMethod, function () {
      return targetMethod.apply(target, args);
    });
  };
}

// fnull takes a function as an arg and a number of additional args and returns
// a function that just calls the original function given.  If null/undefined
// are present it will replace them with some defaults:
//
// so lets say the fun passed in was (x, y) => x * y if we want to provide a
// default for x, y at any point it gets called we can add in two defaults for
// example: fnull(multiply, 1, 1); Now 1 will be replaced with x or y if they're
// ever undefined or null.
function fnull(fun) {
  for (var _len2 = arguments.length, defaults = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    defaults[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, secondArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      secondArgs[_key3] = arguments[_key3];
    }

    var args = secondArgs.map(function (e, i) {
      return (0, _predicates.existy)(e) ? e : defaults[i];
    });

    return fun.apply(null, args);
  };
}

// Creates a predicate function to be used with 'checker' that conforms to its
// expected API of having a 'message' field.
function validator(msg, fun) {
  var f = function f() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return fun.apply(fun, args);
  };
  f.message = msg;
  return f;
}

// checker can be used to do validation
function checker() {
  for (var _len5 = arguments.length, validators = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    validators[_key5] = arguments[_key5];
  }

  return function (obj) {
    return validators.reduce(function (errs, check) {
      if (check(obj)) {
        return errs;
      } else {
        return [].concat((0, _toConsumableArray3.default)(errs), [check.message]);
      }
    }, []);
  };
}

// The contract of dispatch: it will keep trying to execute functions until it
// runs out or one returns an existy value. 
function dispatch() {
  for (var _len6 = arguments.length, funs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    funs[_key6] = arguments[_key6];
  }

  var size = funs.length;

  return function (target) {
    for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
      args[_key7 - 1] = arguments[_key7];
    }

    var ret = undefined;

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, [target].concat(args));

      if ((0, _predicates.existy)(ret)) return ret;
    }

    return ret;
  };
}

// Currying
function curry(fun) {
  return function (arg) {
    return fun(arg);
  };
}
function curry2(fun) {
  return function (secondArg) {
    return function (firstArg) {
      return fun(firstArg, secondArg);
    };
  };
}
function curry3(fun) {
  return function (last) {
    return function (middle) {
      return function (first) {
        return fun(first, middle, last);
      };
    };
  };
}

// Partial Application
function partial1(fun, arg1) {
  return function () {
    for (var _len8 = arguments.length, pargs = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      pargs[_key8] = arguments[_key8];
    }

    var args = (0, _collections.construct)(arg1, pargs);
    return fun.apply(fun, args);
  };
}
function partial2(fun, arg1, arg2) {
  return function () {
    for (var _len9 = arguments.length, pargs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      pargs[_key9] = arguments[_key9];
    }

    var args = (0, _collections.cat)([arg1, arg2], pargs);
    return fun.apply(fun, args);
  };
}
function partial(fun) {
  for (var _len10 = arguments.length, pargs = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    pargs[_key10 - 1] = arguments[_key10];
  }

  return function () {
    for (var _len11 = arguments.length, internalArgs = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      internalArgs[_key11] = arguments[_key11];
    }

    var args = (0, _collections.cat)(pargs, internalArgs);
    return fun.apply(fun, args);
  };
}

function compose() {
  for (var _len12 = arguments.length, funcs = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    funcs[_key12] = arguments[_key12];
  }

  if (funcs.length === 0) return function (arg) {
    return arg;
  };
  if (funcs.length === 1) return funcs[0];

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}