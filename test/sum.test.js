const lib = require('../lib/sum');
const should = require('chai').should();
const sinon = require('sinon');

describe('sum', function () {
  it('sum should success', done => {
    lib.sum(1, 2).should.equal(3);
    done();
  });

  it('sum to spy', done => {
    const spy = sinon.spy(lib, 'sum');
    lib.sum(1, 2);
    sinon.assert.calledOnce(spy); // 调用一次
    sinon.assert.callCount(spy, 1); // 调用次数
    sinon.assert.calledWith(spy, 1, 2); // 调用参数
    spy.returnValues[0].should.equal(3); // 返回值
    spy.restore();
    done();
  });
});

// ava 版本，可安装ava包后，执行ava test/sum.test.js
// const test = require('ava');
// test('sum should success', t => {
//   const result = lib.sum(1, 2);
//   t.deepEqual(result, 3);
// });