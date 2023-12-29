import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/appError'
import httpStatus from 'http-status'
import config from '../config'
import { User } from '../modules/user/user.model'
import UnauthorizedError from '../errors/unAuthorizedError'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new UnauthorizedError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.',
      )
    }
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload
    const { username, role, iat } = decoded
    //console.log(iat)

    const user = await User.isUserExists(username)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }
    //console.log('user.passwordChangedAt:', user.passwordChangedAt)

    if (
      user.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new UnauthorizedError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource. !',
      )
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new UnauthorizedError(
        httpStatus.UNAUTHORIZED,
        'You do not have the necessary permissions to access this resource.!',
      )
    }
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
