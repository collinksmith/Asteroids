(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Ship = Asteroids.Ship = function (options) {
    options.vel = [0, 0];
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (context) {
    context.drawImage(Ship.IMAGE,
                      this.pos[0] - Ship.RADIUS,
                      this.pos[1] - Ship.RADIUS);
  };

  Ship.RADIUS = 8;
  Ship.COLOR = "#00ff00";
  Ship.IMAGE = new Image();
  Ship.IMAGE.src = "./assets/spaceship2.jpeg";

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

  Ship.prototype.fireBullet = function () {
    var bulletSpeedMultiplier = 2;
    var bulletVelX = this.vel[0] * bulletSpeedMultiplier;
    var bulletVelY = this.vel[1] * bulletSpeedMultiplier;
    var bullet = new Asteroids.Bullet({pos: this.bulletPos(),
                                        vel: [bulletVelX, bulletVelY],
                                        game: this.game});
    this.game.bullets.push(bullet);
  };

  Ship.prototype.bulletPos = function () {
    var length = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var newX = ((this.vel[0] / length) * this.radius) + this.pos[0];
    var newY = ((this.vel[1] / length) * this.radius) + this.pos[1];
    return [newX, newY];
  };

})();
