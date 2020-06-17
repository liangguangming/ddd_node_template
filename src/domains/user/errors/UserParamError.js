class UserParamError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_PARAM_ERROR';
  }
}

export default UserParamError;
