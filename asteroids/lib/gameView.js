(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.context = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    setInterval((function () {
      this.game.step();
      this.game.draw(this.context);
    }).bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.game.ship;
    var magnitude = .5
    key('w', function () {
      ship.power([0, -magnitude]);
    });
    key('a', function () {
      ship.power([-magnitude, 0]);
    });
    key('s', function () {
      ship.power([0, magnitude]);
    });
    key('d', function () {
      ship.power([magnitude, 0]);
    });
  };

})();
