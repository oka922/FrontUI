/*global WebDesign02, Backbone*/

WebDesignBackboneSample.Router = WebDesignBackboneSample.Router || {};

(function () {
    'use strict';

    WebDesignBackboneSample.Router.MainRouter = Backbone.Router.extend({
        curView       : null,

        aboutView     : null,
        contactView   : null,
        homeView      : null,

        $mainContents : null,

        routes : {
            'about'     : 'aboutActionHandler',
            'contact'   : 'contactActionHandler',
            '*actions'  : 'homeActionHandler'
        },

        initialize : function(){
            this.aboutView   = new WebDesignBackboneSample.Views.AboutView();
            this.contactView = new WebDesignBackboneSample.Views.ContactView();
            this.homeView    = new WebDesignBackboneSample.Views.HomeView();

            this.$mainContents = $(".main-content");

        },

        aboutActionHandler : function(){
            if(this.curView) this.curView.hide();
            this.aboutView.show();

            this.curView = this.aboutView;
        },

        contactActionHandler : function(){
            if(this.curView) this.curView.hide();
            this.contactView.show();

            this.curView = this.contactView;
        },

        homeActionHandler : function(){
            if(this.curView) this.curView.hide();
            this.homeView.show();

            this.curView = this.homeView;
        }

    });

})();
