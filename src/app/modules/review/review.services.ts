/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { User } from '../user/user.model'
import { TReview } from './review.interface'
import { Review } from './review.model'

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
        _id: { $toObjectId: '$courseId' },
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
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'courseData',
      },
    },
    {
      $unwind: '$courseData',
    },
    {
      $project: {
        _id: '$courseData._id',
        title: '$courseData.title',
        instructor: '$courseData.instructor',
        categoryId: '$courseData.categoryId',
        price: '$courseData.price',
        tags: {
          $filter: {
            input: '$courseData.tags',
            as: 'tag',
            cond: { $ne: ['$$tag.isDeleted', true] },
          },
        },
        startDate: '$courseData.startDate',
        endDate: '$courseData.endDate',
        language: '$courseData.language',
        provider: '$courseData.provider',
        createdBy: '$courseData.createdBy',
        durationInWeeks: '$courseData.durationInWeeks',
        details: '$courseData.details',
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]

  const result = await Review.aggregate(aggregationPipeline)
  //console.log(result)

  // If you want to populate additional fields from 'courses' collection, specify the path and select options
  const populatedResult = await Review.populate(result, {
    path: 'createdBy', // Replace 'createdBy' with the actual path you want to populate
    select: '_id username email role', // Specify the fields to populate
  })
  //console.log(populatedResult)

  return populatedResult[0]
}

export const ReviewServices = {
  createReviewIntoDB,
  getBestCourseFromDB,
}
