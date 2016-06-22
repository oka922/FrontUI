
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
