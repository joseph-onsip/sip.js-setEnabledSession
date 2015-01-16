'use strict';

var concatMap = require('concat-map');

module.exports = catcalls;

function catcalls (methodNames, objs) {
  methodNames = [].concat(methodNames);
  objs = [].concat(objs);

  return concatMap(methodNames, function (name) {
    return concatMap(objs, function (obj) {
      return obj[name]();
    });
  });
}
