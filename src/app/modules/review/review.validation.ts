import { z } from 'zod'

const createReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: 'Invalid ObjectId format for courseId',
      required_error: 'Course ID is required',
    }),
    rating: z.number(),
    review: z.string(),
  }),
})

export const ReviewValidation = {
  createReviewValidationSchema,
}
