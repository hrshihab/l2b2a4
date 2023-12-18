import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload)
  const createdReview = await Review.findById(result._id).select('-__v') // Use select to include/exclude fields
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
        durationInWeeks: '$courseData.durationInWeeks',
        details: '$courseData.details',
        averageRating: 1,
        reviewCount: 1,
      },
    },
  ]

  const result = await Review.aggregate(aggregationPipeline)
  return result[0]
  //console.log(result)
}

export const ReviewServices = {
  createReviewIntoDB,
  getBestCourseFromDB,
}
