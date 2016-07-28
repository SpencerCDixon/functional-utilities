export function HOF(t, input) {
  t.is(typeof input(), 'function');
}
