describe("A track", function () {

  beforeEach(function() {

    var that = this,
        done = false;

    require(['/js/models/Track.js'], function (Track) {
      that.track = new Track();
      done = true;
    });

    waitsFor(function () {
      return done;
    });

  });

  it("has a uri", function () {
    expect(this.track.get("uri")).toBeUndefined();
  });

  it("has a username", function () {
    expect(this.track.get("username")).toBeUndefined();
  });

  it("has a picture", function () {
    expect(this.track.get("picture")).toBeUndefined();
  });

});