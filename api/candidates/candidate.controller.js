'use strict';

var q = require('q');
var _ = require('lodash');
var t =       require('tcomb-validation');
var moment = require('moment');
var model = require('./candidate.model.js');
var getContestCollection = require('../../config/database').getContestCollection;


exports.list = function(req, res) {
  var slug = req.params.contestslug;

  getContestCollection().then(function(collection){
    var item = collection.findOne({slug: slug});
    return res.status(200).json(item.candidates);
  });
};

exports.create = function(req, res) {
  var result = t.validate(req.body, model);
  var slug = req.params.contestslug;

  if (!result.isValid()) {
    return res.status(400).json(result.errors);
  }

  getContestCollection().then(function(collection){
    var contest = collection.findOne({slug: slug});
    if( contest === null ) {
      return res.status(400).json([{
        message: 'This contest not exists'
      }]);  
    }

    if(contest.candidates === undefined){
      contest.candidates = [];
    }

    var candidate = req.body;

    var foundCandidate = _.find(contest.candidates, function(findCandidate){
      return findCandidate.id === req.body.id;
    })
    
    if(foundCandidate !== undefined){
      return res.status(400).json([{
        message: 'This candidate aready exists'
      }]); 
    }

    contest.candidates.push(candidate);
    collection.update(contest);

    return res.status(200).json(candidate); 
  });
};