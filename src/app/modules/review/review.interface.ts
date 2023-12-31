import { Types } from 'mongoose'

export type TReview = {
  courseId: string
  rating: number
  review: string
  createdBy?: Types.ObjectId
}
