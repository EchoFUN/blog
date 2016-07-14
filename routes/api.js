/**
 * 
 * 
 * 
 * 
 * 
 * 
 */

const express = require('express'), thunkify = require('thunkify'), co = require('co');
const router = express.Router();

const modalPost = require('../model/post'), conf = require('../configs/config');

/**
 * 
 * 获取第一屏的所有的文章列表；
 * 
 * 
 * 
 * 
 */
const PAGE_COUNT = conf.site.PAGE_COUNT;
router.all('/', function (req, resp) {
  var page = parseInt(req.query.page, 10), page = (!isNaN(page)) ? page : 1

  var readPost = thunkify(modalPost.getPostsAll);
  var ret = {
    code: 1
  };
  co(function* () {

    // 获取文章列表的数据；
    var posts = yield readPost((page - 1) * PAGE_COUNT, PAGE_COUNT);
    ret.data = posts[0];
    resp.json(ret);
  });
});

module.exports = router;