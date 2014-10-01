/**
 *
 * 对用户连接信息的查改和调整
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-23 星期二
 *
 */

var ejs = require('ejs');

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

// 获取所有的文章的信息
module.exports.getPostsAll = function (offset, count, callback) {
  var sqlContent = ejs.render(utils.getSQLContent('postall'), {
    start : offset,
    end : offset + count
  });

  dbConnection.query(sqlContent, callback);
};

// 获取某篇文章的具体内容
module.exports.getPostById = function (postId, callback) {
  var sqlContent = ejs.render(utils.getSQLContent('postbyid'), {
    postId : postId
  });

  dbConnection.query(sqlContent, callback);
};

// 获取所有的文章总数目
module.exports.getPostCount = function(callback) {
  var sqlContent = utils.getSQLContent('postcount');
  
  dbConnection.query(sqlContent, callback);
};

// 获取所有的归档的文章
module.exports.getArchives = function(callback) {
  callback();
};