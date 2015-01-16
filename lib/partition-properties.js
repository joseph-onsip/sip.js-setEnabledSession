'use strict';

module.exports = partitionProperties;

function partitionProperties (obj, predicate, callback) {
  for (var key in obj) {
    var value = obj[key];
    callback(predicate(value, key, obj), value);
  }
};
