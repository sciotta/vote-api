'use strict';

var should = require('should');
var app = require('../../server');
var request = require('supertest');
var database = require('../../config/database');
var artifacts = require('../../components/tests/test-artifacts');

describe('CANDIDATES TESTS', function() {

  beforeEach(function(done) {
    database.resetDataBase('testDB.json', false, false).then(function(){
      request(app)
      .post('/api/contests')
      .send(artifacts.contests.contest1)
      .end(function(err, res){
        done();
      });
    });
  });

  it('should insert candidate when everything ok', function(done) {
   request(app)
   .post('/api/contest/' + artifacts.contests.contest1.slug + '/candidates')
   .send(artifacts.candidates.candidate1)
   .expect('Content-Type', /json/)
   .end(function(err, res){
    res.status.should.be.equal(200);
    done();
  });
 });

  it('should fail when contest not exists', function(done) {
    request(app)
    .post('/api/contest/abcdefg/candidates')
    .send(artifacts.candidates.candidate1)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      res.status.should.be.equal(400);
      res.body[0].message.should.equal('This contest not exists');
      done();
    }); 
  });

  it('should not insert when candidate aready exists', function(done) {   
    request(app)
    .post('/api/contest/' + artifacts.contests.contest1.slug + '/candidates')
    .send(artifacts.candidates.candidate1)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      res.status.should.be.equal(200);
      request(app)
      .post('/api/contest/' + artifacts.contests.contest1.slug + '/candidates')
      .send(artifacts.candidates.candidate1)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.status.should.be.equal(400);
        res.body[0].message.should.equal('This candidate aready exists');
        done();
      });
    });
  });

});