(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  var Util = Asteroids.Util = function () {};

  Util.inherits = function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  Util.randomVec = function (length) {
    var x = length * Math.random() * Util.posOrMinus();
    var y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2)) * Util.posOrMinus();
    return [x, y];
  };

  Util.posOrMinus = function (value) {
    return Math.random() < 0.5 ? -1 : 1;
  };

  Util.getDistance = function (pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +
                     Math.pow(pos1[1] - pos2[1], 2));
  };

  // Takes an angle in degress. Returns an array of the x and y vectors
  Util.getVectors = function (angle) {
    var angleRad = this.toRad(angle);
    return [Math.cos(angleRad), Math.sin(angleRad)]
  };

  Util.toRad = function (angle) {
    return angle * (Math.PI / 180);
  };

  Util.randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  };
})();
