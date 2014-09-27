/**
 *
 *
 *
 */
var ejs = require('ejs');

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.insertMessage = function(data, callback) {
  dbConnection.query(utils.getInsertSQLContent('comment'), callback);
};

