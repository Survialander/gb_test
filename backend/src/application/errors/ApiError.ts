export class APIError extends Error {
  public status: number;

  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = "APIError";
  }
}
