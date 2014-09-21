/**
 * 
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-20 星期六
 * 
 */
 

var express = require('express'); router = express.Router();

var dbConnection = require('../utils/db').getConnection();

router.get('/', function(req, res) {
  
  var query = dbConnection.query('select * from mytable;');
  query.on('result', function(row) {
    res.render('index');  
  });
});

module.exports = router;
