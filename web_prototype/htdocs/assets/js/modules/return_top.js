
var ReturnTop = function() {
  this.init();
};

ReturnTop.prototype = {

  init: function () {
    var self = this;

    self.$el = $('#js-returnTop');
    self.$footer = $('#js-footer');
    self.$win = $(window);
    self.scrollTop = self.$win.scrollTop();
  	self.scrollBottom = self.scrollTop + self.winH;

    self.winH = window.innerHeight ? window.innerHeight : $(window).height();
  },

  onScroll: function() {
  	var self = this;

  	self.scrollTop = self.$win.scrollTop();
  	self.scrollBottom = self.scrollTop + self.winH;

  	if((self.winH / 2) < self.scrollTop) {
  		self.showItem();
  	} else {
  		self.hideItem();
  	}
  },

  showItem: function() {
  	var self = this;

  	if(self.isShow) return;
  	self.isShow = true;

  	self.$el
	  	.stop(true, true)
	  	.css('display', 'block')
	  	.velocity({
	  		opacity: 1
	  	}, 500, function() {
	  		self.$el.addClass('is-show');
	  	});
  },

  hideItem: function() {
  	var self = this;

  	if(!self.isShow) return;
  	self.isShow = false;

  	self.$el
  		.stop(true, true)
  		.velocity({
	  		opacity: 0
	  	}, 500, function() {
	  		self.$el.removeClass('is-show');
	  		$(this).css('display', 'none');
	  	});
  }
};

module.exports = ReturnTop;
