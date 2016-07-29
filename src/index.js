export {
  isIndexed,
  hasKeys, 
  isNumber, isString, isArray,
  existy, truthy,
  complement,
  isEven, isOdd,
} from './predicates';

export {
  comparator,
  first, second, third, fourth, fifth,
  rest, tail, butLast,
  cat, construct, mapcat,
} from './collections';

export {
  doWhen,
  invoker,
  fnull,
  checker,
  validator,
  dispatch,
  curry, curry2, curry3,
  partial, partial1, partial2,
  compose,
} from './composition';

export {
  always, k,
  T, F,
  fail, note, log, warn,
} from './util';
