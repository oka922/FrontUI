




var Tel = function(){
  this.init();
};

Tel.prototype = {
  init: function(){
    var self = this;

    self.$tel = $('a[href^="tel:"]');

    if(!$.browser.sp){
      self.$tel.replaceWith(self.$tel.html());
    }
  }
};


module.exports = Tel;
