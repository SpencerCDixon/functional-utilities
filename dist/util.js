"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fail = fail;
exports.warn = warn;
exports.note = note;
exports.log = log;
exports.T = T;
exports.F = F;
exports.always = always;
exports.k = k;
function fail(thing) {
  throw new Error(thing);
}

function warn(thing) {
  log("WARNING: " + thing);
}

function note(thing) {
  log("NOTE: " + thing);
}

function log(string) {
  console.log(string);
}

function T() {
  return true;
}
function F() {
  return false;
}

// Combinators.  Always return a func with the closed over value.
function always(val) {
  return function () {
    return val;
  };
}
function k(val) {
  return always(val);
}