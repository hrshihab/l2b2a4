import { Category } from './category.model'
import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CategoryValidation } from './category.validation'
import { CategoryControllers } from './category.controllers'

const router = express.Router()

router.post(
  '/',
  validateRequest(CategoryValidation.createCategoryValidation),
  CategoryControllers.createCategory,
)
router.get('/', CategoryControllers.getAllCategories)

export const CategoryRoutes = router
