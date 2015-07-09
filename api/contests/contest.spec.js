'use strict';

var should = require('should');
var app = require('../../server');
var request = require('supertest');
var database = require('../../config/database');
var artifacts = require('../../components/tests/test-artifacts');

describe('CONTESTS TESTS', function() {

  beforeEach(function(done) {
    database.resetDataBase('testDB.json', false, false).then(function(){
      done();
    });
  });

  it('should respond with JSON array', function(done) {
    request(app)
    .get('/api/contests')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.be.instanceof(Array);
      res.body.length.should.be.equal(0);
      done();
    });
  });

  it('should insert new contest', function(done) {
   request(app)
   .post('/api/contests')
   .send(artifacts.contests.contest1)
   .expect('Content-Type', /json/)
   .end(function(err, res){
    res.status.should.be.equal(200);

    request(app)
    .get('/api/contests')
    .end(function(err, res) {
      if (err) return done(err);
      res.body.length.should.be.equal(1);
      done();
    });
  });
 });

  it('should fail when saving a duplicate contest', function(done) {
   request(app)
   .post('/api/contests')
   .send(artifacts.contests.contest1)
   .expect('Content-Type', /json/)
   .end(function(err, res){
    res.status.should.be.equal(200);

    request(app)
    .post('/api/contests')
    .send(artifacts.contests.contest1)
    .expect('Content-Type', /json/)
    .end(function(err, res){
      res.status.should.be.equal(400);
      res.body[0].message.should.equal('This slug aready exists');
      done();
    });
  });
 });

  it('should not include contest with wrong date', function(done) {   
   request(app)
   .post('/api/contests')
   .send(artifacts.contests.wrongDate)
   .expect('Content-Type', /json/)
   .end(function(err, res){
    res.status.should.be.equal(400);
    res.body[0].message.should.equal('/end_date must be greater than /start_date');
    done();
  });
 });

});