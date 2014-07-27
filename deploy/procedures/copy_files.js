/**
 * 移动文件到指定的版本目录。
 * 
 * Copyright 2012 (c) SanKuai, Inc
 * 
 * @author xukai@meituan.com
 * @date 2014.01.17
 */

'use strict';

var config = require('../config.js'), ncp = require('ncp'), async = require('async'), fs = require('fs'), utils = require('../utils.js'), storage = require('../storage.js');

// 最新版本号
var distVersion = config.version ? '' : Math.round(new Date().getTime() / 1000);
var distFolder = config.basePath + '/' + distVersion;
storage.set('distfolder', distFolder);

var createDist = function(callback) {
  utils.log('创建目录' + distFolder);
  fs.mkdir(distFolder, callback);
};
var createCopy = function(callback) {
  utils.log('复制目录' + config.staticFolder + '到目标目录' + distFolder);
  ncp(config.staticFolder, distFolder, callback);
};

exports.run = function(callback) {
  utils.log('开始创建目录');
  async.series([ createDist, createCopy ], function(err, results) {
    utils.log('目录创建完成！\n');
    callback(err, results);
  });
};