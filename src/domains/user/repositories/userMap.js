import User from '../entities/user';

class UserMap {
  static getUser(userDoc) {
    if (!userDoc) {
      return null;
    }
    const user = new User(userDoc);
    return user;
  }
}

export default UserMap;
