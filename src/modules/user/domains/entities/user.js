/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
import mongoose from 'mongoose';
import UserCreateError from '../../useCases/errors/UserCreateError';
import CreateUserEvent from '../events/createUserEvent';
import Entity from '../../../../share/core/Entity';

class User extends Entity {
  /**
   * 用户信息
   * @param {{ _id: mongoose.Types.ObjectId, name: String, age?: Number }} props 用户信息
   */
  constructor(props) {
    super(props);
    this.initEvent();
  }

  get id() {
    return this.props._id;
  }

  set id(val) {
    this.props._id = val;
  }

  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  set name(val) {
    this.props.name = val;
  }

  set age(val) {
    this.props.age = val;
  }

  initEvent() {
    this.addEvent({
      name: new CreateUserEvent().name,
      handler: (event) => {
        User.printEvent(event);
      },
    });
  }

  static printEvent(event) {
    console.log('触发事件: ', event);
  }

  /**
   * 用户信息
   * @param {{ name: String, age?: Number }} props 用户信息
   * @param { string } id 用户ID
   */
  static createUser(props = {}, id) {
    if (!props.name) {
      throw new UserCreateError('缺少名字: name');
    }
    const finalId = id || User.createObjectId();
    const user = new User({ _id: finalId, ...props });
    if (!id) {
      user.fireEvent(new CreateUserEvent(user.toValueObject()));
    }

    return user;
  }
}

export default User;
