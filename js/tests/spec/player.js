describe("A player", function () {

  beforeEach(function() {

    var that = this,
        done = false;

    require(['/js/models/Player.js'], function (Player) {
      that.player = new Player();
      done = true;
    });

    waitsFor(function () {
      return done;
    });

  });

  it("has a widget", function () {
    expect(this.player.get("widget")).toBeNull();
  });

  it("has greetings", function () {
    expect(this.player.get("greetings").length).toBe(7);
    expect(this.player.get("greetings")[0]).toBe('Listen to some fucking ');
  });

  it("is not playing at first", function () {
    expect(this.player.get("playing")).toBe(false);
  });

  it("has an array of genres", function () {
    expect(this.player.get("genres")).toBeDefined();
  });

});