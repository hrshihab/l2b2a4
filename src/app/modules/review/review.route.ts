import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewControllers } from './review.controllers'

const router = express.Router()

router.post(
  '/reviews',
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewControllers.createReview,
)
router.get('/course/best', ReviewControllers.getBestCourse)
export const ReviewRoutes = router
