require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
    jquery_ui: "//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min",
    sdk: "http://connect.soundcloud.com/sdk",
    api: "http://w.soundcloud.com/player/api",
    underscore: 'underscore',
    backbone: 'backbone',
    'backbone.localStorage': 'lib/backbone.localStorage',
    jasmine: 'tests/lib/jasmine-1.2.0/jasmine',
    'jasmine-html': 'tests/lib/jasmine-1.2.0/jasmine-html',
    spec: 'tests/spec/'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    sdk: {
      exports: "SC"
    }
  }
});

window.store = "TestStore"; // override local storage store name - for testing

require(['underscore', 'jquery', 'jasmine', 'jasmine-html'], function(_, $, jasmine){
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];
  specs.push('/js/tests/spec/track.js');
  specs.push('/js/tests/spec/genre.js');
  specs.push('/js/tests/spec/player.js');

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
});