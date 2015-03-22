/**
 * URL路径的映射文件，用于映射前端和路径之间的关系。
 * 
 * @author xukai.ken@gmail.com
 * @date 2014-07-27 星期日
 * 
 */

var index = require('./routes/index');
var post = require('./routes/post');
var user = require('./routes/user');

module.exports = function(app) {
  
  
  app.use('/', index);
  app.use('/post', post);
  
  app.use('/user', user);
  
};