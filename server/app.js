var express = require('express'),
    
    // Hub
    hub = require('./hub'),

    // fs
    fs = require('fs'),

    // Mongo
    mongo = require('mongodb'),

    DB = {
      ObjectID: require('mongodb').ObjectID,
      Db: require('mongodb').Db,
      Server: require('mongodb').Server,
      Connection: require('mongodb').Connection,
    };

DB.host = 'localhost';
DB.port = 27017;
DB.db = new DB.Db('colloqua', new DB.Server(DB.host, DB.port, {}), {native_parser:false, w:1});
DB.BSON = mongo.BSONPure;

var app = express();

// Get JSON parser
app.use(require('connect').bodyParser());

//register started
hub.register('started');

//
// REQUIRE RESOURCES
//------------------------------------------------------------------------------------------//
// @description Crawls directries for files and 'requires' them;

var files = {};
files.models = fs.readdirSync('./models');
files.routes = fs.readdirSync('./routes');

var resources = {};
resources.routes = {};
resources.models = {};

for(var file in files) {
  for(var i=0; i<files[file].length; i++) {
    resources[file][files[file][i].split('.js')[0]] = require('./'+file+'/'+files[file][i].split('.js')[0]);
  }
}


// all access control origin for development
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
       res.send(200);
   } else {
       next();
   }
});

// Open the DB
DB.db.open(function(err, db) {
  if(err) {
    console.log('Could not connect to DB, Aborting: ', err);
  } else {
    app.listen(3000,  function() {
      console.log('server started on port 3000');
      hub.publish('started', {app: app, DB:DB});
    })
  }
});