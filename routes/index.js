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

    dbConnection.query('select * from mytable;', function(err, rows, fields) {
      if (err) 
        throw err;

      console.log('The solution is: ', rows[0].solution);
    });
  });
  
  
  
  res.render('index');
});

module.exports = router;
