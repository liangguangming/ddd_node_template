import mongoose from 'mongoose';
import UserMap from '../mappers/userMap';

const userSchema = new mongoose.Schema({ name: String, age: Number });
const BaseUserModel = mongoose.model('user', userSchema);

class UserRepository {
  /**
   * 获取用户
   * @param {String} id User对象ID
   */
  static async getUserById(id) {
    const userDoc = await BaseUserModel.findById(id);
    const user = UserMap.getUser(userDoc);
    return user;
  }

  static async getUserByName(name) {
    const userDoc = await BaseUserModel.findOne({ name });
    const user = UserMap.getUser(userDoc);
    return user;
  }

  static async createUser(userProps) {
    const userDoc = await BaseUserModel.create(userProps);
    const user = UserMap.getUser(userDoc);
    return user;
  }
}

export default UserRepository;
