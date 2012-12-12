require.config({
  baseUrl: "/js/",
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    jquery_ui: "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min",
    sdk: "http://connect.soundcloud.com/sdk",
    api: "http://w.soundcloud.com/player/api",
    underscore: "underscore",
    backbone: "backbone",
    console: "console",
    routes: "routes",
    models: "models",
    views: "views"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    sdk: {
      exports: "SC"
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "sdk",
  "models/Player"], function ($, _, Backbone, SC, Player) {
    "use strict";

    var player = new Player();

    // Use Mustache syntax for templates
    _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

    SC.initialize({
      client_id: "b1ec133b0f33710d7443875249facd57"
    });

    // Do this everytime you change tags
    $("#selectATag").change(function () {
      var widget = SC.Widget($(".music iframe")[0]);
      widget.load(player.getRandomTrack($(this).val()).uri, {
        auto_play: true,
        sharing: false,
        show_comments: false
      });
      player.getGreeting();
    });
  }
);
// ;(function($, window, undefined) {
//   // "use strict";

//   var hot_tracks, widget, whatTag, randomTrack, hasTrack, trackObject;

//   var countCheck = 0;
//   var tagCount = $("#selectATag option").length;

//   var player = new Player();

// })(jQuery, window);