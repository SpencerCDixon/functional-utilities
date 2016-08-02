import { truthy, existy } from './predicates';
import { construct, cat } from './collections';
import { fail } from './util';

/** 
 * Wrapper function that will call an action when condition is true 
 * @param {Boolean} - condition to determine whether or not to call action
 * @param {Function} - action to be called if condition is true
*/
export function doWhen(cond, action) {
  if (truthy(cond))
    return action();
  else
    return undefined;
}

export function invoker(name, method) {
  return (target, ...args) => {
    if (!existy(target)) fail("Must provide a target");

    const targetMethod = target[name];
    return doWhen((existy(targetMethod) && method === targetMethod), () => {
      return targetMethod.apply(target, args);
    });
  }
}

// fnull takes a function as an arg and a number of additional args and returns
// a function that just calls the original function given.  If null/undefined
// are present it will replace them with some defaults:
//
// so lets say the fun passed in was (x, y) => x * y if we want to provide a
// default for x, y at any point it gets called we can add in two defaults for
// example: fnull(multiply, 1, 1); Now 1 will be replaced with x or y if they're
// ever undefined or null.
export function fnull(fun, ...defaults) {
  return function(...secondArgs) {
    const args = secondArgs.map((e, i) => {
      return existy(e) ? e : defaults[i];
    });

    return fun.apply(null, args);
  }
}

// Creates a predicate function to be used with 'checker' that conforms to its
// expected API of having a 'message' field.
export function validator(msg, fun) {
  const f = function(...args) {
    return fun.apply(fun, args);
  }
  f.message = msg;
  return f;
}

// checker can be used to do validation
export function checker(...validators) {
  return obj => {
    return validators.reduce((errs, check) => {
      if (check(obj)) {
        return errs;
      } else {
        return [...errs, check.message];
      }
    }, []);
  }
}

// The contract of dispatch: it will keep trying to execute functions until it
// runs out or one returns an existy value. 
export function dispatch(...funs) {
  const size = funs.length;

  return (target, ...args) => {
    let ret = undefined;

    for (let funIndex = 0; funIndex < size; funIndex++) {
      const fun = funs[funIndex];
      ret = fun.apply(fun, [target, ...args]);

      if (existy(ret)) return ret;
    }

    return ret;
  }
}

// Currying
export function curry(fun) { return arg => fun(arg); }
export function curry2(fun) {
  return secondArg => firstArg => fun(firstArg, secondArg);
}
export function curry3(fun) {
  return last => middle => first => fun(first, middle, last);
}

// Partial Application
export function partial1(fun, arg1) {
  return (...pargs) => {
    const args = construct(arg1, pargs)
    return fun.apply(fun, args)
  }
}
export function partial2(fun, arg1, arg2) {
  return (...pargs) => {
    const args = cat([arg1, arg2], pargs);
    return fun.apply(fun, args);
  }
}
export function partial(fun, ...pargs) {
  return (...internalArgs) => {
    const args = cat(pargs, internalArgs);
    return fun.apply(fun, args);
  }
}

export function compose(...funcs) {
  if (funcs.length === 0) return arg => arg
  if (funcs.length === 1) return funcs[0]

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

/** 
 * Function that does nothing but return the value supplied to it
 * @param {*} any value
 * @returns {*} returns value supplied
*/
export function identity(value) { return value };
