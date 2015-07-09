'use strict'

var t = require('tcomb');

var Slug = t.subtype(t.Str, function (s) {
  return s.length >= 3 && s.length <= 20;
}, "String (between 3 and 20 chars.)");

var Vote = t.struct({
  contest: Slug,
  candidate: t.Num,
  token: t.Str
});

module.exports = Vote;