/**
 * 
 *
 *
 */

var mysql = require('mysql'), dbConfig = require('../configs/db');

// 创建并且建立一个连接（后续可以配置成连接池）
var dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect(function(err) {
  if (err) {
    throw err;
  }
});

exports.getConnection = function() {
  return dbConnection;
};