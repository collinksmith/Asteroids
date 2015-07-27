(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Asteroid = Asteroids.Asteroid = function (options) {
    options.vel = Asteroids.Util.randomVec(0.5 * Math.random());
    options.color = Asteroid.COLOR;
    options.radius = Asteroid.RADIUS;

    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.COLOR = '#000000';
  Asteroid.RADIUS = 10;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
