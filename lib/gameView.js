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
    // key('w', function () {
    //   ship.power();
    // });
    // key('a', function () {
    //   ship.rotate(-1);
    // });
    // key('s', function () {
    //   ship.power([0, magnitude]);
    // });
    // key('d', function () {
    //   ship.rotate(1);
    // });
    // key('space', function () {
    //   ship.fireBullet();
    // });

    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  };

  GameView.prototype.handleKeyDown = function (event) {
    var ship = this.game.ship;

    // Handle 'w'
    if (event.keyCode === 87) {
      ship.power()
    } 
  };

  GameView.prototype.handleKeyUp = function (event) {
    var ship = this.game.ship;
    
    // Handle 'w'
    if (event.keyCode === 87) {
      ship.stopPower();
    } 
  }
})();
