/**
 *
 * 
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-24 星期三
 *
 */

var express = require('express');
var async = require('async');

var menuModel = require('../model/menu');
var linkModel = require('../model/link');
var postModel = require('../model/post');

var router = express.Router();

// 获取页面上的通用数据
var getPageData = function(callback) {
  async.parallel([menuModel.getMenusAll, linkModel.getLinksAll], callback);
};

router.get('/', function (req, res) {
  
  // 获取这个当前的文章的数据信息
  var getCurrentPost = function(callback) {
    var postId = req.query.pid;
    if (!postId) {
      callback();
    } else {
      postModel.getPostById(postId, callback);
    }
  };
  
  async.parallel([getPageData, getCurrentPost], function(err , content) {
    if (err) {
      throw err;
    }
    
    res.render('post', {
      menus: content[0][0][0],
      links: content[0][1][0],
      post: content[1][0][0]
    });
  });
  
});

module.exports = router;