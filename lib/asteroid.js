(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(1 * Math.random());
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
  Asteroid.RADIUS = 25;
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./assets/asteroid.png";

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
      this.game.decLives();
    } else if (otherObject instanceof Asteroids.Asteroid) {
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
