(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(1 * Math.random());
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;
    this.dir = 0;
    this.rotSpeed = this.setRotSpeed();
    this.radius = this.setRadius();

    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function (context) {
    // context.drawImage(Asteroid.IMAGE,
    //                   this.pos[0] - Asteroid.RADIUS,
    //                   this.pos[1] - Asteroid.RADIUS);

    this.rotate();
    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate((this.dir + 90) * (Math.PI/180));
    context.drawImage(Asteroid.IMAGE, -Asteroid.RADIUS, -Asteroid.RADIUS,
                      this.RADIUS * 2, this.RADIUS * 2);
    context.restore();
  };

  Asteroid.COLOR = '#ffffff';
  Asteroid.IMAGE = new Image();
  Asteroid.IMAGE.src = "./assets/asteroid.png";
  Asteroid.RADIUS = 25;

  Asteroid.prototype.rotate = function() {
    this.dir += this.rotSpeed;
  };

  Asteroid.prototype.setRotSpeed = function() {
    return (Math.random() * 4) * Asteroids.Util.posOrMinus();
  };

  class_name.prototype.method_name = function(first_argument) {
    // body...
  };

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
