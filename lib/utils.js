const rp = require('request-promise');

exports.request = function (url) {
  return rp.get(this.format(url));
};

exports.format = function (url) {
  return url + '?id=abc123'
};
