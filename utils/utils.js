/**
 *
 *
 *
 *
 *
 */

var fs = require('fs');
var crypto = require('crypto');

exports.getMD5 = function(str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

// 获取某个sql内容
module.exports.getSQLContent = function(name) {
  return fs.readFileSync(__dirname + '/../sql/select_' + name + '.sql').toString();
};

// 获取插入的sql内容
module.exports.getInsertSQLContent = function(name) {
  return fs.readFileSync(__dirname + '/../sql/insert_' + name + '.sql').toString();
};

/**
 * 获取整个字符的长度
 * 
 */
exports.countChars = function(str, len, flag) {
  if (str) {
    var strLen = str.replace(/[\u4e00-\u9fa5\s]/g, '**').length, newStr = [], totalCount = 0;
 
    if (strLen <= len) {
      return str;
    } else {
      for (var i = 0; i < strLen; i++) {
        var nowValue = str.charAt(i);
        if (/[^\x00-\xff]/.test(nowValue)) {
          totalCount += 2; 
        } else {
          totalCount += 1;
        }
        newStr.push(nowValue);
        if (totalCount >= len) {
          break;
        }
      }
      if (flag) {
        return newStr.join('');
      } else {
        return newStr.join('') + '...';
      }
    }
  } else {
    return '';
  }
};