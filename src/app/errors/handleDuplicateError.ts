import { TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/)
  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]

  const statusCode = 400
  const errorMessage = `${extractedMessage} is already exists`
  const errorDetails = {}

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails,
  }
}

export default handleDuplicateError
