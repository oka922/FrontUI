
var EqualHeights = function() {
  this.init();
};

EqualHeights.prototype = {

  init: function () {
    var self = this;

    self.$el = $('.js-equalHeights');
    self.winW = window.innerWidth ? window.innerWidth : $(window).width();
    self.pastWinW = null;

    self.addItemGroup();
    self.setItemHeight();
  },

  addItemGroup: function() {
  	var self = this
  		, groupName;

  	self.itemGroup = {};

    self.$el.each(function() {

      if ($(this).data('equalHeightsGroup')) {
        groupName = 'group-' + $(this).data('equalHeightsGroup');
      } else {
        groupName = 'offset-' + Math.floor($(this).offset().top);
      }

      if (!(groupName in self.itemGroup)) {
        self.itemGroup[groupName] = $([]);
      }

      self.itemGroup[groupName] = self.itemGroup[groupName].add(this);
    });
  },

  setItemHeight: function() {
  	var self = this;

  	$.each(self.itemGroup, function() {
      self.equalize(this);
    });

    self.checkItemHeight();
  },

  equalize: function($targets) {
  	var self = this
  		, highest = 0;

    $targets
      .height('auto')
      .each(function() {
        if ($(this).height() > highest) {
          highest = $(this).height();
        }
      });

    if (highest > 0) {
      $targets.height(highest);
    }
  },

  checkItemHeight: function() {
  	var self = this;

    self.addItemGroup();

    for(var i in self.itemGroup) {
      var maxHeightItem
        , minHeightItem;

      maxHeightItem = _.max(self.itemGroup[i], function (item) {
        return item.clientHeight;
      });

      minHeightItem = _.min(self.itemGroup[i], function (item) {
        return item.clientHeight;
      });

      if($(maxHeightItem).height() !== $(minHeightItem).height()) {
        self.setItemHeight();
        return;
      }
    }
  },

  onResize: function() {
  	var self = this;

  	self.winW = window.innerWidth ? window.innerWidth : $(window).width();

    if(self.pastWinW !== self.winW) {
      self.pastWinW = self.winW;
      self.setItemHeight();
    }
  }

};

module.exports = EqualHeights;
