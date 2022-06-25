export default class UnauthorizedError extends Error {
  constructor() {
    super("Do you have an account? Did you type all the correct data?");

    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
