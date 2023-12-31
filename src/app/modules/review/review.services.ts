/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { User } from '../user/user.model'
import { TReview } from './review.interface'
import { Review } from './review.model'
import Course from '../course/course.model'

const createReviewIntoDB = async (payload: TReview, userName: string) => {
  const userData = await User.findOne({ username: userName })
  //console.log(userData)
  if (!userData) {
    throw new AppError(httpStatus.FORBIDDEN, 'User data not found!')
  }
  const result = await Review.create({ ...payload, createdBy: userData._id })
  const createdReview = await Review.findById(result._id).populate({
    path: 'createdBy',
    select: '_id username email role',
  }) // Use select to include/exclude fields
  return createdReview
}

const getBestCourseFromDB = async () => {
  const aggregationPipeline: any = [
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
  ]

  try {
    const result = await Review.aggregate(aggregationPipeline)
    //console.log('Intermediate Result:', result)

    if (result.length === 0) {
      throw new Error('No data found for the best course.')
    }

    // Find the course by courseId
    const courseId = result[0]._id
    const courseData = await Course.findOne({ _id: courseId })

    if (!courseData) {
      throw new Error('Course not found.')
    }

    const populatedResult = {
      _id: courseData._id,
      title: courseData.title,
      instructor: courseData.instructor,
      categoryId: courseData.categoryId,
      price: courseData.price,
      tags: courseData.tags,
      startDate: courseData.startDate,
      endDate: courseData.endDate,
      language: courseData.language,
      provider: courseData.provider,
      createdBy: courseData.createdBy,
      durationInWeeks: courseData.durationInWeeks,
      details: courseData.details,
      averageRating: result[0].averageRating,
      reviewCount: result[0].reviewCount,
    }

    //console.log('Populated Result:', populatedResult)

    return populatedResult
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const ReviewServices = {
  createReviewIntoDB,
  getBestCourseFromDB,
}
