const utils = require('./utils');

function Foo() {
}

Foo.prototype.add = function (one, two) {
  if (isNaN(one) || isNaN(two)) throw new Error('argument type need Number');
  return one + two;
};

Foo.prototype.bar = function (url) {
  return utils.request(url);
};

function privateFuc(str) {
  return str.toUpperCase();
}

module.exports = exports = Foo;