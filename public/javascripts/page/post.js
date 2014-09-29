require.config({
  baseUrl: '/javascripts'
});

require(['lib/jquery', 'module/general', 'module/interface', 'util/request', 'widget/Dialog'], function ($, general, url, request, Dialog) {

  var jQrespond = $('#respond-form');

  // 在提交订单的时候触发的事件
  var submitHandler = function (evt) {
    evt.preventDefault();

    // 表单的验证
    var author = $.trim(this.author.value),
        mail = $.trim(this.mail.value),
        webside = $.trim(this.webside.value),
        comment = $.trim(this.comment.value);

    if (author.length == 0 || mail.length == 0 || webside.length == 0 || comment.length == 0) {
      new Dialog({
        content: '请完善资料哦，亲~'
      });
      return;
    }

    request.post(url.addComments, jQrespond.serialize() + '&pid=' + jQrespond.data('pid')).success(function (ret) {
      if (ret.cdoe == 0) {
        new Dialog({
          content: '评论成功！需要管理员审核才能显示！'
        });
      } else {
        new Dialog({
          content: ret.msg
        });
      }
    });
  };


  var bindEvt = function () {
    jQrespond.submit(submitHandler);
  };
  bindEvt();

});