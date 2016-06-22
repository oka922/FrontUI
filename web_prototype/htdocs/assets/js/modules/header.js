
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
