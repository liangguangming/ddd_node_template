import UserCreateError from '../errors/UserCreateError';
import DomainEventEmitter from '../../../core/DomainEventEmitter';
import CreateUserEvent from '../domainEvents/createUserEvent';

class User extends DomainEventEmitter {
  /**
   * 用户信息
   * @param {{ name: String, age?: Number }} props 用户信息
   */
  constructor(props) {
    super();
    this.props = props;
    this.initEvent();
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
   */
  static createUser(props) {
    if (!props.name) {
      throw new UserCreateError('缺少名字: name');
    }
    const user = new User(props);
    user.fireEvent(new CreateUserEvent(this.toValueObject()));

    return user;
  }

  toValueObject() {
    return {
      name: this.name,
      age: this.age,
    };
  }
}

export default User;
