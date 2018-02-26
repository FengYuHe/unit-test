function Foo() {
}

Foo.prototype.a = function (one, two) {
  if (isNaN(one) || isNaN(two)) throw new Error('argument type need Number');
  return one + two;
};

Foo.prototype.b = function (one, two, three) {
  if (isNaN(three)) throw new Error('argument type need Number');
  return three + this.a(one, two);
};

Foo.prototype.c = function (one, two, three, four) {
  if (isNaN(four)) throw new Error('argument type need Number');
  return four + this.b(one, two, three);
};

Foo.prototype.bar = function (url) {
  return request(url);
};

function request(url) {
  return url;
}

module.exports = exports = Foo;