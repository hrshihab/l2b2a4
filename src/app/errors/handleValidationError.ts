import { ZodError, ZodIssue, z } from 'zod'
import { NextFunction, Request, Response } from 'express'

const handleValidationError = (error: ZodError) => {
  const statusCode = 400
  const errorMessage = 'Validation Error'
  const errorDetails = {
    issues: error.errors.map((err: ZodIssue) => ({
      expected: err.expected,
      received: err.received,
      code: err.code,
      path: err.path,
      message: err.message,
    })),
    name: error.constructor.name,
  }

  return {
    statusCode,
    message: errorMessage,
    errorMessage: error.errors.map((err) => err.message).join('. '),
    errorDetails,
  }
}

export default handleValidationError
