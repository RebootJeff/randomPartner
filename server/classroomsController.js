// Internal Dependencies
var database = require('./promisifiedDb');

var classroomsCtrl = {};

classroomsCtrl.findByHash = function(req, res, next) {

  database.find({
    hash: req.params.hash
  }).then(function(foundClassroom) {
    res.send(200, foundClassroom);

  }).catch(function(err) {
    res.send(404, err);
  });

};

classroomsCtrl.updateByHash = function(req, res, next) {

  database.findAndUpdate({

  }).then(function(updatedClassroom) {
    res.send(200, updatedClassroom);

  }).catch(function(err) {
    // TODO - Check if status code should be 404 or 500
    res.send(500, err);
  });

};

classroomsCtrl.create = function(req, res, next) {

  database.insert('classrooms', {
    // hash: TODO - generate SHA-1 hash here,
    name: req.body.name,
    students: [],
    teacher: req.body.teacher
  }).then(function(createdClassroom) {
    res.send(201, createdClassroom);

  }).catch(function(err) {
    res.send(500, err);
  });

};



module.exports = classroomsCtrl;

