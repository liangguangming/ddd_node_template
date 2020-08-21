// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';

class CreateUserDTO {
  /**
   * 创建用户CTO
   * @param {{name: string, age?: number, id?: string | mongoose.Types.ObjectId }} Object userInfo
   */
  constructor({ name, age, id }) {
    this.name = name;
    this.age = age;
    this.id = id;
  }
}

export default CreateUserDTO;
