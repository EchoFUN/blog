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
  async.parallel([menuModel.getMenusAll, linkModel.getLinksAll, postModel.getArchives, postModel.getRecentPosts], callback);
};

router.get('/', function (req, res) {
  var postId = req.query.pid;
  
  // 获取这个当前的文章的数据信息（评论标签等等）
  var getCurrentPost = function(callback) {
    postModel.getPostById(postId, callback);
  };
  
  var getCurretComments = function(callback) {
    commentModel.getCommentsById(postId, callback);
  };
  
  async.parallel([getPageData, getCurrentPost, getCurretComments], function(err , content) {
    if (err) {
      throw err;
    }
    
    res.render('post', {
      post: content[1][0][0],
      menus: content[0][0][0],
      links: content[0][1][0],
      rectPosts: content[0][3],
      archives: content[0][2],
      comments: content[2][0],
      url: req.url,
    });
  });
  
});

router.post('/message', function(req, res) {
  var persistQuery = req.body;
  persistQuery.date = new Date().getTime();
  persistQuery.approved = 0;
  
  var respond = {
    code: 0
  };
  
  // 首先获取上一条相同的评论
  commentModel.getlastComment(req.body.pid, req.body.author, req.body.comment, function(err, content) {
    if (err) {
      throw err;
    }
    
    if (content[0].count == 0) {
      commentModel.insertMessage(persistQuery, function(err, content) {
        if (err) {
          throw err;
        }
        res.end(JSON.stringify(respond));
      });
    } else {
      respond.code = 1;
      respond.msg = '不要重复提交评论~';
      res.end(JSON.stringify(respond));
    }
  });
  
  
  
});

module.exports = router;























