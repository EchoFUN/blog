/**
 * 调整freemaker的配置文件，修改静态文件的配置。
 *
 * Copyright 2014 (c) SanKuai, Inc.
 *
 * @author xukai@meituan.com
 * @date 2014.01.29
 */

'use strict';

var config = require('../config.js'), storage = require('../storage.js'), utils = require('../utils.js');
var fs = require('fs');

var freemarkerConfig = config.freemarkerConfig, version = storage.get('version');

var addVersion = function(content) {
  var versionExpress = /(\/static)(\/\d+)?/ig;
  return content.replace(versionExpress, function($0, $1) {
    utils.log('将静态地址替换为' + $1 + '/' + version);
    return '/' + version;
  });
};

exports.run = function(callback) {
  utils.log('开始修改目录版本号！');
  fs.readFile(freemarkerConfig, function(err, result) {
    if (err) {
      callback(err);
    }

    var addedContent = addVersion(result.toString());
    fs.writeFile(freemarkerConfig, addedContent, callback);
    utils.log('修改目录版本号完成！\n');
  });
};
