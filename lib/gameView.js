(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.context = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    setInterval((function () {
      this.game.step();
      this.game.draw(this.context);
    }).bind(this), 20);

    this.bindKeyHandlers();
  };

  GameView.prototype.bindKeyHandlers = function () {
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  };

  GameView.prototype.handleKeyDown = function (event) {
    var ship = this.game.ship;

    switch (event.keyCode) {
      case 87: // w
        if (!this.powerInterval) {
          this.powerInterval = ship.power()
          console.log(this.powerInterval);
          // debugger;
          break;
        }
    }
  };

  GameView.prototype.handleKeyUp = function (event) {
    var ship = this.game.ship;

    switch (event.keyCode) {
      case 87: // w
        ship.stopPower(this.powerInterval);
        this.powerInterval = null;
        break;
    }
  };
})();
