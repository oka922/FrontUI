/*global WebDesign02, $*/


window.WebDesignBackboneSample = {
    Views: {},
    Router : null,

    init: function () {
        'use strict';

        var appRouter = new this.Router.MainRouter();

        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    WebDesignBackboneSample.init();
});
