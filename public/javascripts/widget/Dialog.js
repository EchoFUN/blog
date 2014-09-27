define(['lib/jquery', 'lib/mustache', 'tpl/tpl'], function($, mustache, tpl) {

  /**
   *
   * @param {Object} opts
   */
  var Dialog = function(opts) {
    var dopts = {
      top : undefined,
      left : undefined,
      autoHide : undefined,
      title : '提示',
      frameTPL : tpl.dialogTPL,
      content : '',
      showClose : true
    };

    opts = $.extend(dopts, opts);
    this.$opts = opts;
    this.$ready();
    this.$constructFrame();
    return this;
  };

  Dialog.prototype.$ready = function() {
    this.$dialogEl = document.createElement('div');
    this.$dialogEl.className = 'dialog';
  };

  Dialog.prototype.$constructFrame = function() {
    var opts = this.$opts;

    var dialogEl = $(this.$dialogEl);
    
    var frameHTML = mustache.render(opts.frameTPL, {
      title : opts.title,
      content:　opts.content
    });

    dialogEl.html(frameHTML);

    $(document.body).append(dialogEl);
    this.resetPos();

    // 获取footer部分
    this.$footerEl = dialogEl.find('.dialog-footer');

    // 设置关闭按钮
    var close = this.$closeEl = dialogEl.find('.close');
    var self = this;
    if (opts.showClose) {
      close.bind('click', function() {
        self.close();
      });
    } else {
      close.remove();
    }

    // 设置自动隐藏
    var ah = opts.autoHide;
    if (ah) {
      if ( typeof ah == 'number') {
        this.autoHide = window.setTimeout(function() {
          self.close();
        }, ah * 1000);
      }
    }
  };

  Dialog.prototype.setWidth = function() {
    return this;
  };

  Dialog.prototype.setContent = function() {
    return this;
  };

  Dialog.prototype.addButton = function() {
    var button = document.createElement('a');
    button.className = 'button';
    button.href = '#nogo';

    if ( typeof callback == 'function') {
      var self = this;
      button.bind('click', function() {
        callback.call(self);
      });
    }

    this.$footerEl.append(button);
    return this;
  };

  Dialog.prototype.resetPos = function() {
    var dialogEl = $(this.$dialogEl);

    var $diaW = dialogEl.css('width'), $diaH = dialogEl.css('height');

    var vp = $(window);
    var left = this.$opts.left || (vp.width() - parseInt($diaW, 10)) / 2, top = this.$opts.top || vp.scrollTop() + (vp.height() - parseInt($diaH, 10)) / 2;
    dialogEl.css({
      top : top - 20 + 'px',
      left : left + 'px'
    });
    return this;
  };

  Dialog.prototype.close = function() {
    $(this.$dialogEl).remove();
    if (this.autoHide) {
      clearTimeout(this.autoHide);
    }
  };
  
  return Dialog;
});
