/* eslint no-extend-native: 0 */
// Remove any polyfills you don't need
import includes from 'core-js/es/array/virtual/includes';
import arrayFrom from 'core-js/es/array/from';
import findIndex from 'core-js/es/array/virtual/find-index';
import find from 'core-js/es/array/virtual/find';
import stringIncludes from 'core-js/es/string/virtual/includes';
import startsWith from 'core-js/es/string/virtual/starts-with';
import repeat from 'core-js/es/string/virtual/repeat';
import assign from 'core-js/es/object/assign';
import isNaN from 'core-js/es/number/is-nan';
import sign from 'core-js/es/math/sign';
import trunc from 'core-js/es/math/trunc';
import Map from 'core-js/es/map';
import Set from 'core-js/es/set';

require('intersection-observer');

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
String.prototype.includes = stringIncludes;
String.prototype.repeat = repeat;
String.prototype.startsWith = startsWith;
Array.prototype.includes = includes;
Array.prototype.findIndex = findIndex;
Array.prototype.from = arrayFrom;
Array.prototype.find = find;
Object.assign = assign;
Number.isNaN = isNaN;
Math.sign = sign;
Math.trunc = trunc;
global.Map = Map;
global.Set = Set;
