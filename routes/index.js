/**
 * 
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-20 星期六
 * 
 */
 
var express = require('express');
var async = require('async');

var router = express.Router();

// 获取链接
var dbConnection = require('../utils/db').getConnection();

router.get('/', function(req, res) {
  
  var query = dbConnection.query('select * from menu;', function(err, rows) {
    res.render('index');  
  });
  
});

module.exports = router;
