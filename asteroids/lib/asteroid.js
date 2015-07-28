(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(0.5 * Math.random());
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = '#ffffff';
  Asteroid.RADIUS = 12;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
