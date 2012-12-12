define([
  "backbone"
  ], function (Backbone) {

    "use strict";

    var Track = Backbone.Model.extend({
      uri: null,
      username: null,
      picture: null
    });

    return Track;

  }
);