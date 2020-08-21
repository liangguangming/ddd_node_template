import User from '../domains/entities/user';

export default class AbstractUserRepository {
  async getUserById(id = '') {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser({ id });
  }

  async getUserByName(name) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser({ name });
  }

  async createUser(userProps) {
    if (this instanceof AbstractUserRepository) {
      throw new Error('未实现该方法');
    }
    return User.createUser(userProps);
  }
}
