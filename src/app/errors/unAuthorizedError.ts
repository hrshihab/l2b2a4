class UnauthorizedError extends Error {
  public statusCode: number

  constructor(statusCode: number, message: string, stack = null) {
    super(message)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    }
  }
}

export default UnauthorizedError
