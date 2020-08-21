import mongoose from 'mongoose';
import UserMap from '../mappers/userMap';
import AbstractUserRepository from './userAbtractRepository';

const userSchema = new mongoose.Schema({ name: String, age: Number });
const BaseUserModel = mongoose.model('user', userSchema);

class UserRepository extends AbstractUserRepository {
  constructor() {
    super();
    this.model = BaseUserModel;
  }

  /**
   * 获取用户
   * @param {String} id User对象ID
   */
  async getUserById(id) {
    const userDoc = await this.model.findById(id);
    const user = UserMap.toDomain(userDoc);
    return user;
  }

  async getUserByName(name) {
    const userDoc = await this.model.findOne({ name });
    const user = UserMap.toDomain(userDoc);
    return user;
  }

  /**
   * 创建用户
   * @param {{ age: number, name: string }} userProps
   */
  async createUser(userProps) {
    const userDoc = await this.model.create(userProps);
    const user = UserMap.toDomain(userDoc);
    return user;
  }
}

export default UserRepository;
