/**
 *
 *
 *
 *
 *
 */

var fs = require('fs');

// 获取某个sql内容
module.exports.getSQLContent = function(name) {
  return fs.readFileSync(__dirname + '/../sql/select_' + name + '.sql').toString();
};

// 获取插入的sql内容
module.exports.getInsertSQLContent = function(name) {
  return fs.readFileSync(__dirname + '/../sql/insert_' + name + '.sql').toString();
};