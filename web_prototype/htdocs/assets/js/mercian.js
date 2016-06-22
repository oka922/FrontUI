/**
 * @fileOverview Mercian functions.
 */

(function(exports, $, _) {

  "use strict";

  /**
   * @module Mercian.
   * @LEON.
   */
  var Mercian = {

    /**
     * Render.
     */
    render: function() {
    	var self = this;

      self.winH = window.innerHeight ? window.innerHeight : $(window).height();
      self.winW = window.innerWidth ? window.innerWidth : $(window).width();
      self.pastWinW = self.winW;

      $(window).on('scroll', _.throttle(function() {
        self.onScroll();
      }, 100));

      $(window).on('resize', _.throttle(function() {
        self.onResize();
      }, 500));


      self.onScroll();
      return this;
    },

    /**
     * On load.
     */
    onLoad: function() {
    	var self = this;

      self.showHeader();

      return this;
    },

    onResize: function() {
      var self = this;

      self.winH = window.innerHeight ? window.innerHeight : $(window).height();
      self.winW = window.innerWidth ? window.innerWidth : $(window).width();

      self.pastWinW = self.winW;

      return this;
    },

    updateStatus: function($target, scrollHalf) {

      $target.each(function() {
        var $self = $(this)
          , offsetTop = $self.offset().top;


        if(scrollHalf > offsetTop) {
          $self.addClass('is-show');
        }

      });

    },

    onScroll: function() {
      var self = this
        , $mercian = $('#js-mercian')
        , $lead = $('#js-lead')
        , $navi = $('#js-navi')
        , $talk = $mercian.find('.js-talk')
        , $image = $mercian.find('.js-image')
        , scrollHalf;

      console.log($talk);

      self.scrollTop = $(window).scrollTop();

      scrollHalf = self.scrollTop + (self.winH / 3) * 2;

      self.updateStatus($talk, scrollHalf);
      self.updateStatus($image, scrollHalf);

      if(!self.isShowLead && $lead.length) {
        self.showLead($lead, scrollHalf);
      }

      if(!self.isShowNavigator && $navi.length) {
        self.showNavigator($navi, scrollHalf);
      }
    },

    showHeader: function() {
      var $mercianHeader = $('#js-mercianHeader')
        , $category = $mercianHeader.find('.js-category')
        , $title = $mercianHeader.find('.js-title')
        , $lead = $mercianHeader.find('.js-lead')
        , $meta = $mercianHeader.find('.js-meta');

      $category
        .velocity({
          opacity: 1,
          top: 0
        }, 'easeInOutQuad', 1000);

      $title
        .delay(250)
        .velocity({
          opacity: 1,
          top: 0
        }, 'easeInOutQuad', 1000);

      $lead
        .delay(1000)
        .velocity({
          opacity: 1
        }, 800);

      $meta
        .delay(1000)
        .velocity({
          opacity: 1
        }, 800);

    },

    showLead: function($target, scrollHalf) {
      var offsetTop = $target.offset().top;

      if(scrollHalf > offsetTop) {
        self.isShowLead = true;

        $target
          .velocity({
            opacity: 1
          }, 1000);
      }
    },

    showNavigator: function($target, scrollHalf) {
      var offsetTop = $target.offset().top;

      if(scrollHalf > offsetTop) {
        self.isShowNavigator = true;

        $target
          .velocity({
            opacity: 1
          }, 1000);
      }
    }

  };

  /* DOMContentLoaded. */
  $(document).on('ready', _.bind(Mercian.render, Mercian));

  /* Window on loaded. */
  $(window).on('load', _.bind(Mercian.onLoad, Mercian));

}(
  window,
  window.jQuery,
  window._
));
