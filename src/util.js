export function fail(thing) {
  throw new Error(thing);
}

export function warn(thing) {
  log(`WARNING: ${thing}`);
}

export function note(thing) {
  log(`NOTE: ${thing}`);
}

export function log(...args) {
  console.log(...args);
}

export function T() { return true }
export function F() { return false }

// Combinators.  Always return a func with the closed over value.
export function always(val) { return () => val; }
export function k(val) { return always(val) }
