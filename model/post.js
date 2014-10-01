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
// 结构化当前的日期格式
var structArchives = function(archivesData) {
  var originalData = [];
  for(var i = 0; i < archivesData.length; i++) {
    originalData.push(new Date(+archivesData[i].date));
  }
  
  var archives = [];
  for (var i = 0; i < originalData.length; i++) {
    var currentDate = originalData[i];
    var month = currentDate.getMonth() + 1 + '';
    if (month.length == 1) {
      month = '0' + month;
    }
    var date = currentDate.getFullYear() + '年' + month + '月';
    var hasDate = false;
    for (var j = 0; j < archives.length; j++) {
      if (archives[j].summary == date) {
        hasDate = true;
        break;
      }
    }
    if (!hasDate) {
      archives.push({
        full : currentDate,
        summary : date
      });
    }
  }
  return archives;
};
module.exports.getArchives = function(callback) {
  var sqlContent = utils.getSQLContent('archives');
  
  dbConnection.query(sqlContent, function(err, content) {
    callback(err, structArchives(content));
  });
};

// 获取最近的十篇文章的标题
module.exports.getRecentPosts = function(callback) {
  var sqlContent = utils.getSQLContent('recentposts');
  
  dbConnection.query(sqlContent, function(err, content) {
    for (var i in content) {
      var title = content[i].title;
      content[i].shortTitle = title && (utils.countChars(title, 36));
    }
    callback(err, content);
  });
};
















