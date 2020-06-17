import EmailService from '../services/email';
import UserRepository from '../repositories/user';
import User from '../entities/user';
import Result from '../valueObjects/result';
import UserParamError from '../errors/UserParamError';
import RESULT_CODE from '../valueObjects/resultCode';

// 用例入口
class UserController {
  /**
   * 查询某个用户
   * @param { String } 用户ID
   */
  static async getUserById(id) {
    let result;
    if (!id) {
      result = new Result(RESULT_CODE.USER_PARAM_ERROR, '缺少用户ID', null, new UserParamError('缺少用户ID'));
      return result;
    }
    const user = await UserRepository.getUserById(id);
    result = new Result(200, `获取到${id}用户的信息`, user.toValueObject(), null);
    return result;
  }

  /**
   * 新增用户
   * @param {Object} userProps 用户信息
   */
  static async createUser(userProps) {
    let user;
    let result;
    try {
      user = User.createUser(userProps);
    } catch (error) {
      result = new Result(RESULT_CODE.USER_CREATE_ERROR, '创建用户失败', null, error);
      return result;
    }
    user = await UserRepository.createUser(user.toValueObject());
    EmailService.sendConfig(user);
    result = new Result(200, '创建用户成功', user.toValueObject(), null);
    return result;
  }
}

export default UserController;
