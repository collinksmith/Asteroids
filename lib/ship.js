(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Ship = Asteroids.Ship = function (options) {
    options.vel = [0, 0];
    options.radius = Ship.RADIUS;
    options.color = Ship.COLOR;
    this.dir = -90;
    Asteroids.MovingObject.call(this, options);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.draw = function (context) {
    // Rotation adapted from http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate((this.dir + 90) * (Math.PI/180));
    context.drawImage(Ship.IMAGE, -Ship.RADIUS, -Ship.RADIUS);
    context.restore();
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "#00ff00";
  Ship.IMAGE = new Image();
  Ship.IMAGE.src = "./assets/ship.png";

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };


  Ship.prototype.power = function () {
    if (!this.powerInterval) {
      Ship.IMAGE.src = "./assets/ship-thrust.png";
      this.powerInterval = setInterval(this.increasePower.bind(this), 100);
    }
  };

  Ship.prototype.stopPower = function () {
    Ship.IMAGE.src = "./assets/ship.png";
    clearInterval(this.powerInterval);
    this.powerInterval = null;
  };

  Ship.prototype.increasePower = function () {
    var powerMagnitude = 0.5;
    var vectors = Asteroids.Util.getVectors(this.dir);
    this.vel[0] += vectors[0] * powerMagnitude;
    this.vel[1] += vectors[1] * powerMagnitude;
  };

  Ship.prototype.rotate = function (val) {
    if (!this.rotationInterval) {
      this.rotationInterval = setInterval(function () {
        var rotationMagnitude = 6;
        this.dir += (val * rotationMagnitude);    
      }.bind(this), 24)
      }
  };

  Ship.prototype.stopRotation = function () {
    clearInterval(this.rotationInterval);
    this.rotationInterval = null;
  }

  Ship.prototype.fireBullet = function () {
    var bulletSpeedMultiplier = 3;
    var vectors = Asteroids.Util.getVectors(this.dir);
    var bulletVelX = vectors[0] * bulletSpeedMultiplier;
    var bulletVelY = vectors[1] * bulletSpeedMultiplier;
    var bullet = new Asteroids.Bullet({pos: this.bulletPos(),
                                        vel: [bulletVelX, bulletVelY],
                                        game: this.game});
    this.game.bullets.push(bullet);
  };

  Ship.prototype.bulletPos = function () {
    var length = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    var vectors = Asteroids.Util.getVectors(this.dir);

    var newX = (vectors[0] * this.radius) + this.pos[0];
    var newY = (vectors[1] * this.radius) + this.pos[1];
    return [newX, newY];
  };
})();
