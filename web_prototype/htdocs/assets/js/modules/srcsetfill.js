



var Srcsetfill = function(el){
  this.init(el);
};

Srcsetfill.prototype = {
  init: function(el){
    var self = this;

    self.$els = $(el).find('img[data-srcset]');

    self.els = [];
    var eachEl;
    for(var i = 0, l = self.$els.length; i < l; i++){
      eachEl = new EachSrcsetfill(self.$els[i]);
      self.els.push(eachEl);
    }

    window.matchMedia('(max-width: 640px)').addListener(function(){self.changeSrc()},false );
  },

  changeSrc: function(){
    var self = this;

    $.each(self.els, function(i, e){
      e.setImage();
    });
  }
}

var EachSrcsetfill = function(el){
  this.$el = $(el);
  this.init();
};

EachSrcsetfill.prototype = {
  init: function(){
    var self = this;

    self.imgL = self.$el.attr('src');
    self.imgS = self.$el.attr('data-srcset');

    if(window.matchMedia('(max-width: 640px)').matches){
      self.$el.attr('src',self.imgS);
    }
  },

  setImage: function(){
    var self = this;

    if(window.matchMedia('(max-width: 640px)').matches){
      self.$el.attr('src',self.imgS);
    } else {
      self.$el.attr('src',self.imgL);
    }
  }
};


module.exports = Srcsetfill;
