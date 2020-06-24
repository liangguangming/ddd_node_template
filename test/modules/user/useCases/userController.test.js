const powerAssert = require('power-assert');
const { describe, it } = require('mocha');
const mongoose = require('mongoose');
const { default: UserController } = require('../../../../src/modules/user/useCases/userController');
const { default: UserParamError } = require('../../../../src/modules/user/useCases/errors/UserParamError');
const { default: Result } = require('../../../../src/modules/user/domains/valueObjects/result');

describe('User', () => {
  describe('getUserById', function testUserById() {
    this.timeout(3000);
    // 模拟数据
    // const ids = [q

    // ]

    it('should return UserParamError when the id is not present', async () => {
      const result = await UserController.getUserById();
      const error = new UserParamError('缺少用户ID');
      powerAssert.deepStrictEqual(result, new Result(error, '获取用户 undefined 信息失败'));
    });
    it('should return UserParamError when the id is invalid', async () => {
      const invalidId = `${mongoose.Types.ObjectId().toHexString()}d`;
      const result = await UserController.getUserById(invalidId);
      const error = new UserParamError('用户ID不对');
      powerAssert.deepStrictEqual(result, new Result(error, `获取用户 ${invalidId} 信息失败`));
    });

    // TODO: 模拟数据库中获取的数据
  });
});
