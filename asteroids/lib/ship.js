(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {}
  var Ship = Asteroids.Ship = function (options) {
    options.vel = [0, 0];
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, options)
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);


  Ship.RADIUS = 8;
  Ship.COLOR = "#00ff00";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    var impX = impulse[0];
    var impY = impulse[1];
    this.vel[0] += impX;
    this.vel[1] += impY;
  };

})();
