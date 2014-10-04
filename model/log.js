/**
 *
 *
 *
 */
var ejs = require('ejs');

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.logger = function(vector, date, referer, ip, url, callback) {
  var sqlContent = ejs.render(utils.getInsertSQLContent('log'), {
    vector: vector,
    date: date,
    referer: referer,
    ip: ip,
    url: url
  });
  
  dbConnection.query(sqlContent, callback);
}