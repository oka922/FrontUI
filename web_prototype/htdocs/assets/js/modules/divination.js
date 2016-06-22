
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
