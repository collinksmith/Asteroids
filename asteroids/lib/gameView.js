(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.context = canvasEl.getContext("2d");
  };

  GameView.prototype.start = function () {
    setInterval((function () {
      this.game.moveObjects();
      this.game.draw(this.context);
    }).bind(this), 20);
  };
})();
