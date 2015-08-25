(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function () {
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPosition(),
                                    game: this});
    this.bullets = [];

    // Add an asteroid every 3 seconds
    setInterval(this.addAsteroid.bind(this, this.asteroids), 3000);
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;
  Game.BACKGROUND_IMG = new Image(Game.DIM_X, Game.DIM_Y);
  Game.BACKGROUND_IMG.src = './assets/stars.jpg';

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Game.DIM_X * Math.random());
    var y = Math.floor(Game.DIM_Y * Math.random());
    return [x, y];
  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      asteroids = this.addAsteroid(asteroids);
    }
    return asteroids;
  };

  Game.prototype.addAsteroid = function (arr) {
    var newAsteroid = new Asteroids.Asteroid({ pos: this.randomPosition(),
                                               game: this });
    if (this.ship && newAsteroid.isCollidedWith(this.ship)) {
      this.addAsteroid();
    } else {
      arr.push(newAsteroid);
      return arr;
    }
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.drawImage(Game.BACKGROUND_IMG, 0, 0);

    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] + Game.DIM_X) % Game.DIM_X;
    var y = (pos[1] + Game.DIM_Y) % Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.checkCollisions = function () {
    var objs = this.allObjects();
    objs.forEach(function (object) {
      if (!(object instanceof Asteroids.Ship)) { // Don't check the ship directly
        var index = objs.indexOf(object);
        for (var i = index + 1; i < objs.length; i++) {
          var otherObj = objs[i];
          if (object.isCollidedWith(otherObj)) {
            object.collideWith(otherObj);
          }
        }
      }
    });
  };

  Game.prototype.collidesWithAsteroid = function(obj) {
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(obj)) {
        return true;
      }
    })
    return false;
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    var objArray;
    if (object instanceof Asteroids.Asteroid) {
      objArray = this.asteroids;
    } else if (object instanceof Asteroids.Bullet) {
      objArray = this.bullets;
    } 
    for (var i = 0; i < objArray.length; i++) {
      if (objArray[i] === object) {
        objArray.splice(i, 1);
        return true;
      }
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Game.DIM_X) ||
    (pos[1] < 0 || pos[1] > Game.DIM_Y);
  };
})();
