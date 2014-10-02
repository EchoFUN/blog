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

    if (author.length == 0 || mail.length == 0 || comment.length == 0) {
      new Dialog({
        content: '请完善资料哦，亲~'
      });
      return;
    }
    
    var self = this;
    request.post(url.addComments, jQrespond.serialize() + '&pid=' + jQrespond.data('pid'), null,'json').done(function (ret) {
      if (ret.code == 0) {
        new Dialog({
          content: '评论成功！需要管理员审核才能显示！'
        });
        
        self.mail.value = '';
        self.author.value = '';
        self.webside.value = '';
        self.comment.value = '';
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