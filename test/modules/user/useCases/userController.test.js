const powerAssert = require('power-assert');
const randomStr = require('string-random');
const {
  describe,
  it,
  before,
  after,
} = require('mocha');
const mongoose = require('mongoose');
const sinon = require('sinon');

const { default: UserController } = require('../../../../src/modules/user/useCases/userController');
const { default: UserParamError } = require('../../../../src/modules/user/useCases/errors/UserParamError');
const { default: Result } = require('../../../../src/modules/user/domains/valueObjects/result');
const { default: UserRepository } = require('../../../../src/modules/user/repositories/user');
const { default: UserNotFoundError } = require('../../../../src/modules/user/useCases/errors/UserNotFoundError');
const { default: ServerError } = require('../../../../src/share/errors/ServerError');
const { default: User } = require('../../../../src/modules/user/domains/entities/user');
const { default: DataValidateError } = require('../../../../src/share/errors/DataValidateError');
const { default: UserCreateError } = require('../../../../src/modules/user/useCases/errors/UserCreateError');
const { default: UserMap } = require('../../../../src/modules/user/mappers/userMap');

describe('User', () => {
  describe('getUserById', function getUserByIdTest() {
    const userId = mongoose.Types.ObjectId().toHexString();
    const noneExistUserId = mongoose.Types.ObjectId().toHexString();
    const otherErrorId = mongoose.Types.ObjectId().toHexString();

    const getNormalUserByIdData = {
      id: userId,
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    before((done) => {
      const getUserByIdStub = sinon.stub(UserRepository, 'getUserById');
      getUserByIdStub.withArgs(userId).resolves(getNormalUserByIdData);
      getUserByIdStub.withArgs(noneExistUserId).resolves(null);
      getUserByIdStub.withArgs(otherErrorId).throwsException('Mongodb');
      done();
    });

    this.timeout(3000);

    it('should return UserParamError when the id is not present', async () => {
      let id;
      const result = await UserController.getUserById(id);
      const error = new UserParamError('缺少用户ID');
      powerAssert.deepStrictEqual(result, new Result(error, `获取用户 ${id} 信息失败`));
    });

    it('should return UserParamError when the id is invalid', async () => {
      const invalidId = `${mongoose.Types.ObjectId().toHexString()}d`;
      const result = await UserController.getUserById(invalidId);
      const error = new UserParamError('用户ID不对');
      powerAssert.deepStrictEqual(result, new Result(error, `获取用户 ${invalidId} 信息失败`));
    });

    it('get a not exist user', async () => {
      const result = await UserController.getUserById(noneExistUserId);
      const error = new UserNotFoundError();
      powerAssert.deepStrictEqual(result, new Result(error, `获取用户 ${noneExistUserId} 信息失败`));
    });

    it('other Error', async () => {
      const result = await UserController.getUserById(otherErrorId);
      const error = new ServerError();
      powerAssert.deepStrictEqual(result, new Result(error, '获取用户失败'));
    });

    it('get normal user', async () => {
      const result = await UserController.getUserById(userId);
      powerAssert.deepStrictEqual(result, new Result(null, `获取到${userId}用户的信息`, getNormalUserByIdData));
    });
  });

  describe('createUser', () => {
    const normalUserProps = {
      id: mongoose.Types.ObjectId(),
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    const noNameProps = {
      id: mongoose.Types.ObjectId(),
      age: Math.floor(Math.random() * 100),
    };

    const existUserProps = {
      id: mongoose.Types.ObjectId(),
      name: randomStr(10),
      age: Math.floor(Math.random() * 100),
    };

    before(() => {
      const getUserByNameStub = sinon.stub(UserRepository, 'getUserByName');
      getUserByNameStub.withArgs(normalUserProps.name).resolves(null);
      getUserByNameStub.withArgs(existUserProps.name).resolves(existUserProps);

      const createUserStub = sinon.stub(UserRepository, 'createUser');
      const user = User.createUser(normalUserProps);
      createUserStub.withArgs(UserMap.toRepository(user)).resolves(user);
    });

    it('not UserName', async () => {
      const result = await UserController.createUser(noNameProps);
      const error = new DataValidateError('not Name', 'not Name');
      result.error.message = error.message;
      powerAssert.deepStrictEqual(result, new Result(error, '创建用户失败'));
    });

    it('exist User', async () => {
      const result = await UserController.createUser(existUserProps);
      const error = new UserCreateError('用户名重复');
      powerAssert.deepStrictEqual(result, new Result(error, '创建用户失败'));
    });

    it('normal create user', async () => {
      const result = await UserController.createUser(normalUserProps);
      powerAssert.deepStrictEqual(result, new Result(null, '创建用户成功', UserMap.toDTO(User.createUser(normalUserProps))));
    });
  });
});

after(() => {
  sinon.restore();
});
