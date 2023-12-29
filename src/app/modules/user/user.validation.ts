import { z } from 'zod'
import { userRole } from './user.constant'

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    role: z.enum([...userRole] as [string, ...string[]]),
  }),
})

const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'UserName is required! ' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'Current password in required',
    }),
    newPassword: z.string({ required_error: 'New Password is required !' }),
  }),
})

export const Validation = {
  createUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
}
