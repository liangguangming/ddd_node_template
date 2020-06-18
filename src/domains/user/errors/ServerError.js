import RESULT_CODE from '../valueObjects/resultCode';

class ServerError extends Error {
  constructor() {
    super();
    this.message = '服务器错误';
    this.name = 'SERVER_ERROR';
    this.code = RESULT_CODE.SERVER_ERROR;
  }
}

export default ServerError;
