import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CategoryValidation } from './category.validation'
import { CategoryControllers } from './category.controllers'
import auth from '../../middlewares/userAuth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryControllers.createCategory,
)
router.get('/', CategoryControllers.getAllCategories)

export const CategoryRoutes = router
