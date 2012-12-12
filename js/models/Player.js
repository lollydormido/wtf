define([
  "jquery",
  "underscore",
  "backbone",
  "sdk",
  "routes/Router",
  "models/Genre",
  "models/Genres",
  "models/Track",
  "views/TwitterView",
  "views/FacebookView"
  ], function ($, _, Backbone, SC, Router, Genre, Genres, Track, TwitterView, FacebookView) {

    "use strict";

    var Player = Backbone.Model.extend({
      defaults: {
        widget: null,
        playing: false,
        genres: [],
        greetings: [
          'Listen to some fucking ',
          'Bet you never fucking heard ',
          'Your fucking ears will be graced by ',
          'The fucking Music Gods have brought you ',
          'Muh fucking Mozart is chanelled through ',
          'Your life was fucking incomplete without ',
          'Bro, fucking listen to '
        ]
      },

      initialize: function () {
        var this_player = this;
        // For each dropdown value, pull 50 tracks
        $("#selectATag option").each( function() {
          this_player.getTrack($(this).val());
        });
      },

      getTrack: function (tag) {
        var this_player = this;
        if (tag === "HotTracks") {
          SC.get("/tracks?filter=public&order=hotness", {limit: 50}, function(tracks) {
            var genre = new Genre({name: tag, tracks: tracks});
            this_player.genres.add(genre);
            this_player.play(this_player.getRandomTrack());
          });
        } else {
          SC.get("/tracks?filter=public&order=hotness&tags=" + tag, {limit: 50},
            function(tracks) {
              var genre = new Genre({name: tag, tracks: tracks});
              this_player.genres.add(genre);
              this_player.play(this_player.getRandomTrack());
          });
        }
      },

      getRandomTrack: function () {
        var this_player = this;
        var random_genre = Math.floor(this_player.genres.length * Math.random());
        var genre = this_player.genres.models[random_genre];
        var genre_tracks = genre.attributes.tracks;
        var track = genre_tracks[Math.floor(genre_tracks.length * Math.random())];
        return track;
      },

      getRandomTrackForTag: function (aTag) {
        var this_player = this;
        var genre = this_player.genres.where({name: aTag});
        var random_track = Math.floor(genre.attributes.tracks.length*Math.random());
        return genre.attributes.tracks[random_track];
      },

      createTrack: function (uri, artist, artwork) {
        var router = new Router();
        var trackModel = new Track();
        var twitter = new TwitterView({
          el: $("#twitter-view"),
          model: trackModel
        });
        var facebook =  new FacebookView({
          el: $("#facebook-view"),
          model: trackModel
        });
        trackModel.set({uri: uri, username: artist, picture: artwork });
        router.navigate("/song/" + uri, {trigger: true});
      },

      getGreeting: function () {
        var random_greeting = Math.floor(this.greetings.length * Math.random());
        $(".listenToGreeting").html(this.greetings[random_greeting]);
        var soundCloudUser = this.randomTrack.user.username;
        var soundCloudUserUrl = this.randomTrack.user.permalink_url;
        $(".username a").attr("href",soundCloudUserUrl).html(soundCloudUser);
      },

      playNextTrack: function (widget) {
        widget.load(this.getRandomTrack(this.whatTag).uri, {
          auto_play: true,
          sharing: false
        });
        this.getGreeting();
      },

      play: function (track) {
        // SC Playing http://developers.soundcloud.com/docs/api/guide#playing
        // SC oEmbed http://developers.soundcloud.com/docs/api/reference#oembed
        SC.oEmbed(track.uri, {show_comments: false, sharing: false, auto_play: true},
          function (oembed) {
          // Embed iframe
          if (oembed && oembed.html) {
            $(".music").html(oembed.html);
            // http://developers.soundcloud.com/docs/api/html5-widget#methods
            var widget = SC.Widget($(".music iframe")[0]);
            widget.bind(SC.Widget.Events.READY, function (e) {
              $(".username").css("visibility", "visible");
              $("nav").css("visibility", "visible");
              $(".next").click(function() {
                this.playNextTrack(widget);
              });
              this.playPause();
              widget.bind(SC.Widget.Events.PLAY, function (track) {
                 widget.getCurrentSound(function (track) {
                  this.createTrack(track.id, track.user.username, track.artwork_url);
                });
              });
              widget.bind(SC.Widget.Events.FINISH, function () {
                this.playNextTrack(widget);
              });
            });
          }
        });
      },

      playPause: function () {
        $("document").keypress(function(e) {
          //If spacebar (32) is pressed, togglePlay and return false
          if ((e.which && e.which == 32) || (e.keyCode && e.keyCode == 32)) {
            this.togglePlay();
            return false;
          } else {
            return true;
          }
        });

        $('#playButton').click(function(){
          this.togglePlay();
          return false;
        });
      },

      togglePlay: function () {
        var $elem = $('#player').children(':first');
        $elem.stop()
          .show()
          .animate({
            marginTop: -175,
            marginLeft: -175,
            width: 350,
            height: 350,
            opacity: 0
          }, function() {
            $(this).css({
              width:'100px',
              height:'100px',
              "margin-left":'-50px',
              "margin-top":'-50px',
              opacity: 1,
              display:'none'
          });
        });
        $elem.parent().append($elem);
        if ( $("#player").children(":first").attr("id") == "pause" ) {
          this.widget.pause();
          $("#playButton").html("&nbsp; &#9658; &nbsp;");
        } else {
          this.widget.play();
          $("#playButton").html("&nbsp;&#9616;&#9616;&nbsp;");
        }
      },

      count: function (tagCount) {
        this.countCheck++;
        if (this.countCheck > tagCount) {
          this.checkForTrack();
        }
      },

      checkForTrack: function (trackObject) {
        // What does this do?
        if (false === true) {
          SC.get("/tracks/" + trackObject,  function (track) {
            // randomTrack = track;
            if (track) this.play(track);
            this.getGreeting();
            this.whatTag = "HotTracks";
          });
        } else {
          this.play(this.getRandomTrack("HotTracks"));
          this.getGreeting();
        }
      }
    });

    return Player;

  }
);