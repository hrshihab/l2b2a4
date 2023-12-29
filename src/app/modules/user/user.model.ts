import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'user name is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      select: 0,
    },
    passwordHistory: {
      type: [
        {
          passwordUpdate: {
            type: String,
            required: true,
          },
          lastUpdateTime: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

userSchema.statics.isUserExists = async function (username: string) {
  return await User.findOne({ username }).select(
    '+password +passwordHistory +passwordChangedAt',
  )
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  //console.log('passwordChangedTime:', passwordChangedTime)
  //console.log('jwtIssuedTimestamp:', jwtIssuedTimestamp)
  return passwordChangedTime > jwtIssuedTimestamp
}

export const User = model<TUser, UserModel>('User', userSchema)
