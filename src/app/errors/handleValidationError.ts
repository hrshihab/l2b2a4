import { ZodError, ZodIssue, z } from 'zod'
import { NextFunction, Request, Response } from 'express'

const handleValidationError = (error: ZodError) => {
  const statusCode = 400
  const errorDefaultMessage = 'Validation Error'
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

  const errorMessage = error.errors
    .map((err) => {
      const lastElement = err.path[err.path.length - 1]
      return `${lastElement} is required.`
    })
    .join(' ')
  return {
    statusCode,
    message: errorDefaultMessage,
    errorMessage,
    errorDetails,
  }
}

export default handleValidationError
