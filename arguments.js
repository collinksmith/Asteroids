function sum() {
  var result = 0;
  [].slice.call(arguments, 0).forEach(function (num) {
    result += num;
  });
  return result;
}

// console.log(sum(1,2,3,4,5));

function myBind(context) {
  var fn = this;
  var args = [].slice.call(arguments,1);
  return function() {
    var newArgs = [].slice.call(arguments,0);
    args = args.concat(newArgs);
    fn.apply(context, args);
  };
}

function curriedSum(numArgs) {
  var numbers = [];
  var _curriedSum = function (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var result = numbers.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      })
      return result;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function (numArgs) {
  var args = [];
  var self = this;
  var _curry = function(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      self.apply(self, args);
    } else {
      return _curry;
    }
  };
  return _curry;
};
