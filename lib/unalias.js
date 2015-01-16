'use strict';

module.exports = unalias;

function unalias (dict, aliases) {
  aliases = aliases || Object.keys(dict);
  aliases = [].concat(aliases);
  return aliases.map(function (alias) {
    if (alias in dict) {
      return dict[alias];
    }
    return alias;
  });
}
