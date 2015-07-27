(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function () {
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPosition(),
                                    game: this});
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Game.DIM_X * Math.random());
    var y = Math.floor(Game.DIM_Y * Math.random());
    return [x, y];
  };

  Game.prototype.addAsteroids = function () {
    var asteroids = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      asteroids.push(new Asteroids.Asteroid({ pos: this.randomPosition(),
                                              game: this }));
    }
    return asteroids;
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship);
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (asteroid) {
      asteroid.draw(context);
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
      var index = objs.indexOf(object);
      for (var i = index + 1; i < objs.length; i++) {
        var otherObj = objs[i];
        if (object.isCollidedWith(otherObj)) {
          object.collideWith(otherObj);
        }
      }
      // game.asteroids.forEach(function (otherAsteroid) {
      //   if (object.isCollidedWith(otherAsteroid)) {
      //     object.collideWith(otherAsteroid);
      //   }
      // });
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i] === asteroid) {
        this.asteroids.splice(i, 1);
        return true;
      }
    }
  };
})();
