/**
 *
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-20 星期六
 *
 */

var express = require('express');
var async = require('async');

var siteModel = require('../model/site');

var router = express.Router();

router.get('/', function (req, res) {

  siteModel.getMenusAll(function () {
    res.render('index');
  })

});

module.exports = router;