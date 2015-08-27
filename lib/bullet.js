(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Bullet = Asteroids.Bullet = function (options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, options);
  };
  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.RADIUS = 2;
  Bullet.COLOR = "#FFF8C6";

  Bullet.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Asteroid) {
      this.game.incScore();
      this.game.remove(otherObj);
      this.game.remove(this);
    }
  };
})();
