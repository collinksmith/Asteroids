(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.canvasEl = canvasEl;
    canvasEl.width = $("body").width();
    canvasEl.height = $("body").height();
    this.context = canvasEl.getContext("2d");
  };

  GameView.prototype.newGame = function() {
    this.game = new Asteroids.Game(this.canvasEl, this);
    this.start();
  };

  GameView.prototype.welcome = function() {
    this.game = new Asteroids.Game(this.canvasEl, this);
    this.welcomeInterval = setInterval(function () {
      this.game.drawWelcome(this.context);
    }.bind(this), 20);
    this.bindEnterHandler(true);
  };

  GameView.prototype.start = function () {
    clearInterval(this.welcomeInterval);
    this.intervalId = setInterval(function () {
      this.game.step();
      this.game.draw(this.context);
    }.bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.intervalId);
    this.bindEnterHandler();
  };

  GameView.prototype.bindEnterHandler = function(welcome) {
    $(window).off("keydown keyup");
    $(window).on("keydown", this.handleEnter.bind(this, welcome));
  };

  GameView.prototype.handleEnter = function(welcome, event) {
    if (event.keyCode === 13) {
      if (welcome) {
        this.start();
      } else {
        this.newGame();
      }
    }
  };

  GameView.prototype.bindKeyHandlers = function () {
    $(window).off("keydown"); // Remove enter listener if it exists
    $(window).on("keydown", this.handleKeyDown.bind(this));
    $(window).on("keyup", this.handleKeyUp.bind(this));
  };

  GameView.prototype.handleKeyDown = function (event) {
    var ship = this.game.ship;

    switch (event.keyCode) {
      case 87: case 38: // w or up
        ship.power();
        break;
      case 65: case 37: // a or left
        ship.rotate(-1); // rotate left
        break;
      case 68: case 39: // d or right
        ship.rotate(1); // rotate right
        break;
      case 32: // space
        event.preventDefault();
        if (!this.preventFiring) { ship.fireBullet(); }
        this.preventFiring = true;
        break;
    }
  };

  GameView.prototype.handleKeyUp = function (event) {
    var ship = this.game.ship;

    switch (event.keyCode) {
      case 87: case 38: // w or up
        ship.stopPower();
        break;
      case 65: case 37: // a or left
        ship.stopRotation();
        break;
      case 68: case 39: // d or right
        ship.stopRotation();
        break;
      case 32: // space
        this.preventFiring = false;
        break;
    }
  };
})();
