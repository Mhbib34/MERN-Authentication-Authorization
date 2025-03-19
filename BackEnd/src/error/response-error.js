class ResponseError extends Error {
  constructor(status, message) {
    super(typeof message === "string" ? message : JSON.stringify(message)); // Pastikan string
    this.status = status;
  }
}

export { ResponseError };
