
require.config({
  baseUrl : '/javascripts'
});

require(['lib/jquery', 'module/general'], function() {
  
  var jQrespond = $('#respond-form');
  
  // 在提交订单的时候触发的事件
  var submitHandler = function(evt) {
    evt.preventDefault();
  };
  
  
  var bindEvt = function() {
    jQrespond.submit(submitHandler);
  };
  bindEvt();
  
});