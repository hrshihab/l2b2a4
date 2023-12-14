import { Types } from 'mongoose'
import { z } from 'zod'

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid ObjectId format for courseId',
    }),
    rating: z.number(),
    review: z.string(),
  }),
})

export const ReviewValidation = {
  createReviewValidationSchema,
}
