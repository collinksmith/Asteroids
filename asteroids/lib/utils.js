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
  }
})();
