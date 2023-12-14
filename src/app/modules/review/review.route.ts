import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewControllers } from './review.controllers'

const router = express.Router()

router.post(
  '/',
  validateRequest(ReviewValidation.createReviewValidationSchema),
  ReviewControllers.createReview,
)

export const ReviewRoutes = router
