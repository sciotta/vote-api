'use strict';

var should = require('should');
var q = require('q');
var app = require('../../server');
var request = require('supertest');
var database = require('../../config/database');
var artifacts = require('../../components/tests/test-artifacts');

describe('VOTE TESTS', function() {

  var makeVote = function(token){
    var defered = q.defer();
    request(app)
    .post('/api/votes/' + artifacts.contests.contest1.slug + '/' + artifacts.candidates.candidate1.id)
    .set('user-token', token)
    .end(function(err, res){
      defered.resolve();
    });
    return defered.promise;
  };

  beforeEach(function(done) {
    database.resetDataBase('testDB.json', false, false).then(function(){
      request(app)
      .post('/api/contests')
      .send(artifacts.contests.contest1)
      .end(function(err, res){
        request(app)
        .post('/api/contest/' + artifacts.contests.contest1.slug + '/candidates')
        .send(artifacts.candidates.candidate1)
        .end(function(err,res){
          request(app)
          .post('api/contest/' + artifacts.contests.contest1.slug + '/candidates')
          .send(artifacts.candidates.candidate2)
          .end(function(err,res){
            done();  
          });
        });
      });
    });
  });

  it('should limit 5 votes per token', function(done) {
    var token = 'abcdefg';
    var votes = [makeVote(token), makeVote(token), makeVote(token), makeVote(token), makeVote(token)];
    q.all(votes).then(function(){
      request(app)
      .post('/api/votes/' + artifacts.contests.contest1.slug + '/' + artifacts.candidates.candidate1.id)
      .set('user-token', token)
      .end(function(err, res){
        res.body[0].message.should.equal('Only 5 votes peer 10 minutes is permitted!');
        done();
      });
    });
  });
});