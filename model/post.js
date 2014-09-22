/**
 *
 *
 *
 *
 */

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exprts.getPostsAll = function(callback) {
  var sql = utils.getSQLContent('menuall');
  
  dbConnection.query(sql, function(err, rows) {
    callback(err, rows);
  });
};