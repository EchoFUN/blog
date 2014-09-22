/**
 *
 *
 * @author Kai.XU(xukai.ken@gmail.com)
 * @date 2014-09-22 星期一
 *
 */

define(['lib/jquery'], function ($) {
  
  // 顶部闪烁的光标样式
  var jQflash = $('#flashLite')
  setInterval(function () {
    var content = $.trim(jQflash.text());
    if (content) {
      jQflash.text('');
    } else {
      jQflash.text('_');
    }
  }, 500);

});