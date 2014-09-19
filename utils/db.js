/**
 * 
 *
 *
 */

var mysql = require('mysql'), dbConfig = require('../configs/db');

// var dbConntionPool;

var dbConnection = mysql.createConnection(dbConfig);



exports.getConnection = function() {
  
  return dbConnection;
  
  // 创建连接池链接
  /* if (dbConntionPool) {
    return this;
  } else {
    dbConntionPool = mysql.createPool(dbConfig);
  }*/
  
  
}; 