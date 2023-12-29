import bcrypt from 'bcrypt'
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { TChangePassword, TLoginUser, TUser } from './user.interface'
import { User } from './user.model'
import { createToken } from './user.utils'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'

const createUserIntoDB = async (payload: TUser) => {
  try {
    const user = await User.create(payload)
    // Fetch the user with selected fields
    const filteredUser = await User.findOne({ _id: user._id })

    if (!filteredUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    return filteredUser
  } catch (error: any) {
    throw new Error(error)
  }
}

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matching')
  }

  const userData = await User.findOne({ username: payload.username })
  //console.log(userData)
  const jwtPayload = {
    username: user.username,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // );
  return {
    user: {
      _id: userData?._id,
      username: userData?.username,
      email: userData?.email,
      role: userData?.role,
    },
    token: accessToken,
  }
}

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await User.isUserExists(userData.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  if (!(await User.isPasswordMatched(payload.currentPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not matched!')
  }

  if (await User.isPasswordMatched(payload.newPassword, user.password)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'New Password can not same with the current password',
    )
  }

  let lastMatchingPassword
  let lastMatchingPasswordTime = new Date()

  if (user && user.passwordHistory) {
    for (const lastPass of user.passwordHistory.reverse()) {
      const isMatch = await bcrypt.compare(
        payload.newPassword,
        lastPass.passwordUpdate,
      )

      if (isMatch) {
        lastMatchingPassword = lastPass.passwordUpdate
        lastMatchingPasswordTime = lastPass.lastUpdateTime
        break // Break out of the loop once a match is found
      }
    }
  }
  //console.log(lastMatchingPasswordTime)
  if (lastMatchingPassword) {
    // Format the Date object to the desired output format
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    const outputDateStr = lastMatchingPasswordTime.toLocaleString(
      'en-US',
      options,
    )

    return {
      success: false,
      statusCode: 400,
      message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${outputDateStr})`,
      data: null,
    }
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  // Check if there is existing password history
  const passwordHistory = user.passwordHistory || []
  //console.log(passwordHistory)

  // Manually shift elements in the array
  if (passwordHistory.length > 0) {
    //console.log('working')
    passwordHistory[1] = passwordHistory[0]
  }

  passwordHistory[0] = {
    passwordUpdate: user.password,
    lastUpdateTime: user.passwordChangedAt || new Date(),
  }

  //console.log(passwordHistory)

  const result = await User.findOneAndUpdate(
    {
      username: userData.username,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      passwordHistory,
    },
  )

  return {
    success: true,
    statusCode: 200,
    message: `Password changed successfully`,
    data: result,
  }
}

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  changePasswordIntoDB,
}
