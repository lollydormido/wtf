describe("A genre", function () {

  beforeEach(function() {

    var that = this,
        done = false;

    require(['/js/models/Genre.js'], function (Genre) {
      that.genre = new Genre();
      done = true;
    });

    waitsFor(function () {
      return done;
    });

  });

  it("is defined", function () {
    expect(this.genre).toBeDefined();
  });

});