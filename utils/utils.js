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