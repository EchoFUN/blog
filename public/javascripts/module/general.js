/**
 *
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-22 星期一
 *
 */

define(['lib/jquery'], function ($) {
  'use strict';

  var jQwindow = $(window), jQnavigator = $('#navigator'), jQscrolltop = $('#scrolltop'), jQheader = $('#header');

  var navigatorTop = jQnavigator.offset().top;
  var scrollEvent = function (evt) {
    var self = $(this);

    if (self.scrollTop() < navigatorTop) {
      jQnavigator.css('position', 'static');
      jQheader.css('height', '70');
      jQscrolltop.hide();
    } else {
      jQnavigator.css('position', 'fixed');
      jQheader.css('height', '102');
      jQscrolltop.show();
    }
  };

  // 顶部闪烁的光标样式
  var jQflash = $('#flashLite');
  setInterval(function () {
    (jQflash.text()) ? jQflash.text('') : jQflash.text('_');
  }, 500);

  // 事件的绑定
  var bindEvents = function () {
    jQwindow.scroll(scrollEvent);
  };
  bindEvents();
});