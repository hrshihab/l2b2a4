import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessage = ''
  let errorDetails = {}

  if (err instanceof ZodError) {
    const simplifierError = handleValidationError(err)
    statusCode = simplifierError?.statusCode
    message = simplifierError?.message
    errorMessage = simplifierError?.errorMessage
    errorDetails = simplifierError?.errorDetails
  } else if (err?.name === 'CastError') {
    const simplifierError = handleCastError(err)
    statusCode = simplifierError?.statusCode
    message = simplifierError?.message
    errorMessage = simplifierError?.errorMessage
    errorDetails = simplifierError?.errorDetails
  } else if (err?.code === 11000) {
    const simplifierError = handleCastError(err)
    statusCode = simplifierError?.statusCode
    message = simplifierError?.message
    errorMessage = simplifierError?.errorMessage
    errorDetails = simplifierError?.errorDetails
  } else if (err instanceof Error) {
    errorMessage = err.message
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err?.stack ? err.stack : null,
  })
}

export default globalErrorHandler
