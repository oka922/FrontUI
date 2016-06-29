/*global WebDesign02, Backbone, JST*/

WebDesignBackboneSample.Views = WebDesignBackboneSample.Views || {};

(function () {
    'use strict';

    WebDesignBackboneSample.Views.ContactView = Backbone.View.extend({
        $navLists : null,
        $navContactList : null,

        el : "div#contact-content",

        templateURL: './scripts/templates/contact-view.ejs',

        initialize: function () {
            _.bindAll(this, "hideComplete");

            var html = new EJS({url: this.templateURL}).render();

            this.$el.html(html);

            this.$navLists = $(".nav-list");
            this.$navContactList = $("#nav-contact");
        },

        show : function () {
            this.$navLists.removeClass("active");
            this.$navContactList.addClass("active");

            this.$el.css("opacity", 0);
            this.$el.addClass("active");

            this.$el.animate({opacity: 1.0}, 500);
        },

        hide : function(){
            this.$el.animate({opacity: 0.0},500, this.hideComplete);
        },

        hideComplete : function(){
            this.$el.removeClass("active");
        }

    });

})();
