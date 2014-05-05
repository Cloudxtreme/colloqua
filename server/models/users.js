/***********************************************************************************************************************************************
 * USERS
 ***********************************************************************************************************************************************
 * @description On page-load/navigation: 
 */
var hub = require('../hub'),
    q = require('q'),
    collection;

var Users = this;

//
// USERS BOOTSTRAP
//------------------------------------------------------------------------------------------//
// @description
hub.subscribe('started', function(data) {
  collection = data.DB.db.collection('users');

  Users.get = function(user) {

  };

  /**
   * CREATE
   *
   * @description  creates a new user.
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  Users.create = function(user) {
    var def = q.defer();

    if(!user.email && !user.name) {
      def.reject('Please provide email and/or name');
    } else {
      collection.find({email: user.email}).toArray(function(err, itms) {
        if(!itms.length) {
          collection.insert(user, function(err, itm) {
            if(err) {
              def.reject('Could not add user: ', err)
            } else {
              def.resolve(itm[0]);
            }
          });
        } else {
          def.reject('User with email: '+user.email+' already exists');
        }
      });
    }
    return def.promise;
  };

  /**
   * SANITIZE
   *
   * @description Currently just strips PW from user data.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Users.sanitize = function(data) {
    var def = q.defer();

    if(data.constructor === Object) {
      data = [data]
    }

    var users = data.map(function(itm, idx) {
      delete itm["password"]
      return itm;
    });

    def.resolve(users);

    return def.promise;
  }
});

return Users;