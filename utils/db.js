/**
 * 
 * 数据库链接配置，包括后续可以给mysql配置连接池结构
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-22 星期一
 */

var mysql = require('mysql'), dbConfig = require('../configs/db');

var dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect(function(err) {
  if (err) {
    throw err;
  }
});

exports.getConnection = function() {
  return dbConnection;
};