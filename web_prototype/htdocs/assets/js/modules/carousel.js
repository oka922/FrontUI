// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.com/#x15.4.4.18
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function( callback, thisArg ) {
    var T, k;
    if ( this == null ) {
      throw new TypeError( " this is null or not defined" );
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if ( {}.toString.call(callback) != "[object Function]" ) {
      throw new TypeError( callback + " is not a function" );
    }
    if ( thisArg ) {
      T = thisArg;
    }
    k = 0;
    while( k < len ) {
      var kValue;
      if ( k in O ) {
        kValue = O[ k ];
        callback.call( T, kValue, k, O );
      }
      k++;
    }
  };
}

/* ============================================================================
 参考：
 * flipsnap.js
 *
 * @version  0.6.2
 * @url http://hokaccha.github.com/js-flipsnap/
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php

============================================================================ */

var Carousel = function(){
  this.init();
};

Carousel.prototype = {
  init: function(){
    var self = this;

    self.$el = $('.carousel');

    self.carousels = [];
    var eachTable;
    for(var i = 0, l = self.$el.length; i < l; i++){
      eachCarousel = new EachCarousel(self.$el[i]);
      self.carousels.push(eachCarousel);
    }
  },

  refresh: function(){
    var self = this;

    $.each(self.carousels, function(){
      eachCarousel.refresh();
    });
  }
};



var support = Carousel.support = {};
var gestureStart = false;

var DISTANCE_THRESHOLD = 5;
var ANGLE_THREHOLD = 45;

support.addEventListener = 'addEventListener' in window;

var eventTypes = ['touch', 'mouse'];
var events = {
  start: {
    touch: 'touchstart',
    mouse: 'mousedown'
  },
  move: {
    touch: 'touchmove',
    mouse: 'mousemove'
  },
  end: {
    touch: 'touchend',
    mouse: 'mouseup'
  }
};

if (support.addEventListener) {
  document.addEventListener('gesturestart', function() {
    gestureStart = true;
  });

  document.addEventListener('gestureend', function() {
    gestureStart = false;
  });
}




var EachCarousel = function(el){
  this.$el = $(el);
  this.init(el);
};

