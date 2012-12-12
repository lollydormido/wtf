require.config({
  baseUrl: "/js/",
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    jquery_ui: "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min",
    underscore: "underscore",
    backbone: "backbone",
    console: "console"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    console: {
      exports: "console"
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "console"], function ($, _, Backbone, console) {
    "use strict";
    var Thing = Backbone.Model.extend({
      defaults: {
        things: [1, 2, 3, 4, 5]
      },
      initialize: function () {
        console.log("in initialize");
        console.log(this);
      }
    });
    var thing = new Thing();
  }
);