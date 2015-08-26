(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Game = Asteroids.Game = function (canvasEl, gameView) {
    this.setDimensions(canvasEl);
    this.gameView = gameView;
    this.asteroids = this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: this.randomPosition(),
                                    game: this});
    this.bullets = [];
    this.score = 0;
    this.lives = 3;

    // Add an asteroid every 3 seconds
    setInterval(this.addAsteroid.bind(this, this.asteroids), 3000);
  };

  Game.prototype.setDimensions = function (canvasEl) {
    Game.DIM_X = canvasEl.width;
    Game.DIM_Y = canvasEl.height;
  }

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
      this.addAsteroid(arr);
    } else {
      arr.push(newAsteroid);
      return arr;
    }
  };

  Game.prototype.allObjects = function () {
    return this.bullets.concat(this.asteroids).concat(this.ship);
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.drawImage(Game.BACKGROUND_IMG, 0, 0);


    this.setCtxStyle(context)
    this.drawScore(context);
    this.drawLives(context);
    if (this.gameOver) { this.drawGameOver(context); }

    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Game.prototype.setCtxStyle = function(context) {
    context.fillStyle = "rgba(255,255,255,0.6)";
    context.font = "40pt 'Titillium Web', sans-serif";
  };

  Game.prototype.drawScore = function(ctx) {
    ctx.fillText("Score: " + this.score, Game.DIM_X - 240, Game.DIM_Y - 40);
  };

  Game.prototype.drawLives = function(ctx) {
    ctx.fillText("Lives: " + this.lives, Game.DIM_X - 240, Game.DIM_Y - 100);
  };

  Game.prototype.drawGameOver = function(ctx) {
    ctx.fillText("Game Over. Thanks for playing!",
                  (Game.DIM_X / 2) - 100,
                  (Game.DIM_Y / 2) - 40);
    ctx.fillText("Press enter to play again.",
                  (Game.DIM_X / 2) - 100,
                  (Game.DIM_Y / 2) + 40);
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

  Game.prototype.incScore = function() {
    this.score += 10;
  };

  Game.prototype.decLives = function() {
    this.lives -= 1;
    if (this.lives === 0) {
      this.gameOver = true;
      this.gameView.stop();
    }
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
