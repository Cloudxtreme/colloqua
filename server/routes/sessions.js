/***********************************************************************************************************************************************
 * SESSIONS
 ***********************************************************************************************************************************************
 * @description On page-load/navigation: 
 */
var hub = require('../hub'),
    model = require('../models/sessions'),
    q = require('q');

var Users = this;

//
// SESSION BOOTSTRAP
//------------------------------------------------------------------------------------------//
// @description
hub.subscribe('started', function(data) {

  /**
   * POST
   *
   * @description creates a new session (login)
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.post('/session', function(req, res) {
    res.send(req.body);
  });

  /**
   * DELETE
   *
   * @description Deletes session (logout)
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.delete('/session', function(req, res) {
    res.send(req.body);
  });

  /**
   * GET
   *
   * @description HTTP entry point for verifying an active session.
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  data.app.get('/session', function(req, res) {
    model.verify(req.query).then(function(data) {
      res.send(200)
    }, function(err) {
      res.send(401, err);
    })
  });
  
});

return Users;