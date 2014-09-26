require.config({
  baseUrl : '/javascripts'
});

require(['lib/jquery', 'module/general', 'module/interface', 'util/request'], function($, general, url, request) {
  
  var jQrespond = $('#respond-form');
  
  // 在提交订单的时候触发的事件
  var submitHandler = function(evt) {
    evt.preventDefault();
    
    // 表单的验证
    var author = $.trim(this.author.value), 
        mail = $.trim(this.mail.value),
        webside = $.trim(this.webside.value),
        comment = $.trim(this.comment.value);
    
    if(author.length == 0 || mail.length == 0 || webside.length == 0 || comment.length == 0) {
      return;
    }
    
    request.post(url.addComments, {
      
    }, function(ret) {
      
    });
  };
  
  
  var bindEvt = function() {
    jQrespond.submit(submitHandler);
  };
  bindEvt();
  
});