/***********************************************************************************************************************************************
 * SESSIONS
 ***********************************************************************************************************************************************
 * @description On page-load/navigation: 
 */
var hub = require('../hub'),
    model = require('../models/users'),
    q = require('q');

var Users = this;

//
// USERS BOOTSTRAP
//------------------------------------------------------------------------------------------//
// @description
hub.subscribe('started', function(data) {

  /**
   * GET
   *
   * @description Returns all users for admins and org/team only
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.get('/users', function(req, res) {

  });

  /**
   * GET:ID
   *
   * @description Returns a user object - will need org/team/admin restrictions
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.get('/users/:id', function(req, res) {

  });

  /**
   * NEW USER
   * 
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.post('/users/new', function(req, res) {
    if(!req.body) res.send(400, 'No Data Recieved');

    model.create(req.body).then(function(data) {
      hub.publish('new_user', {res: res, data:data, fn: function(user) {
        model.sanitize(user).then(function(serUser) {
          res.send(200, serUser);
        }, function(err) {
          res.send(400, err);
        });
      }, err: function(err) {
          res.send(400, err)
        }
      });
    }, function(err) {
      res.send(400, 'Error creating user: '+err)
    });
  });

  /**
   * DELETE
   *
   * @description Delete a user - will need above restrictions/perms
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.delete('/users/:id', function(req, res) {

  });

});

return Users;