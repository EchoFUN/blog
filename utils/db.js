/**
 * 
 *
 *
 */

var mysql = require('mysql'), dbConfig = require('../configs/db');

// var dbConntionPool;

var dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect();

exports = dbConnection;
