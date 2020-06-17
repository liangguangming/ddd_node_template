class UserCreateError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = 'USER_CREATE_ERROR';
  }
}

export default UserCreateError;
