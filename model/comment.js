/**
 *
 *
 *
 */
var ejs = require('ejs');

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.insertMessage = function(data, callback) {
  var sqlContent = ejs.render(utils.getInsertSQLContent('comment'), data);

  dbConnection.query(sqlContent, callback);
};

// 根据文章的Id，拉取出所有的评论信息
module.exports.getCommentsById = function(pid, callback) {
  var sqlContent = ejs.render(utils.getSQLContent('commentsbyid'), {
    pid: pid
  });
  
  dbConnection.query(sqlContent, callback);
};