/**
 * 用户登录的相关信息统计
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2015-03-22 星期日
 *
 */

var express = require('express');
var async = require('async');
var router = express.Router();

var menuModel = require('../model/menu'), userModel = require('../model/user'), commentModel = require('../model/comment');
var utils = require('../utils/utils');

router.get('/login', function (req, resp) {
  if (req.session.user) {
    resp.redirect('/user/status');
  } else {
    menuModel.getMenusAll(function (err, menus) {
      resp.render('user/login', {
        menus: menus,
        url: req.url
      });
    });
  }
});

router.post('/login', function (req, resp) {
  var user = req.body.user, password = req.body.password;

  userModel.checkUser(user, utils.getMD5(password), function (err, exist) {
    if (exist.length === 0) {
      resp.redirect('/user/login');
    } else {
      req.session.user = {
        id: exist.id,
        name: user
      };
      resp.redirect('/user/status');
    }
  });
});

router.get('/status', function(req, resp) {
  if (req.session.user) {
    commentModel.getUncomment(function(err, count) {
      resp.end('You are logined as ' + req.session.user.name + '. ' + count[0].count + ' cmts are unapproved.');
    })
  } else {
    resp.redirect('/user/login');
  }
});

module.exports = router;