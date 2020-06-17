class Result {
  constructor(error, message = '', data) {
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
