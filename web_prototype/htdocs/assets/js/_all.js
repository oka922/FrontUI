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
