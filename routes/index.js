/**
 * 
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-20 星期六
 * 
 */
 

var express = require('express'); router = express.Router();

var db = require('../utils/db');

router.get('/', function(req, res) {
  
  var dbConnection = db.getConnection();
  dbConnection.connect(function() {
    console.log('Get connected !');
    
    
    var query = dbConnection.query('SELECT * FROM MYTABLE;');
    query.on('result', function(row) {
      console.log(row);
    });

    dbConnection.end(); 
  });
  
  
  
  
  res.render('index');
});

module.exports = router;
