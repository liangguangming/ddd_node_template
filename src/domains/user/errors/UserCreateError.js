import RESULT_CODE from '../valueObjects/resultCode';

class UserCreateError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_CREATE_ERROR';
    this.code = RESULT_CODE.USER_CREATE_ERROR;
  }
}

export default UserCreateError;
