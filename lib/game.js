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

    // Add an asteroid every 2 seconds
    setInterval(this.addAsteroid.bind(this, this.asteroids), 2000);
  };

  Game.prototype.setDimensions = function (canvasEl) {
    Game.DIM_X = canvasEl.width;
    Game.DIM_Y = canvasEl.height;
  }

  Game.NUM_ASTEROIDS = 25;
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

    this.allObjects().forEach(function (object) {
      object.draw(context);
    });

    this.setCtxStyle(context)
    this.drawScore(context);
    this.drawLives(context);
    this.drawInstructions(context);
    if (this.gameOver) { this.drawGameOver(context); }
  };

  Game.prototype.setCtxStyle = function(context) {
    context.fillStyle = "rgba(255,255,255,0.6)";
    context.font = "40pt 'Titillium Web', sans-serif";
  };

  Game.prototype.drawScore = function(ctx) {
    ctx.fillText("Score: " + this.score, Game.DIM_X - 200, Game.DIM_Y - 20);
  };

  Game.prototype.drawLives = function(ctx) {
    ctx.fillText("Lives: " + this.lives, Game.DIM_X - 200, Game.DIM_Y - 80);
  };

  Game.prototype.drawInstructions = function(ctx) {
    ctx.save();
    ctx.font = "20pt 'Titillium Web', sans-serif";
    ctx.fillText("Rotate: a/d", 20, Game.DIM_Y - 80);
    ctx.fillText("Forward: w", 20, Game.DIM_Y - 50);
    ctx.fillText("Shoot: space", 20, Game.DIM_Y - 20);
    ctx.restore();
  };

  Game.prototype.drawGameOver = function(ctx) {
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillText("Game Over. Thanks for playing!",
                  (Game.DIM_X / 2) - 370,
                  (Game.DIM_Y / 2) - 40);
    ctx.fillText("Press enter to play again.",
                  (Game.DIM_X / 2) - 320,
                  (Game.DIM_Y / 2) + 40);
  };
  Game.prototype.drawWelcome = function(ctx) {
    this.draw(ctx);
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillText("Welcome to Asteroids!",
                  (Game.DIM_X / 2) - 250,
                  (Game.DIM_Y / 2) - 40);
    ctx.fillText("Press enter to begin.",
                  (Game.DIM_X / 2) - 220,
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
      var index = objs.indexOf(object);
      for (var i = index + 1; i < objs.length; i++) {
        var otherObj = objs[i];
        if (object.isCollidedWith(otherObj)) {
          object.collideWith(otherObj);
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
