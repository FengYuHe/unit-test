const sinon = require('sinon');
const assert = require('chai').assert;
const Foo = require('../lib/foo');
const foo = new Foo();

describe('Foo', () => {
  it('test a success', async () => {
    const a = sinon.spy(foo, 'a');
    const result = foo.a(1, 2);
    // foo.a(1, 2);
    a.restore();
    sinon.assert.calledOnce(a);
    sinon.assert.callCount(a, 1);
    assert.equal(result, 3);
  });
});
