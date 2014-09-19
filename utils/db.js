/**
 * 
 *
 *
 */

var mysql = require('mysql'), dbConfig = require('../config/db');

var dbConntionPool;




exports.getConnection = function() {
  
  // 创建连接池链接
  if (dbConntionPool) {
    return this;
  } else {
    dbConntionPool = mysql.createPool(dbConfig);
  }
  
  
};