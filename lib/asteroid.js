(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(1 * Math.random());
    options.color = Asteroid.COLOR;
    options.radius = Asteroids.Util.randomIntFromInterval(10, 35);
    this.dir = 0;
    this.rotSpeed = this.setRotSpeed();

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (context) {
    // Rotation adapted from http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    this.rotate();
    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate((this.dir) * (Math.PI/180));
    context.drawImage(Asteroid.IMAGE, -this.radius, -this.radius,
                      this.radius * 2, this.radius * 2);
    context.restore();
  };

  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./assets/asteroid.png";

  Asteroid.prototype.rotate = function() {
    this.dir += this.rotSpeed;
  };

  Asteroid.prototype.setRotSpeed = function() {
    return (Math.random() * 4) * Asteroids.Util.posOrMinus();
  };

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship && otherObject.test !== true) {
      otherObject.relocate();
      this.game.decLives();
    } else if (otherObject instanceof Asteroids.Asteroid) {
    } else {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
