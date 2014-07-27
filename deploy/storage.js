/**
 * 数据通信模块，负责各个模块之间的临时数据的通信。
 * 
 * 0.0.1 2014.01.20 初始化
 * 
 * Copyright 2012 (c) SanKuai, Inc
 * 
 * @author xukai@meituan.com
 * @date 2014.01.20
 */

'use strict';

var data = {};

exports.set = function(key, value) {
  data[key] = value;
};

exports.get = function(key) {
  return data[key];
};