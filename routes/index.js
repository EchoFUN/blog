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
var commentModel = require('../model/comment');
var config = require('../configs/config');

var router = express.Router();

// 获取页面上的通用数据
var getPageData = function(callback) {
  async.parallel([menuModel.getMenusAll, linkModel.getLinksAll, postModel.getArchives], callback);
};

// 按照分页的方式展示出所有的文章列表
router.get('/', function (req, res) {
  var page = parseInt(req.query.page, 10);
  page = (!isNaN(page)) ? page : 1

  // 获取当前页的所有文章总数
  var getCurrentPostCount = function(callback) {
    postModel.getPostCount(callback);
  };
  
  // 获取当页所有的文章的数据信息
  var getCurrentPosts = function(callback) {
    postModel.getPostsAll((page - 1) * PAGE_COUNT, PAGE_COUNT, callback);
  };
  
  var PAGE_COUNT = config.site.PAGE_COUNT;
  
  async.parallel([getPageData, getCurrentPosts, getCurrentPostCount], function(err , content) {
    if (err) {
      throw err;
    }
    
    // 获取页面上所有文章的评论数目
    var posts = content[1][0];
    var pids = [];
    for(var i = 0; i < posts.length; i++) {
      pids.push(posts[i].id);
    }
    commentModel.getCommentsCount(pids.join(', '), function(err, cmtsCount) {
      if (err) {
        throw err;
      }
      
      for(var i = 0; i < posts.length; i++) {
        for(var j = 0; j < cmtsCount.length; j++) {
          if (posts[i].id == cmtsCount[j].pid) {
            posts[i].cmtCount = cmtsCount[j].count;
          }
        }
      }
      res.render('index', {
        menus: content[0][0][0],
        links: content[0][1][0],
        posts: posts,
        
        // 分页相关内容
        postCount: content[2][0][0].count,
        currentPage: page,
        PAGE_COUNT: PAGE_COUNT
      });
    });  
  });
  
});

module.exports = router;











