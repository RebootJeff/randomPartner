// External dependencies
var MongoClient = require('mongodb').MongoClient;
var Q = require('q');

var promisifiedDb = {};
var db;

promisifiedDb.connect = function(url) {
  var deferred = Q.defer();

  MongoClient.connect(url, function(err, connectedDb) {
    if(err) {
      deferred.reject(err);
    } else {
      db = connectedDb;
      deferred.resolve(db);
    }
  });

  return deferred.promise;
};

promisifiedDb.find = function(collectionName, query) {
  var deferred = Q.defer();

  db.collection(collectionName).find(query, function(err, result) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });

  return deferred.promise;
};

promisifiedDb.findAndUpdate = function(collectionName, query, update) {
  var deferred = Q.defer();

  db.collection(collectionName).findAndUpdate(query, update, function(err, result) {
    if(err) {
      // TODO - Check if rejection is due to bad find or bad update
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });

  return deferred.promise;
};

promisifiedDb.insert = function(collectionName, doc) {
  var deferred = Q.defer();

  // Add timestamps
  doc.createdAt = doc.createdAt || new Date();
  doc.updatedAt = doc.updatedAt || new Date();

  db.collection(collectionName).insert(doc, function(err, result) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(result);
    }
  });

  return deferred.promise;
};

module.exports = promisifiedDb;
