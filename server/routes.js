// Internal Dependencies
var classroomsCtrl = require('./classroomsController');

function setupRoutes(app) {
  app.route('/api/dev')
    .get(function(req, res, next){
      // I'm an example! Hell yes.
    })
    .post(function(req, res, next){
      // I'm also an example! For future reference, no doubt.
    });

  app.route('/api/classroom/:hash')
    .get(classroomsCtrl.findByHash)
    .put(classroomsCtrl.updateByHash);

  app.route('/api/classroom/create').post(classroomsCtrl.create);

  // Default to home page
  // TODO: Fix this to serve 404 page as appropriate
  app.get('/*', function(req, res, next) {
    res.sendFile('index.html', {
      root: __dirname + '/../dist'
    });
  });
}

module.exports = setupRoutes;
