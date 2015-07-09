'use strict';

var t =       require('tcomb-validation');
var moment = require('moment');
var model = require('./contest.model.js');
var getContestCollection = require('../../config/database').getContestCollection;

exports.list = function(req, res) {
  getContestCollection().then(function(contests){
    return res.status(200).json(contests.data);
    console.log(contests.data);
  });
};

exports.create = function(req, res) {
  var result = t.validate(req.body, model);
  
  if (!result.isValid()) {
    return res.status(400).json(result.errors);
  }

  if(moment(new Date(req.body.end_date)) < moment(new Date(req.body.start_date))){
    return res.status(400).json([{
      message: '/end_date must be greater than /start_date'
    }]);
  }

  getContestCollection().then(function(collection){
    var item = collection.findOne({slug: req.body.slug});
    if( item !== null ) {
      return res.status(400).json([{
        message: 'This slug aready exists'
      }]);  
    }
    collection.insert(req.body);
    return res.status(200).json(req.body); 
  });
};