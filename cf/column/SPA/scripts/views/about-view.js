/*global WebDesign02, Backbone, JST*/

WebDesignBackboneSample.Views = WebDesignBackboneSample.Views || {};

(function () {
    'use strict';

    WebDesignBackboneSample.Views.AboutView = Backbone.View.extend({
        el : "div#about-content",
        templateURL :'./scripts/templates/about-view.ejs',

        //　初期化関数(オブジェクトが生成される。）
        initialize: function () {
            _.bindAll(this, "hideComplete");

            var html = new EJS({url: this.templateURL}).render();
            this.$el.html(html);

            this.$navLists = $(".nav-list");
            this.$navAboutList = $("#nav-about");
        },

        show : function () {
            this.$navLists.removeClass("active");
            this.$navAboutList.addClass("active");

            this.$el.css("opacity", 0);
            this.$el.addClass("active");

            this.$el.animate({opacity: 1.0}, 500, function(){
            });
        },

        hide : function(){
            this.$el.animate({opacity: 0.0},500, this.hideComplete);
        },

        hideComplete : function(){
            this.$el.removeClass("active");
        }

    });

})();
