export class CellError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CellError";
  }
}
