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
var linkModel = require('../model/link');
var postModel = require('../model/post');

var router = express.Router();

router.get('/', function (req, res) {

  async.parallel([menuModel.getMenusAll, linkModel.getLinksAll, postModel.getPostsAll], function(err, content) {
    if (err) {
      throw err;
    }
    
    res.render('index', {
      menus: content[0][0],
      links: content[1][0]
    });
  });
  
});

module.exports = router;