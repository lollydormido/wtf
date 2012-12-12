define([
  "underscore",
  "backbone"], function (_, Backbone) {

  "use strict";

  var Router = Backbone.Router.extend({
    routes: {
      "": "main",
      "song/:uri": "song"
    },
    main: function () {
      Backbone.history.start();
    },
    song: function (uri) {
      var hasTrack = true;
      var trackObject = uri;
    }
  });

  // Backbone.history.start();

});