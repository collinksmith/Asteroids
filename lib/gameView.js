(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function (canvasEl) {
    canvasEl.width = $("body").width();
    canvasEl.height = $("body").height();
    this.game = new Asteroids.Game(canvasEl, this );
    this.setContext(canvasEl);
  };

  GameView.prototype.start = function () {
    this.intervalId = setInterval((function () {
      this.game.step();
      this.game.draw(this.context);
    }).bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function() {
    clearInterval(this.intervalId);
    this.bindEnterHandler();
  };

  GameView.prototype.setContext = function(canvasEl) {
    this.context = canvasEl.getContext("2d");
    this.context.fillStyle = "rgba(255,255,255,0.6)";
    this.context.font = "40pt 'Titillium Web', sans-serif";
  };

  GameView.prototype.bindGameOver = function() {
    // $(window).unbind()
  };

  GameView.prototype.bindKeyHandlers = function () {
    $(window).on("keydown", this.handleKeyDown.bind(this));
    $(window).on("keyup", this.handleKeyUp.bind(this));
  };

  GameView.prototype.handleKeyDown = function (event) {
    var ship = this.game.ship;

    switch (event.keyCode) {
      case 87: // w
        ship.power();
        break;
      case 65: // a
        ship.rotate(-1); // rotate left
        break;
      case 68: // d
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
      case 87: // w
        ship.stopPower();
        break;
      case 65: // a
        ship.stopRotation();
        break;
      case 68: // d
        ship.stopRotation();
        break;
      case 32: // space
        this.preventFiring = false;
        break;
    }
  };
})();
