/**
 *
 *
 *
 *
 */

var ejs = require('ejs');

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.checkUser = function (user, password, callback) {
  var sqlContent = ejs.render(utils.getSQLContent('checkuser'), {
    user: user,
    password: password
  });

  dbConnection.query(sqlContent, callback);
};