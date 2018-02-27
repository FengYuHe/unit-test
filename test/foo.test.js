const sinon = require('sinon');
const assert = require('chai').assert;
const should = require('chai').should();
const Foo = require('../lib/foo');
const foo = new Foo();
const utils = require('../lib/utils');
const rewire = require("rewire");
const myFoo = rewire('../lib/foo');

describe('Foo', () => {
  it('Using spies to test "add" success', done => {
    const spy = sinon.spy(foo, 'add');
    foo.add(1, 2);
    sinon.assert.calledOnce(spy); // 调用一次
    sinon.assert.callCount(spy, 1); // 调用次数
    sinon.assert.calledWith(spy, 1, 2); // 调用参数
    spy.returnValues[0].should.equal(3); // 返回值
    spy.restore();
    done();
  });

  it('Using spies to test "add" throw Error', done => {
    const spy = sinon.spy(foo, 'add');
    try {
      foo.add(1, 'abc');
    } catch (err) {}
    spy.threw().should.be.true;
    spy.restore();
    done();
  });

  it('Using stub to test "bar" success', done => {
    const request = sinon.stub(utils, 'request');
    request.returnsArg(0); // request，直接返回第一个调用参数
    const result = foo.bar('http://baidu.com');
    assert.equal(result, 'http://baidu.com');
    request.restore();
    done();
  });

  it('Using stub to test "bar" throw Error', done => {
    const spy = sinon.spy(foo, 'bar');
    const request = sinon.stub(utils, 'request');
    request.throws(0); // request，抛出错误
    try {
      foo.bar('http://baidu.com');
    } catch (err) {}
    spy.threw().should.be.true;
    request.restore();
    spy.restore();
    done();
  });

  it('Using mock to test "bar"', done => {
    const spy = sinon.spy(foo, 'bar');
    const mock = sinon.mock(utils);
    mock.expects('request').once().throws();
    try {
      foo.bar('http://baidu.com');
    } catch (err) {}
    spy.threw().should.be.true;
    spy.restore();
    mock.verify();
    mock.restore();
    done();
  });

  it('test private function', done => {
    const func = myFoo.__get__('privateFuc');
    func('abc').should.equal('ABC');
    done();
  });

  it('test to bar', done => {
    const result = foo.bar('http://baidu.com');
    result.should.be.a('Object');
    done();
  });
});
