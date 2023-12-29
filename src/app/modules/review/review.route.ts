import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewControllers } from './review.controllers'
import auth from '../../middlewares/userAuth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/reviews',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewControllers.createReview,
)
router.get('/course/best', ReviewControllers.getBestCourse)
export const ReviewRoutes = router
