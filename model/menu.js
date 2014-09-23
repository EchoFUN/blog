/**
 *
 *
 *
 *
 */

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.getMenusAll = function(callback) {
  dbConnection.query(utils.getSQLContent('menuall'), callback);
};