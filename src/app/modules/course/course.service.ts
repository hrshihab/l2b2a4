import mongoose from 'mongoose'
import { TCourse } from './course.interface'
import Course from './course.model'

const createCourseIntoDB = async (payload: TCourse) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newCourse = await Course.create([payload], { session })
    if (!newCourse.length) {
      throw new Error('Failed to create new Course')
    }
    await session.commitTransaction()
    await session.endSession()

    return newCourse
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query

  const pageNumber = parseInt(page as string, 10)
  const limitNumber = parseInt(limit as string, 10)
  const skip = (pageNumber - 1) * limitNumber

  // Build filter object
  const filter: any = {}

  if (minPrice && maxPrice) {
    filter.price = {
      $gte: parseFloat(minPrice as string),
      $lte: parseFloat(maxPrice as string),
    }
  }

  if (tags) {
    // Assuming tags are provided as a comma-separated string
    const tagsArray = (tags as string).split(',')
    filter['tags.name'] = { $in: tagsArray }
  }

  if (startDate) {
    filter.startDate = { $gte: new Date(startDate as string) }
  }

  if (endDate) {
    filter.endDate = { $lte: new Date(endDate as string) }
  }

  if (language) {
    filter.language = language
  }

  if (provider) {
    filter.provider = provider
  }

  if (durationInWeeks) {
    filter.durationInWeeks = parseInt(durationInWeeks as string, 10)
  }

  if (level) {
    filter['details.level'] = level
  }

  // Build sort object
  const sort: any = {}

  if (sortBy && sortOrder) {
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1
  }

  // Query MongoDB
  const courses = await Course.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limitNumber)

  // Get total count for pagination meta
  const total = await Course.countDocuments(filter)

  // Prepare response
  const response = {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: courses,
  }

  return response
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
}
