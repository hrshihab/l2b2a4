import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload)
  const createdReview = await Review.findById(result._id).select('-__v') // Use select to include/exclude fields
  return createdReview
}

export const ReviewServices = {
  createReviewIntoDB,
}
