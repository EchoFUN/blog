define(['lib/jquery', 'widget/Dialog'], function($, Dialog) {
  'use strict';

  var convert = function(obj) {
    return Array.prototype.slice.call(obj);
  };

  return {
    
    post : function() {
      return $.post.apply(this, convert(arguments)).error(function() {
        new Dialog({
          content: '哎呀~ 网络出问题了？'
        });
      });
    },

    get : function() {
      return $.get.apply(this, convert(arguments));
    },

    ajax : function() {
      return $.ajax.apply(this, convert(arguments));
    }
  };
});
