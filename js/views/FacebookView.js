define([
  "jquery",
  "underscore",
  "backbone"], function ($, _, Backbone) {

  "use strict";

  var FacebookView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, "render");
      this.model.bind("change", this.render);
      this.template = _.template($("#facebook-template").html());
    },
    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }
  });

});