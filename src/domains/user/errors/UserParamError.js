import RESULT_CODE from '../valueObjects/resultCode';

class UserParamError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_PARAM_ERROR';
    this.code = RESULT_CODE.USER_PARAM_ERROR;
  }
}

export default UserParamError;
