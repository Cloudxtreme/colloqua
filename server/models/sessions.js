/***********************************************************************************************************************************************
 * SESSIONS
 ***********************************************************************************************************************************************
 * @description On page-load/navigation: 
 */
var hub = require('../hub'),
    token = require('token'),
    q = require('q'),
    collection;

var Sessions = this;

token.defaults.secret = 'AbB';
token.defaults.timeStep = 24 * 60 * 60;

//
// SESSIONS BOOTSRAP
//------------------------------------------------------------------------------------------//
// @description
hub.subscribe('started', function(data) {
  collection = data.DB.db.collection('sessions');

  Sessions.get = function(user) {

  };

  /**
   * CREATE
   *
   * @description  creates a new session
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  Sessions.create = function(user) {
    var def = q.defer(),
        id = user._id.toString();

    collection.insert({uid: user._id, token: token.generate(id+'|'+user.name)}, {w:1, safe:true}, function(err, session) {
      if(err) {
        def.reject(err);
      } else {
        def.resolve(user);
      }
    });

    return def.promise;
  };

  /**
   * VERIFY
   *
   * @description Verifies user login.
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  Sessions.verify = function(params) {
    var def = q.defer();

    if(!params._id && !params.name) {
      def.reject('No Data provided, could not authorize session');
    }

    params._id = params._id.toString();

    collection.find({uid: new data.DB.ObjectID(params._id)}).toArray(function(err, session) {
      if(err) {
        def.reject('No session found');
      } else {
        if(session.length && token.verify(params._id+'|'+params.name, session[0].token)) {
          def.resolve();
        } else {
          def.reject('Unauthorized.')
        }
      }
    });

    return def.promise;
  };

  /**
   * NEW USER SUBSCRIPTION
   *
   * @description Trigger for creating a new session when a new user is created.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  hub.subscribe('new_user', function(data) {
    Sessions.create(data.data).then(function(user) {
      data.fn(user);
    }, function(err) {
      data.err(err);
    })
  })
});

return Sessions;