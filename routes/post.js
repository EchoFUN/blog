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
var commentModel = require('../model/comment');

var router = express.Router();

// 获取页面上的通用数据
var getPageData = function(callback) {
  async.parallel([menuModel.getMenusAll, linkModel.getLinksAll], callback);
};

router.get('/', function (req, res) {
  var postId = req.query.pid;
  
  // 获取这个当前的文章的数据信息（评论标签等等）
  var getCurrentPost = function(callback) {
    if (!postId) {
      callback();
    } else {
      postModel.getPostById(postId, callback);
    }
  };
  
  var getCurretComments = function(callback) {
    if (!postId) {
      callback();
    } else {
      commentModel.getCommentsById(postId, callback);
    }
  };
  
  async.parallel([getPageData, getCurrentPost, getCurretComments], function(err , content) {
    if (err) {
      throw err;
    }
    
    res.render('post', {
      post: content[1][0][0],
      menus: content[0][0][0],
      links: content[0][1][0],
      comments: content[2][0]
    });
  });
  
});

router.post('/message', function(req, res) {
  var pid = req.body.pid, message = req.body.message, author = req.body.author, mail = req.body.mail, webside = req.body.webside;
  
  var persistQuery = req.body;
  persistQuery.date = new Date().getTime();
  persistQuery.approved = 0;
  
  commentModel.insertMessage(persistQuery, function(err, content) {
    if (err) {
      throw err;
    }
    
    var respond = {
      code: 0,
    };
    res.end(JSON.stringify(respond));
  });
  
});

module.exports = router;