EachCarousel.prototype = {
  init: function(el){
    var self = this;

    self.$inner = self.$el.find('.carousel_inner');
    self.$content = self.$el.find('.carousel_content');
    self.$item = self.$content.find('.carousel_item');
    self._itemLength = self.$item.length;

    var opts = self.$el.data('carousel') || {};

    self.loop = opts.loop;
    self._pcShow = opts.pcShow;
    self._tabShow = opts.tabShow;
    self._spShow = opts.spShow;
    self.showDot = opts.showDot;
    self.showArrow = opts.showArrow;
    self._duration = opts.duration || 400;
    self.auto = opts.autoPlay || false;
    self._interval = opts.interval || 5000;
    self.showThumb = opts.showThumb;

    self.timer = false;

    self.currentPoint = 0;
    self.viewLength = (window.matchMedia('(max-width: 800px)').matches) ? (window.matchMedia('(max-width: 640px)').matches) ? self._spShow : self._tabShow : self._pcShow;

    self.setting();
    if(self.showDot) self.setDot();
    if(self.showArrow) self.setArrow();
    if(self.showThumb && self._pcShow == 1 && self._spShow == 1 && self._spShow == 1) self.setThumb();
    self.setStyle();
    self.eventHandler();
    //if(self.auto) self.autoPlay();
  },

  setting: function(){
    var self = this;

    self.currentY = 0;
    self.currentX = 0;
    self._newT = 0;
    self._newL = 0;

    self.flag = true;

    self.$wrap = $('<div>').addClass('carousel_wrap');

    self.$inner.wrap(self.$wrap)

    if(self.loop){
      self.$inner.append(self.$content.clone());
      self.$inner.prepend(self.$content.clone());
    }

    self.$inner.find('ul').eq(0).find('a').attr('tabindex','-1');
    self.$inner.find('ul').eq(-1).find('a').attr('tabindex','-1');

  },

  refresh: function(){
    var self = this;

    self._itemLength = self.$item.length;

    var _hideLength = 0;
    self.$content.find('.carousel_item').each(function(){
      if(!$(this).isVisible()){
        self._itemLength--;

      }
    });

    self.setStyle();

    //$(window).triggerHandler('heightRefresh');

    var _elH = (self.showDot) ? self.$el.find('.carousel_item').height() + self.$dots.innerHeight() : self.$el.find('.carousel_item').height();

    if(self._itemLength > 0 && self.$el.height() != _elH + 2){

      self.$el.velocity('stop').velocity({
        height: _elH
      }, function(){
        self.$el.css('height', 'auto');
      });
    } else if(self._itemLength == 0) {
      self.$el.velocity('stop').velocity({
        height: 0
      });
    }
  },

  setStyle: function(){
    var self = this;

    self.$el.find('.carousel_item').css('width','');
    self.$el.find('.carousel_content').removeAttr('style').css('width','');
    self.$inner.css('width', '');

    self._itemPl = parseInt(self.$item.css('padding-left'));
    self._itemPr = parseInt(self.$item.css('padding-right'));

    var _contentW = self.$el.find('.carousel_content').innerWidth();
    var _ulLength = self.$el.find('.carousel_content').length;

    var preViewLength = self.viewLength;

    self.viewLength = (window.matchMedia('(max-width: 800px)').matches && !window.matchMedia('print').matches) ? (window.matchMedia('(max-width: 640px)').matches) ? self._spShow : self._tabShow : self._pcShow;
    self._itemNum = (self._itemLength%self.viewLength > 0) ? self._itemLength + (self.viewLength - self._itemLength%self.viewLength) : self._itemLength;

    self.currentPoint = Math.ceil((self.currentPoint + 1)*preViewLength/self.viewLength - 1);

    self._itemW = Math.floor(_contentW/self.viewLength);

    self.initLeft = (self.loop) ? self._itemW*self._itemNum : 0;

    self.$el.find('.carousel_item').width(self._itemW - self._itemPl - self._itemPr);
    self.$el.find('.carousel_content').width(self._itemW*self._itemNum);

    self._distance = self._itemW*self.viewLength;

    self._maxPoint = Math.floor((self._itemLength - 1)/self.viewLength);

    var _tmpMaxScrollX = self._distance * self._maxPoint;
    self._maxScrollX = (_tmpMaxScrollX  > 0) ? _tmpMaxScrollX : 0;

    self.$inner.width(self._itemW*self._itemNum*_ulLength);
    self.$el.find('.carousel_content').css('float','left');
    self.$inner.css({
      left: - self.currentPoint * self._distance - self.initLeft
    });

    if(self.showDot) self.resizeDots();
    if(self.showArrow) self.resizeArrow();
    if(self.showThumb && self._pcShow == 1 && self._spShow == 1 && self._spShow == 1) self.resizeThumb();
  },

  setDot: function(){
    var self = this;

    self.$dots = $('<ul/>').addClass('carousel_dots');

    for(var i = 0, l = Math.floor(self._itemLength/self._spShow); i <= l; i++){
      self.$dots.append($('<li/>').append($('<a/>').attr('href','#').attr('tabindex','-1')));
    }

    self.$el.append(self.$dots);
    self.$dots.find('a').eq(0).addClass('is-current');

    self.$dots.find('li').hide();
    self.$dots.find('li:lt('+(self._maxPoint+1)+')').show();

    self.$dots.find('a').on('click', function(){
      if(!$(this).is('.is-current') && self.flag) {
        var _index = self.$dots.find('a').index(this);
        self.moveToPoint(_index);
      }
      return false;
    });
  },

  resizeDots: function(){
    var self = this;

    self.$dots.find('a').removeClass('is-current');
    self.$dots.find('a').eq(self.currentPoint).addClass('is-current');

    self.$dots.find('li').hide();

    if(self._maxPoint > 0){
      self.$dots.find('li:lt('+(self._maxPoint+1)+')').show();
    }
  },

  setArrow: function(){
    var self = this;

    self.$prev = $('<a />').attr('href','#').addClass('carousel_prev');
    self.$next = $('<a />').attr('href','#').addClass('carousel_next');

    self.$el.append(self.$prev);
    self.$el.append(self.$next);

    self.$prev.on('click', function(){
      if(self.flag){
        var point = self.currentPoint - 1;
        self.moveToPoint(point);
      }
      return false;
    });

    self.$next.on('click', function(){
      if(self.flag){
        var point = self.currentPoint + 1;
        self.moveToPoint(point);
      }
      return false;
    });
  },

  resizeArrow: function(){
    var self = this;

    if(self._maxPoint > 0){
        self.$prev.css('display','block').velocity('stop').velocity({
          scale: 1
        },300);
        self.$next.css('display','block').velocity('stop').velocity({
          scale: 1
        },300);
      if(self._maxPoint == self.currentPoint && !self.loop) {
        self.$next.hide();
      } else if(self.currentPoint == 0 && !self.loop) {
        self.$prev.hide();
      }
    } else {
      self.$prev.velocity('stop').velocity({
        scale: 0
      },function(){
        self.$prev.hide();
      },300);
      self.$next.velocity('stop').velocity({
        scale: 0
      },function(){
        self.$prev.hide();
      },300);
    }
  },

  setThumb: function(){
    var self = this;

    self.$thumbs = $('<ul/>').addClass('carousel_thumbs');

    for(var i = 0, l = self._itemLength; i < l; i++){
      var $img = $('<img>').attr('src',self.$item.eq(i).find('img').attr('src'));
      self.$thumbs.append($('<li/>').append($('<a/>').attr('href','#').attr('tabindex','-1').append($img)));
    }

    self.$el.append(self.$thumbs);

    self.$thumbs.find('a').on('click', function(){
      if(!$(this).is('.is-current') && self.flag) {
        var _index = self.$thumbs.find('a').index(this);
        self.moveToPoint(_index);
      }
      return false;
    });
  },

  resizeThumb: function(){
    var self = this;

    self.$thumbs.find('a').removeClass('is-current');
    self.$thumbs.find('a').eq(self.currentPoint).addClass('is-current');
  },

  eventHandler: function(){
    var self = this;

    eventTypes.forEach(function(type) {
      if (support.addEventListener) {
        self.$el[0].addEventListener(events.start[type], self, false);
      } else {
        self.$el[0].attachEvent('on'+events.start[type], self);
      }
    });

    $(window).on('load resize',function() {
      if(!$.browser.legacy){
        if (self.timer !== false) {
          clearTimeout(self.timer);
          self.timer = false;
        }

        self.setStyle();

        if(self.auto && self._maxPoint > 0) self.autoPlay();
      }
    });
    $(window).on('load',function() {
      if($.browser.legacy){
        if (self.timer !== false) {
          clearTimeout(self.timer);
          self.timer = false;
        }

        self.setStyle();

        if(self.auto && self._maxPoint > 0) self.autoPlay();
      }
    });
  },

  autoPlay: function(){
    var self = this;

    self.timer = setTimeout(function(){
      if(self.flag){
        var point = self.currentPoint + 1;
        self.moveToPoint(point);
      }
    }, self._interval);
  },

  handleEvent: function(event, type){
    var self = this;

    if(self._maxPoint > 0){
      switch (event.type){
        // start
        case events.start.touch: self.touchStartHandler(event, 'touch'); break;
        case events.start.mouse: self.touchStartHandler(event, 'mouse'); break;

        // move
        case events.move.touch: self.touchMoveHandler(event, 'touch'); break;
        case events.move.mouse: self.touchMoveHandler(event, 'mouse'); break;

        // end
        case events.end.touch: self.touchEndHandler(event, 'touch'); break;
        case events.end.mouse: self.touchEndHandler(event, 'mouse'); break;

        // click
        case 'click': self.clickHandler(event); break;
      }
    }
  },

  clickHandler: function(event) {
    var self = this;

    event.stopPropagation();
    event.preventDefault();
  },

  touchStartHandler: function(event, type){
    var self = this;

    if (self.scrolling || gestureStart) {
      return;
    }

    if (self.timer !== false) {
      clearTimeout(self.timer);
      self.timer = false;
    }

    self.$el[0].addEventListener(events.move[type], self, false);
    document.addEventListener(events.end[type], self, false);

    var tagName = event.target.tagName;
    if (type === 'mouse' && tagName !== 'SELECT' && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'BUTTON') {
      event.preventDefault();
    }

    self.currentX = parseInt(self.$inner.css('left'));
    self.scrolling = true;
    self.moveReadyX = false;
    self.startPageX = getPage(event, 'pageX');
    self.startPageY = getPage(event, 'pageY');
    self.basePageX = self.startPageX;
    self.basePageY = self.startPageY;
    self.directionX = 0;
    self.startTime = event.timeStamp;
  },

  touchMoveHandler: function(event, type){
    var self = this;

    if (!self.scrolling || gestureStart) {
      return;
    }

    var pageX = getPage(event, 'pageX');
    var pageY = getPage(event, 'pageY');
    var distX;
    var newX;

    if(self.moveReadyX) {
      event.preventDefault();

      distX = pageX - self.basePageX;
      self._newL = self.currentX + distX;

      if (!self.loop && self._newL >= 0 || !self.loop && self._newL < -self._itemW*(self._itemNum - 1)) {
        self._newL = Math.round(self.currentX + distX / 3);
      }

      self.directionX =
        distX === 0 ? self.directionX :
        distX > 0 ? -1 : 1;

      self.setPositionX();

    } else {
      var triangle = getTriangleSide(self.startPageX, self.startPageY, pageX, pageY);
      if (triangle.z > DISTANCE_THRESHOLD) {
        if (getAngle(triangle) > ANGLE_THREHOLD) {
          event.preventDefault();
          self.moveReadyX = true;
          self.$el[0].addEventListener('click', self, true);
        } else {
          self.scrolling = false;
        }
      }
    }
  },

  touchEndHandler: function(event, type){
    var self = this;

    self.$el[0].removeEventListener(events.move[type], self, false);
    document.removeEventListener(events.end[type], self, false);

    if (!self.scrolling) {
      return;
    }

    self.currentX = parseInt(self.$inner.css('left'));

    var newPoint = -(self.currentX + self.initLeft) / self._distance;

    newPoint =
      (self.directionX > 0) ? Math.ceil(newPoint) :
      (self.directionX < 0) ? Math.floor(newPoint) :
      Math.round(newPoint);

    self.touchAfter();

    if(self.moveReadyX){
      self.moveToPoint(newPoint);
    } else {
      self.moveReadyX = false;
      self.scrolling = false;
    }
  },

  touchAfter: function(){
    var self = this;

    setTimeout(function() {
      self.$el[0].removeEventListener('click', self, true);
    }, 200);
  },

  setPositionX: function(){
    var self = this;

    self.$inner.stop().css({
      left: self._newL
    });
  },

  moveToPoint: function(point, duration){
    var self = this;

    if (self.timer !== false) {
      clearTimeout(self.timer);
      self.timer = false;
    }

    self.flag = false;

    var _duration = (duration === undefined) ? self._duration : duration;
    var beforePoint = self.currentPoint;

    if (point === undefined) {
      point = self.currentPoint;
    }

    self.currentPoint = parseInt(point, 10);

    if (!self.loop && self.currentPoint > self._maxPoint){
      self.currentPoint = self._maxPoint;
      self.setNextPositionX(_duration/3);
    } else if (!self.loop && self.currentPoint < 0){
      self.currentPoint = 0;
      self.setNextPositionX(_duration/3);
    } else {
      self.setNextPositionX(_duration);
    }
  },

  setNextPositionX: function(duration){
    var self = this;

    var _duration = (duration === undefined) ? self._duration : duration;

    self._newL = - self.currentPoint * self._distance - self.initLeft;

    var point;

    if(self.showDot){
      if(self.currentPoint > self._maxPoint){
        point = 0;
      } else if(self.currentPoint < 0){
        point = self._maxPoint;
      } else {
        point = self.currentPoint;
      }

      self.$dots.find('a').removeClass('is-current');
      self.$dots.find('a').eq(point).addClass('is-current');
    }

    if(self.showThumb && self._pcShow == 1 && self._spShow == 1 && self._spShow == 1){
      if(self.currentPoint > self._maxPoint){
        point = 0;
      } else if(self.currentPoint < 0){
        point = self._maxPoint;
      } else {
        point = self.currentPoint;
      }

      self.$thumbs.find('a').removeClass('is-current');
      self.$thumbs.find('a').eq(point).addClass('is-current');
    }

    if(self.showArrow && self._maxPoint > 0){
      if(self._maxPoint == self.currentPoint && !self.loop) {
        self.$next.velocity('stop').velocity('fadeOut');
        if(self.$prev.css('display') == 'none') self.$prev.velocity('stop').velocity('fadeIn');
      } else if(self.currentPoint == 0 && !self.loop) {
        self.$prev.velocity('stop').velocity('fadeOut');
        if(self.$next.css('display') == 'none') self.$next.velocity('stop').velocity('fadeIn');
      } else {
        if(self.$next.css('display') == 'none') self.$next.velocity('stop').velocity('fadeIn');
        if(self.$prev.css('display') == 'none') self.$prev.velocity('stop').velocity('fadeIn');

      }
    }

    self.$inner.css('pointer-events','none').velocity({
      left: self._newL
    },_duration, function(){
      self.moveReadyX = false;
      self.scrolling = false;
      self.flag = true;

      $(this).css('pointer-events','auto');

      if(self.currentPoint > self._maxPoint){
        self._newL = -self.initLeft;
        self.currentPoint = 0;
        self.$inner.css({
          left: self._newL
        });
      } else if(self.currentPoint < 0){
        self._newL = - self._maxPoint * self._distance - self.initLeft;
        self.currentPoint = self._maxPoint;
        self.$inner.css({
          left: self._newL
        });
      }

      if(self.auto && self._maxPoint > 0) self.autoPlay();
    });
  }
};


function getPage(event, page) {
  return event.changedTouches ? event.changedTouches[0][page] : event[page];
}

function getTriangleSide(x1, y1, x2, y2) {
  var x = x1 - x2;
  var y = y1 - y2;
  var z = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));

  return {
    x: x,
    y: y,
    z: z
  };
}

function getAngle(triangle) {
  var cos = Math.abs(triangle.y) / triangle.z;
  var radina = Math.acos(cos);

  return 180 / (Math.PI / radina);
}


module.exports = Carousel;
