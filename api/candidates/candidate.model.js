'use strict'

var t = require('tcomb');
var moment = require('moment');

var Name = t.subtype(t.Str, function (s) {
  return s.length >= 3 && s.length <= 10;
}, "String (between 3 and 10 chars.)");

var Avatar = t.subtype(t.Str, function (s) {
  return s.length >= 0 && s.length <= 255;
}, "String (between 0 and 255 chars.)");

var Candidate = t.struct({
  id: t.Num,
  name: Name,
  avatar: t.maybe(Avatar)
});

module.exports = Candidate;