import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { UserServices } from './user.services'
import sendResponse from '../../utils/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})
const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.changePasswordIntoDB(req.user, req.body)
  //console.log(result)

  sendResponse(res, result)
})

export const UserControllers = {
  createUser,
  loginUser,
  changePassword,
}
