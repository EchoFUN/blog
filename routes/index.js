/**
 *
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-20 星期六
 *
 */

var express = require('express');
var async = require('async');

var menuModel = require('../model/menu');

var router = express.Router();

router.get('/', function (req, res) {

  async.parallel([menuModel.getMenusAll], function(err, content) {
    res.render('index', {
      menus: content[0][0]
    });
  });
  
});

module.exports = router;