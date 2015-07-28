(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(0.5 * Math.random());
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (context) {
    context.drawImage(Asteroid.IMAGE,
                      this.pos[0] - Asteroid.RADIUS,
                      this.pos[1] - Asteroid.RADIUS);
  };

  Asteroid.COLOR = '#ffffff';
  Asteroid.RADIUS = 12;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./assets/asteroid.jpeg";

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
