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

var menuModel = require('../model/menu');
var userModel = require('../model/user');
var utils = require('../utils/utils');


router.get('/login', function (req, resp) {

  if (req.session.user) {
    resp.redirect('/');
  } else {

    menuModel.getMenusAll(function (err, menus) {

      resp.render('login', {
        menus: menus,
        url: req.url
      });

    });

  }
});

router.post('/login', function (req, resp) {
  var user = req.body.user, password = req.body.password;

  userModel.checkUser(user, utils.getMD5(password), function (err, exist) {
    if (exist[0].exist === 0) {
      resp.redirect('/user/login');
    } else {
      req.session.user = {
        id: exist.id,
        name: user
      };
      resp.redirect('/');
    }
  });


});

module.exports = router;