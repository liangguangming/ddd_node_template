class Result {
  constructor(code, message = '', data, error) {
    this.code = code;
    this.message = message;
    if (data) {
      this.data = data;
    }
    if (error) {
      this.error = error;
    }
  }
}

export default Result;
