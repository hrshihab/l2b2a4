/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, ZodIssue } from 'zod'

// interface ConditionalZodIssue extends ZodIssue {
//   expected?: any
//   received?: any
// }
const handleValidationError = (error: ZodError) => {
  const statusCode = 400
  const errorDefaultMessage = 'Validation Error'
  const errorDetails = {
    issues: error.errors.map((err: ZodIssue) => {
      // Use a type guard or conditional check
      if ('expected' in err && 'received' in err) {
        // Handle ZodIssue
        return {
          expected: err.expected,
          received: err.received,
          code: err.code,
          path: err.path,
          message: err.message,
        }
      } else {
        // Handle other cases
        return {
          code: err.code,
          path: err.path,
          message: err.message,
        }
      }
    }),
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
