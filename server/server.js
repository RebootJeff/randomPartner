// External dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

// Internal depdencies
var database = require('./promisifiedDb');

// Let's do this...
var app = express();
var env = process.env.NODE_ENV || 'development';


// ============================================================================
// Middleware
// ============================================================================
app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); // log request/response info to console


// ============================================================================
// Database connection
// ============================================================================
var dbUrl = 'mongodb://localhost:27017/randomTeamwork';

if(env === 'development') {
   dbUrl += '-dev';
}
database.connect(dbUrl).then(function() {
  console.log('Connected to database.');
}).catch(function(reason) {
  console.error('Error trying to connect to database:', reason);
});


// ============================================================================
// Basic routes
// ============================================================================
app.route('/api/dev')
  .get(function(req, res, next){

  })
  .post(function(req, res, next){

  });

// Default to home page
// TODO: Fix this to serve 404 page as appropriate
app.get('/*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../dist'
  });
});


// ============================================================================
// Start server
// ============================================================================
app.listen(8000);
console.log('Listening on port 8000...');
