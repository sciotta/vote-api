'use strict';

var t =       require('tcomb-validation');
var moment = require('moment');
var _ = require('lodash');
var model = require('./votes.model.js');
var getContestCollection = require('../../config/database').getContestCollection;
var getVoteCollection = require('../../config/database').getVoteCollection;

exports.byContest = function(req, res) {
  var slug = req.params.contestslug;
  getVoteCollection().then(function(votes){
    var votesByContest = votes.find( {'contest': slug} );
    return res.status(200).json({result: votesByContest.length});
  });
};

exports.byCandidate = function(req, res) {
  var candidateid = req.params.candidateid;
  getVoteCollection().then(function(votes){
    var votesByCandidate = votes.find( {'candidate': candidateid} );
    return res.status(200).json({result: votesByCandidate.length});
  });
};

exports.vote = function(req, res) {
  var contest = req.params.contestslug;
  var candidate = req.params.candidateid;
  var token = req.headers['user-token'];

  if( process.env.NODE_ENV === 'benchmark' )
  {
    token = Math.random().toString(36).replace(/[^a-z]+/g, '');
  }

  getContestCollection().then(function(collection){
    var item = collection.findOne({slug: contest});
    if( item === null ) {
      console.log('contest not exist');
      return res.status(400).json([{
        message: 'This contest not exists'
      }]);  
    }

    if(item.candidates === undefined){
      console.log('This contest not contains candidates');
      return res.status(400).json([{
        message: 'This contest not contains candidates'
      }]); 
    }

    var foundCandidate = _.find(item.candidates, function(findCandidate){
      return findCandidate.id === candidate;
    });

    if(foundCandidate === null){
      console.log('candidate not exists');
      return res.status(400).json([{
        message: 'This candidate ' + candidate +' not exists'
      }]); 
    }
  });

  if(token === undefined || token === null){
    console.log('Token erro');
    return res.status(400).json([{
      message: 'user-token needs to be setted on header'
    }]);
  }

  getVoteCollection().then(function(votes){
    var interval = moment.duration(10, 'minutes');
    var minutesAgo = moment();
    minutesAgo.subtract(interval);

    var votesByToken = votes.find({'token': token});

    var votesInPeriod = _.filter(votesByToken, function(voteItem) {
      return moment(voteItem.dateTime).isAfter(minutesAgo);
    });

    if(votesInPeriod.length >= 5){
      console.log('5 per minute');
      return res.status(400).json([{
        message: 'Only 5 votes peer 10 minutes is permitted!'
      }]);

    }
    votes.insert({datetime: new Date(), contest: contest, candidate: candidate, token: token});
    return res.status(200).json({token: token});
  });
};