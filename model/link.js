/**
 *
 * 对用户连接信息的查改和调整
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-23 星期二
 * 
 */

var utils = require('../utils/utils');
var dbConnection = require('../utils/db').getConnection();

module.exports.getLinksAll = function(callback) {
  dbConnection.query(utils.getSQLContent('linkall'), callback);
};