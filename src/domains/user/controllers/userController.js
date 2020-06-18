import EmailService from '../services/email';
import UserRepository from '../repositories/user';
import User from '../entities/user';
import Result from '../valueObjects/result';
import UserParamError from '../errors/UserParamError';
import UserCreateError from '../errors/UserCreateError';
import ServerError from '../errors/ServerError';

// 用例入口
class UserController {
  /**
   * 查询某个用户
   * @param { String } 用户ID
   */
  static async getUserById(id) {
    let result;
    if (!id) {
      result = new Result(new UserParamError('缺少用户ID'), '缺少用户ID');
      return result;
    }
    const user = await UserRepository.getUserById(id);
    result = new Result(null, `获取到${id}用户的信息`, user.toValueObject());
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
      user = await UserRepository.createUser(user.toValueObject());
      EmailService.sendConfig(user);
      result = new Result(null, '创建用户成功', user.toValueObject());
    } catch (error) {
      if (error instanceof UserCreateError) {
        result = new Result(error, '创建用户失败');
      } else {
        console.error('server_error: \n', 'req: ', userProps, '\nerror: ', error);
        result = new Result(new ServerError(), '创建用户失败');
      }
    }

    return result;
  }
}

export default UserController;
