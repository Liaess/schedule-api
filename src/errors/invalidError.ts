export default class InvalidError extends Error {
  constructor(message: string) {
    super(`${message}`);

    this.name = "InvalidError";
    Object.setPrototypeOf(this, InvalidError.prototype);
  }
}
