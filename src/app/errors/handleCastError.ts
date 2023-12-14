import mongoose from 'mongoose'
import { TGenericErrorResponse } from '../interface/error'

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = 400
  const errorMessage = `${err.value} is not a valid ID!`
  const errorDetails = err

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails,
  }
}

export default handleCastError
