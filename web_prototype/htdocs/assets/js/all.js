(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @fileOverview Common functions.
 */

(function(exports, $, _) {

  "use strict";

  var Header = require('./modules/header')
  	, EqualHeights = require('./modules/equal_heights')
  	, ReturnTop = require('./modules/return_top')
  	, Browser = require('./modules/browser')
  	, Utility = require('./modules/utility')
    , Carousel = require('./modules/carousel')
    , Srcsetfill = require('./modules/srcsetfill')
    , Divination = require('./modules/divination')
    , Tel = require('./modules/tel')
    , GoogleMap = require('./modules/google_map');

  /**
   * @module Common.
   * @LEON.
   */
  var Common = {

    /**
     * Render.
     */
    render: function() {
    	var self = this;

    	self.winH = window.innerHeight ? window.innerHeight : $(window).height();
      self.winW = window.innerWidth ? window.innerWidth : $(window).width();
      self.pastWinW = self.winW;

      self.$body = $('body');

      Browser();
    	Utility();

      if($.browser.ie8) {
        self.$body.addClass('is-ie8');
      }

      self.header = new Header();
      self.carousel = new Carousel();
      self.srcsetfill = new Srcsetfill('.carousel');
      self.divination = new Divination();
      self.tel = new Tel();
      self.googleMap = new GoogleMap();

      self.setUpSmoothScroll();
      self.setScreenWidthDecision();
      self.setUpSvgFallback();
      self.setUpCustomSelect();

      if($.browser.ie8) {
        self.containerResize = self.setUpContainerResizingForLegacy();
        self.containerResize.initialize();
      }

      self.equalHeights = new EqualHeights();
      self.returnTop = new ReturnTop();

      $(window).on('resize', _.throttle(function() {
        self.onResize();
      }, 500));

      $(window).on('scroll', _.throttle(function() {
        self.onScroll();
      }, 100));

      return this;
    },

    /**
     * On load.
     */
    onLoad: function() {
    	var self = this;

    	self.equalHeights.onResize();
      self.returnTop.onScroll();

      return this;
    },

    onResize: function() {
    	var self = this;

      self.winH = window.innerHeight ? window.innerHeight : $(window).height();
      self.winW = window.innerWidth ? window.innerWidth : $(window).width();

      if($.browser.pc || ($.browser.sp && self.pastWinW !== self.winW)) {
        self.header.scrollingDecision();
        $('.js-select-box').trigger('render');
      }

      self.setScreenWidthDecision();

      if($.browser.ie8) {
        self.containerResize.resize();
      }

      self.equalHeights.onResize();

      self.pastWinW = self.winW;

      return this;
    },

    onScroll: function() {
    	var self = this;

      self.returnTop.onScroll();

      return this;
    },

    setUpContainerResizingForLegacy: function() {
      var ASIDE_W = 340
        , $content
        , $mainContainer
        , contentW
        , mainContainerW;

      var setWidth = function() {
        contentW = $content.width();
        mainContainerW = contentW - ASIDE_W;
        $mainContainer.width(mainContainerW);
      };

      var initialize = function() {
        $content = $('#js-content');
        $mainContainer = $('#js-container-main');
        setWidth();
      };

      return {
        resize: setWidth,
        initialize: initialize
      };
    },

    setUpSmoothScroll: function() {

    	$('a[href^="#"]').smoothScroll({
        easing: 'easeInOutQuad',
        adjustValue: 0
      });
    },

    setScreenWidthDecision: function() {
      var self = this
        , bodyClass = self.$body.attr('class') || ''
        , currentClass = String(bodyClass.match(/\bis-(sp|tablet|pc)/g))
        , nextClass = (window.matchMedia('(max-width: 800px)').matches) ? (window.matchMedia('(max-width: 640px)').matches) ? 'is-sp' : 'is-tablet' : 'is-pc';

      if(currentClass === nextClass) return;

      self.$body.removeClass(function(index, className) {
        return (className.match(/\bis-(sp|tablet|pc)/g) || []).join(' ');
      });

      $('.js-select-box').trigger('render');

      self.$body.addClass(nextClass);

      if(nextClass === 'is-pc') {
        self.header.resetStateNavigation();
      }
    },

    setUpSvgFallback: function() {
      if (!Modernizr.svg){
        $('img').each(function() {
          $(this).attr('src', $(this).attr('src').replace(/\.svg/gi,'.png'));
        });
      }
    },

    setUpCustomSelect: function() {
      $('.js-select-box').customSelect();
    }
  };

  /* DOMContentLoaded. */
  $(document).on('ready', _.bind(Common.render, Common));

  /* Window on loaded. */
  $(window).on('load', _.bind(Common.onLoad, Common));

}(
  window,
  window.jQuery,
  window._
));

},{"./modules/browser":2,"./modules/carousel":3,"./modules/divination":4,"./modules/equal_heights":5,"./modules/google_map":6,"./modules/header":7,"./modules/return_top":8,"./modules/srcsetfill":9,"./modules/tel":10,"./modules/utility":11}],2:[function(require,module,exports){




module.exports = function(){
  if(!$.browser)$.browser = {};
  $.browser.ua = navigator.userAgent.toLowerCase();
  $.browser.ie = /msie|trident/.test($.browser.ua);
  $.browser.ie6 = /msie\s6\./.test($.browser.ua);
  $.browser.ie7 = /msie\s7\./.test($.browser.ua);
  $.browser.ie8 = /msie\s8\./.test($.browser.ua);
  $.browser.ie9 = /msie\s9\./.test($.browser.ua);
  $.browser.ie10 = /msie\s10\./.test($.browser.ua);
  $.browser.opera = /opr/.test($.browser.ua);
  $.browser.firefox = /firefox/.test($.browser.ua);
  if($.browser.opera){
    $.browser.chrome = false;
    $.browser.safari = false;
  } else {
    $.browser.chrome = /chrome/.test($.browser.ua);

    if($.browser.chrome){
      $.browser.safari = false;
    } else {
      $.browser.chrome = false;
      $.browser.safari = /safari/.test($.browser.ua);
    }
  }
  $.browser.prest = /opera/.test($.browser.ua);
  if($.browser.ie){
    $.browser.legacy = /msie\s6\.|msie\s7\.|msie\s8\./.test($.browser.ua);
  } else {
    $.browser.legacy = false;
  }
  $.browser.anim = !/msie\s6\.|msie\s7\.|msie\s8\.|msie\s9\./.test($.browser.ua);


  $.browser.android = /android/.test($.browser.ua);
  $.browser.iphone = /iphone/.test($.browser.ua);
  $.browser.ipod = /ipod/.test($.browser.ua);
  $.browser.ipad = /ipad/.test($.browser.ua);
  $.browser.ios = /iphone|ipod|ipad/.test($.browser.ua);
  if($.browser.android){
    $.browser.sp = /mobile/.test($.browser.ua);
  } else {
    $.browser.sp = /iphone|ipod|blackberry/.test($.browser.ua);
  }
  if($.browser.android){
      $.browser.tablet = !/mobile/.test($.browser.ua);
  }else{
      $.browser.tablet = /ipad/.test($.browser.ua);
  }
  if($.browser.android){
    $.browser.version = parseFloat($.browser.ua.slice($.browser.ua.indexOf('android')+8));
  }
  if($.browser.sp || $.browser.tablet){
    $.browser.pc = false;
  } else {
    $.browser.pc = true;
  }

  $.browser.push = (window.history && window.history.pushState) ? true : false;
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){

var Divination = function() {
  this.init();
};

Divination.prototype = {

  init: function () {
    var self = this;

    self.$el = $('#js-divination');
    self.$select = $('#js-divination-select');
    self.$result = $('#js-divination-result');
    self.$submit = $('#js-divination-submit');
    self.$resultLi = self.$result.children('li');

    self.hasAstrologyVal = self.getFromLocalStorage() ? true : false;

    if(self.hasAstrologyVal) {
      var years = self.getFromLocalStorage();

      self.astrologyVal = self.getAstrology(years);
      self.setDefaultVal(years);
      self.showDivinationResult();
    }

    self.events();
  },

  events: function() {
    var self = this;

    self.$submit.on('click', function() {
      var birthYears = self.$select.val();
      self.astrologyVal = self.getAstrology(birthYears);
      self.setToLocalStorage(birthYears);
      self.showDivinationResult();

      return false;
    });
  },

  setDefaultVal: function(years) {
    var self = this;
    self.$select.val(years);
  },

  getAstrology: function(years) {
    var self = this
      , BASIC_NUMBER = 11
      , birthYearsArr = years.split('')
      , digitsArr = []
      , firstAddDigitsVal = 0
      , secondAddDigitsVal = 0
      , astrologyResult = 0;

    for (var i = 0; i < birthYearsArr.length; i++) {
      firstAddDigitsVal = firstAddDigitsVal + Number(birthYearsArr[i]);
    };

    if(firstAddDigitsVal === 10) {
      secondAddDigitsVal = 10;
    } else {
      digitsArr = String(firstAddDigitsVal).split('');

      for (var i = 0; i < digitsArr.length; i++) {
        secondAddDigitsVal = secondAddDigitsVal + Number(digitsArr[i]);
      };
    }

    astrologyResult = BASIC_NUMBER - secondAddDigitsVal;

    return astrologyResult;
  },

  setToLocalStorage: function(years) {
    localStorage.setItem("leonBirthYears", years);
  },

  getFromLocalStorage: function() {
    return localStorage.getItem("leonBirthYears");
  },

  showDivinationResult: function() {
    var self = this
      , $showItem = self.$resultLi.eq(self.astrologyVal - 1)
      , nextH = $showItem.outerHeight() || 0;

    self.$resultLi.fadeOut('200');

    self.$result
      .velocity({
        height: nextH
      }, 500, 'easeOutQuart', function() {
        $showItem.fadeIn('250');
      });
  }

};

module.exports = Divination;

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){
var GoogleMap = function(){
  this.init();
};

GoogleMap.prototype = {
	init: function(){
		var self = this;
		$('.google-map').each(function() {
			self.renderMap($(this));
		});
	},
	renderMap: function($el) {
		var self = this;
		var $markers = $el.find('.marker');
		var zoom = parseInt( $el.attr('data-zoom') );
		if( !zoom ) {
			alert("data-zoomの値が不正です");
			retrun;
		}
		var args = {
			zoom : zoom,
			center : new google.maps.LatLng(0, 0),
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			draggable: false,
			// https://snazzymaps.com/style/15/subtle-grayscale
			styles : [ {
				"featureType" : "landscape",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 65
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "poi",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 51
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "road.highway",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "road.arterial",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 30
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "road.local",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"lightness" : 40
				}, {
					"visibility" : "on"
				} ]
			}, {
				"featureType" : "transit",
				"stylers" : [ {
					"saturation" : -100
				}, {
					"visibility" : "simplified"
				} ]
			}, {
				"featureType" : "administrative.province",
				"stylers" : [ {
					"visibility" : "off"
				} ]
			}, {
				"featureType" : "water",
				"elementType" : "labels",
				"stylers" : [ {
					"visibility" : "on"
				}, {
					"lightness" : -25
				}, {
					"saturation" : -100
				} ]
			}, {
				"featureType" : "water",
				"elementType" : "geometry",
				"stylers" : [ {
					"hue" : "#ffff00"
				}, {
					"lightness" : -25
				}, {
					"saturation" : -97
				} ]
			} ]
		};
		var map = new google.maps.Map($el[0], args);
		map.markers = [];
		$markers.each(function() {
			self.addMarker($(this), map);
		});
		self.centerMap(map);
	},
	addMarker: function($marker, map) {
		var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		var marker = new google.maps.Marker({
			position : latlng,
			map : map,
			icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjQxQjZENDc0RkJEMTFFNUI0RDNFRUZCNjE2MDYzNTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjQxQjZENDg0RkJEMTFFNUI0RDNFRUZCNjE2MDYzNTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QzFEOTU1RTRGQjcxMUU1QjREM0VFRkI2MTYwNjM1MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNDFCNkQ0NjRGQkQxMUU1QjREM0VFRkI2MTYwNjM1MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgarg9QAAATrSURBVHjazFpraBxVFD4Z1zSrolUSEyzRpCCIwcQHCBF/VH9ErfgsaMVUxBopgkqNhfqkiD9ajdYXglalNT98oZW2ITHYRttiqhYfUWJRIdGKWrNqlWjqmrZ+X+ZEhnV2987szNz54GNnZ+7M3W/PmXPPOTNV3d3dYohzwEv081TwBDAL/gn+Cn4B7gb7wS8lAHp6eiQpZMocp6CbwdtUpB/mgvPAM8DrwEfBz8EnwF4wLymCU+LY5eAe8MkSYouB4p/X8xemXfARap23wJMrvH4z2Ac+rtdNneBq8DXwdrAqwnnuAF9Ng+hCwS+AV8c01yLw2TQJXgZ2xjzfUvCmNAhuAB9JaM61Op9VwavAYxKa81jwAVuCM7qO3mB6QjablaamJqmrq5Pq6mrJ5/MyMTEh4+PjMjU1ZXqZJeA94H4bFl6kCUZZ1NbWSnt7uzQ2NkpNTY04jjPzye/cz+OGoDddaculF5hatrW1VTIZ/+SM+3mc4wxxgS3BZxtlEM3NRcV6RdPdDXGWLcEnmrqzCXhvG6LBlmAjJQxQUY7jf2NLsFE1w2gc5TjgL1uC95oMzOVyEuU403njEPyRycCxsTGZnp4uOYbHOc4Qu20lHtvAxeUGMqkYGRkpujRRLI8HSD6GOjo6ZjYGBwcTFfy61qtHmbjr8PDwzBLFqD2baXE/LRtA7KSWi6XA1eM8cVtKp2ltzgB7nKanf9MO4M/gN+Bn4DD4LniglGCmdy9ptSQmlh4dHa30j14H60767J+vbSJmf2eWqcmP1IyN0b4FvMITDDeDz4DbixUPD4rbjEsCnGdNwT5me1vUUg9pUhK2AUFPvRZ8D3wbPMVP8I8+PyIuPAzr7tPt08Xtcg6Bl0bcZSEYJEb0D/hfA4D18Ncxi/0O7FFhy8FPwYsTKEdfBq8vFHxAf0ScWAHrcm17BXxM78MkUKXtpfmFPa0+jdpxYKCtre0NFXuNhSX4aPAuvzbtreC+iCf7Deyqr69fic+rxB4W+gnOmS5RAbAcrkz3vV/sYl6xJw9swvdGNMlmiN2gYudYFpwr9aiFzfMfInDlZboWdop97HAMfmwluBPW5Z/WnWBELoVep5w7atoZBv0Qu17cBuGSFIhlcrPFMRhI6/wS8OJ/iPuYleCjm7mWxX4vbiv6sIlgRu0VASdYpa5MLLUslmnzhSpaHMOT1ps2CsR9E+ApT/WzwKLYD8FzvSmzqeDDAaw8mz4SXTEUBKYV2d3g+bOWDSpYtNzaVGbMVogd0O2sBXdmPfCcVmGrwX/8GgBBwIdgl5Ww2n2e7U5JrhX7ieboXFF+KtfiCQK2UdiAusjn2DZYd5duszm9MkaBv6vHDWg9PW56YibEZGuKCF7t2b5FA1aUxccHzJR424jb8TwY5kJhBA+pC3mfDX0FvqPbxxe4dlAcAtk0e1/cphyF7tHAWTEyIc9bJ26T7L/vcOfZH8T3tOoDXIvNvJ0ecbvUZWNBWMFsmazV6uegp7JiD+nGMufmVdhW9QpuTycVxsMK3q8Bg63RndqU49t4G4pE8L26pPXpfThpKxPJVHDuRhX8pkZltoYaCkRyqWDD/eOo7kGbgvs1wLCf/DTYLu6TAL7Y9qLel4ckZXDCngg35iOOPnx2ab7Mt/dO0nt4exrFVmphaWlp4RL1LXhvWgUW4l8BBgBGWDQSzf+kfwAAAABJRU5ErkJggg=='
		});
		map.markers.push(marker);
		if ($marker.html()) {
			var infowindow = new google.maps.InfoWindow({
				content : $marker.html()
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
	},
	centerMap: function(map) {
		function adjust() {
			map.setCenter(bounds.getCenter());
			map.setZoom( map.zoom );
		}
		var bounds = new google.maps.LatLngBounds();
		$.each(map.markers, function(i, marker) {
			var latlng = new google.maps.LatLng(marker.position.lat(),
					marker.position.lng());
			bounds.extend(latlng);
		});
		adjust();
		var timer = false;
		$(window).on('resize', function() {
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				adjust();
			}, 200);
		});
	}
};

module.exports = GoogleMap;

},{}],7:[function(require,module,exports){

var Header = function() {
  this.init();
};

Header.prototype = {

  init: function () {
    var self = this;

    self.MIN_WIDTH = 1040;

    self.$win = $(window);
    self.$body = $('body');
    self.$header = $('#js-header');
    self.$nav = $('#js-header-nav');
    self.$navInner = $('#js-header-nav-inner');
    self.$navTrigger = $('#js-menu-trigger');
    self.$search = $('.js-header-search');
    self.$searchInner = self.$search.find('.js-search-inner');
    self.$searchTrigger = self.$search.find('.js-search-trigger');
    self.$fixHeader = $('#js-fixHeader');
    self.winW = window.innerWidth ? window.innerWidth : self.$win.width();

    self.isNavMoving = false;

    self.events();
    self.setPos();
  },

  events: function() {
    var self = this;

    self.$navTrigger.on('click', function(event) {
      event.preventDefault();

      if(self.$navTrigger.hasClass('is-show')) {
        self.hideNav();
      } else {
        self.showNav();
      }

    });

    self.$searchTrigger.on('click.show-search', function() {

      if(self.$searchTrigger.hasClass('is-show') && !self.$body.hasClass('is-pc')) {

        self.hideMobileSearch(this);

      } else {

        if(self.$body.hasClass('is-pc')) {
          self.showDesktopSearch(this);
        } else {
          self.showMobileSearch(this);
        }
      }

      return false;
    });

  },

  onDesktopSubmit: function(el) {
    var self = this
      , $submit = $(el).parents('.js-header-search').find('input[type="submit"]');

    $submit.trigger('click');
  },

  showDesktopSearch: function(el) {
    var self = this
      , $self = $(el)
      , $parent = $self.parents('.js-header-search')
      , $inner = $parent.find('.js-search-inner')
      , $input = $parent.find('input[type="text"]');

    if(self.isSearchMoving) return;
    self.isSearchMoving = true;

    $inner
      .velocity({
        width: 170,
      }, 500, function() {

        self.isSearchMoving = false;

        $self.addClass('is-show');
        $parent.addClass('is-show');
        $input.focus();

        $self.off('click.submit');
        $self.on('click.submit', function() {
          if($input.val().length === 0) return false;
          self.onDesktopSubmit(this);
          return false;
        });

        $input.on('blur', function() {
          self.hideDesktopSearch(this);
        });

      });
  },

  hideDesktopSearch: function(el) {
    var self = this
      , $self = $(el)
      , $inner = $self.parents('.js-search-inner');

    if($self.val().length > 0) return;

    if(self.isSearchMoving) return;
    self.isSearchMoving = true;

    $self.off('blur');

    self.$search.removeClass('is-show');
    self.$searchTrigger.removeClass('is-show');

    $inner
      .velocity({
        width: 0,
      }, 500, function() {
        self.isSearchMoving = false;

        self.$searchInner.attr('style', '');

      });

  },

  showMobileSearch: function(el) {
    var self = this
      , $self = $(el)
      , $parent = $self.parents('.js-header-search')
      , $inner = $self.prev('.js-search-inner')
      , $input = $inner.find('input[type="text"]');

    if(self.isSearchMoving) return;
    self.isSearchMoving = true;

    if(self.$navTrigger.hasClass('is-show')) {
      self.hideNav();
    }

    $self.addClass('is-show');
    $parent.addClass('is-show');

    $inner.css({
      height: 'auto',
      visibility: 'hidden'
    });

    self.searchH = $inner.height();

    $inner
      .css({
        visibility: 'visible',
        height: 0
      })
      .velocity({
        height: self.searchH,
      }, 500, function() {
        self.isSearchMoving = false;
      });
  },

  hideMobileSearch: function(el) {
    var self = this
      , $self = $(el)
      , $parent = $self.parents('.js-header-search')
      , $inner = $self.prev('.js-search-inner')
      , $input = $inner.find('input[type="text"]');

    if(self.isSearchMoving) return;
    self.isSearchMoving = true;

    $self.removeClass('is-show');
    $parent.removeClass('is-show');

    $inner
      .velocity({
        height: 0
      }, 500, function() {
        $inner.css('height', 0);
        self.isSearchMoving = false;
      });
  },

  showNav: function() {
    var self = this;

    if(self.isNavMoving) return;
    self.isNavMoving = true;

    if(self.$search.hasClass('is-show')) {
      self.hideMobileSearch(self.$searchTrigger);
    }

    self.$navTrigger.addClass('is-show');

    self.winH = window.innerHeight ? window.innerHeight : $(window).height();
    self.headerH = self.$header.height();

    self.$navInner.css({
      display: 'block',
      visibility: 'hidden',
      overflow: 'hidden'
    });

    self.navInnerH = self.$navInner.height();

    self.$navInner
      .css({
        visibility: 'visible',
        height: 0
      })
      .velocity({
        height: self.navInnerH,
      }, 500, function() {
        self.isNavMoving = false;
        self.scrollingDecision();
      });
  },

  hideNav: function() {
    var self = this;

    if(self.isNavMoving) return;
    self.isNavMoving = true;

    self.$navTrigger.removeClass('is-show');
    self.$nav.css('height', 'auto');

    self.$navInner
      .css('overflow', 'hidden')
      .velocity({
        height: 0
      }, 500, function() {

        self.$navInner.css({
          display: 'none',
          height: 'auto'
        });

        self.isNavMoving = false;
      });
  },

  scrollingDecision: function() {
    var self = this;

    if(!self.$navTrigger.hasClass('is-show')) return;

    self.winH = window.innerHeight ? window.innerHeight : $(window).height();
    self.headerH = self.$header.height();
    self.navInnerH = self.$navInner.height();

    if(self.winH < (self.headerH + self.navInnerH)) {
      self.$nav.css('height', '100%');
      self.$navInner.css('overflow', 'auto');
    } else {
      self.$nav.css('height', 'auto');
    }

  },

  setPos: function() {
    var self = this;

    self.$win.on('scroll', function() {
      var scollLeft = self.$win.scrollLeft();
      self.$fixHeader.css('left', -scollLeft);
    });
  },

  resetStateNavigation: function() {
    var self = this;

    self.$navTrigger.removeClass('is-show');
    self.$navInner.attr('style', '');

    self.$search.removeClass('is-show').attr('style', '');
    self.$searchTrigger.removeClass('is-show');
  }
};

module.exports = Header;

},{}],8:[function(require,module,exports){

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

},{}],9:[function(require,module,exports){




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

},{}],10:[function(require,module,exports){





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

},{}],11:[function(require,module,exports){

module.exports = function() {

  /**
   * Smooth scroll.
   */
  $.fn.smoothScroll = function(options) {
    var o = $.extend({
      speed : 1000,
      easing : 'linear',
      callback : null
    }, options);

    this.filter('a').each(function() {
      var hash = this.hash
        , adjustTop = (hash === "#pagetop")? 0 : o.adjustValue;
      if (hash) {
        $(this).on('click.smoothscroll', function() {
          $('html, body').animate({
            scrollTop: $(hash).offset().top - adjustTop
          }, o.speed, o.easing, o.callback);

          return false;
        });
      }
    });

    return this;
  };

};

},{}]},{},[1]);
