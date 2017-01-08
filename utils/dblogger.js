/**
 * 
 * 对访客进行日志的区分记录，记录内容包括ip，referer，
 * @date 2014-10-04 星期六
 * 
 */

var _ = require('underscore');

var modelLog = require('../model/log');

module.exports = function() {

  return function(req, res, next) {
    var acceptStr = req.get('accept');
    if (acceptStr && acceptStr.indexOf('text/html') != -1) {

      //  获取需要的参数
      var vector = Number(req.query.f);
      if(!_.isNumber(vector)) {
        vector = 0;
      }
      var referer = req.get('referer') || '';
      var date = new Date();
      var utc = date.getTime() + date.getTimezoneOffset() * 60000;
      var ip = req.ip;
      var url = req.url;
      
      modelLog.logger(vector, utc, '', ip, url, function(err, contnt) {
        if (err) {
          throw err;
        }
        
        next();
      });
    } else {
      next();
    }
  };
};