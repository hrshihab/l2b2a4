/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TRole = 'user' | 'admin'
export type TPasswordUpdate = {
  passwordUpdate: string
  lastUpdateTime: Date
}

export type TUser = {
  username: string
  email: string
  passwordChangedAt?: Date
  passwordHistory?: TPasswordUpdate[]
  password: string
  role: TRole
}

export type TLoginUser = {
  username: string
  password: string
}

export type TChangePassword = {
  currentPassword: string
  newPassword: string
}
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(username: string): Promise<TUser>
  // eslint-disable-next-line no-unused-vars
  isPasswordMatched(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
