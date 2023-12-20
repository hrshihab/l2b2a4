/* eslint-disable @typescript-eslint/no-explicit-any */
// handleDuplicateError.ts
import { TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //console.log('Duplicate Error:', err)
  const match = err.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[1]

  const statusCode = 400
  const errorMessage = 'Duplicate Error'
  const errorDetails = {
    index: err.index,
    code: err.code,
    keyPattern: err.keyPattern,
    keyValue: err.keyValue,
  }

  return {
    statusCode,
    message: errorMessage,
    errorMessage: `${errorMessage}: ${extractedMessage} is already exists`,
    errorDetails,
  }
}

export default handleDuplicateError
