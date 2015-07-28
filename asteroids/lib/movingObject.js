(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var MovingObject = Asteroids.MovingObject =
    function (options) {
      this.pos = options.pos;
      this.vel = options.vel;
      this.radius = options.radius;
      this.color = options.color;
      this.game = options.game;
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();

    context.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    context.fill();
  };

  MovingObject.prototype.move = function () {
    var xvel = this.vel[0];
    var yvel = this.vel[1];
    this.pos[0] += xvel;
    this.pos[1] += yvel;
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      }
    }
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    if (this === otherObject) {
      return false;
    }
    var distance = Asteroids.Util.getDistance(this.pos, otherObject.pos);
    var sumRadii = this.radius + otherObject.radius;

    return distance <= sumRadii ? true : false;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
  };

})();
