'use strict'

var t = require('tcomb');
var moment = require('moment');

var Slug = t.subtype(t.Str, function (s) {
  return s.length >= 3 && s.length <= 20;
}, "String (between 3 and 20 chars.)");

var Name = t.subtype(t.Str, function (s) {
  return s.length >= 3 && s.length <= 10;
}, "String (between 3 and 10 chars.)");

var Description = t.subtype(t.Str, function (s) {
  return s.length >= 0 && s.length <= 255;
}, "String (between 0 and 255 chars.)");

var DateType = t.subtype(t.Str, function(s){
	return moment(new Date(s)).isValid();
}, 'Date 8601');

var Contest = t.struct({
  slug: Slug,
  name: Name,
  description: t.maybe(Description),
  start_date: DateType,
  end_date: DateType
});

module.exports = Contest;