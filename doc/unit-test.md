# 单元测试
覆盖所有用例
## 测试套件
- mocha 测试框架
- power-assert 断言库
- sinon 模拟
### mocha
基本构成
decribe + it
```js

```
#### 钩子
```shell
before
  beforeEach
    test
  afterEach
after
```
#### 异步测试
##### 回调式
```javascript
describe('User', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      var user = new User('Luna');
      user.save(function (err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
```
##### promise
直接返回 `Promise`代替回调
```js
beforeEach(function () {
  return db.clear().then(function () {
    return db.save([tobi, loki, jane]);
  });
});

describe('#find()', function () {
  it('respond with matching records', function () {
    return db.find({type: 'User'}).should.eventually.have.length(3);
  });
});

// 自定义Promise
const assert = require('assert');

// antipattern
it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  }).then(done);
});
```
##### async/await
推荐使用这种方式
```js
beforeEach(async function () {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function () {
  it('responds with matching records', async function () {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```
> 异步测试中，如果`done()`回调被调用多次，会触发错误。
#### 重复测试
`this.retries(4)`  重复测试四次
```js
describe('retries', function () {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```
#### 动态生成数据测试
```js
var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function () {
  var tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10},
  ];

  tests.forEach(function (test) {
    it('correctly adds ' + test.args.length + ' args', function () {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
```
#### 测试间隔
默认测试间隔 *75ms*
```js
describe('something slow', function () {
  this.slow(300000); // five minutes

  it('should take long enough for me to go make a sandwich', function () {
    // ...
  });
});
```
#### 测试超时
```js
describe('a suite of tests', function () {
  this.timeout(500);

  it('should take less than 500ms', function (done) {
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function (done) {
    setTimeout(done, 250);
  });
});
```
#### 生成报告
- spec
- dot
- nyan
- tap
- landing
- list
- progress
- json
- json-stream
- min
- doc
- markdown
- xunit
- html
#### TODO
BDD/TDD