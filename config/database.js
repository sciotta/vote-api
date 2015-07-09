'use strict';

var fs = require('fs')
var loki = require('lokijs');
var q = require('q');

var db = null;
var dbFile = 'db.json';

var getDataBase = function(){

  var defered = q.defer();

  if(db){
    defered.resolve(db);
    return defered.promise;
  }

  if( process.env.NODE_ENV === 'benchmark' )
  {
    db = new loki('components/tests/test-database.json', {
      autoload: true,
      autosave: false,
      autoloadCallback: function(){
        defered.resolve(db);
      }
    });
    return defered.promise;
  }

  db = new loki(dbFile);
  defered.resolve(db);
  return defered.promise;
};

var getCollection = function(collectionName, indices){
  var defered = q.defer();

    getDataBase().then(function(database){
      var coll = database.getCollection(collectionName);
      if (coll === null) {
        var options = {};
        if(indices){
          options.indices = indices;
        }
        coll = database.addCollection(collectionName, options);
      }
      defered.resolve(coll);
    });
    return defered.promise; 
};

module.exports = {
  getContestCollection: function(){
    return getCollection("contests");
  },
  getVoteCollection: function(){
    return getCollection("votes", ['context', 'candidate', 'token']);
  },
  resetDataBase: function(database, autoload, autosave){
    var defered = q.defer();
    db = null;

    if(database){
      dbFile = database;
      if (fs.exists(database)) { 
        fs.truncateSync(filePath, 0, function(){
          defered.resolve();
        });
      }
    }
    defered.resolve();
    return defered.promise;
  }
};