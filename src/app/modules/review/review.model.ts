import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const createReviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Course ID is required'],
      ref: 'Course',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Review must be needed'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export const Review = model<TReview>('Review', createReviewSchema)
