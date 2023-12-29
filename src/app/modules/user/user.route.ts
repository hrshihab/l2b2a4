import express from 'express'
import { Validation } from './user.validation'
import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/userAuth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.post(
  '/register',
  // auth(USER_ROLE.user),
  validateRequest(Validation.createUserValidationSchema),
  UserControllers.createUser,
)
router.post(
  '/login',
  validateRequest(Validation.loginUserValidationSchema),
  UserControllers.loginUser,
)
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(Validation.changePasswordValidationSchema),
  UserControllers.changePassword,
)

export const UserRoutes = router
