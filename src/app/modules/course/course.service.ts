import mongoose from 'mongoose'
import { TCourse } from './course.interface'
import Course from './course.model'
import { Review } from '../review/review.model'

const createCourseIntoDB = async (payload: TCourse) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // Filter out tags with isDeleted: true
    const filteredTags = payload.tags.filter((tag) => !tag.isDeleted)
    payload.tags = filteredTags

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
  console.log('Received query:', query)
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
  } else {
    if (minPrice) {
      filter.price = { $gte: parseFloat(minPrice as string) }
    }
    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice as string) }
    }
  }

  if (tags) {
    // Assuming tags are provided as a comma-separated string
    const tagsArray = (tags as string).split(',')
    filter['tags.name'] = { $in: tagsArray }
  }

  if (startDate && endDate) {
    // Both startDate and endDate are provided
    filter.startDate = { $gte: startDate }
    filter.endDate = { $lte: endDate }
  } else {
    if (startDate) {
      // Only startDate is provided
      filter.startDate = { $gte: startDate }
    }
    if (endDate) {
      // Only endDate is provided
      filter.endDate = { $lte: endDate }
    }
  }

  if (language) {
    filter.language = language
  }

  if (provider) {
    filter.provider = provider
  }

  if (durationInWeeks) {
    filter.durationInWeeks = parseInt(durationInWeeks as string)
  }

  if (level) {
    filter['details.level'] = level
  }

  console.log('Constructed filter:', filter)

  // Build sort object
  const sort: any = {}

  if (sortBy && sortOrder) {
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1
  }
  const allCourses = await Course.find(filter).sort(sort)
  console.log('All courses:', allCourses)

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
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { details, tags, startDate, endDate, ...rest } = payload
  const modifiedData: Record<string, unknown> = { ...rest }

  // Handle updating 'details' if provided
  if (details && Object.keys(details).length) {
    modifiedData.details = { ...modifiedData.details, ...details }
  }

  // Handle updating 'tags' if provided
  if (tags && Array.isArray(tags)) {
    // Fetch existing tags from the database
    const existingCourse = await Course.findById(id)
    const existingTags: any[] = existingCourse?.tags || []

    // Remove tags marked for deletion from the database
    const tagsToDelete = tags.filter((tag) => tag.isDeleted === true)
    tagsToDelete.forEach((tagToDelete) => {
      const index = existingTags.findIndex(
        (existingTag) => existingTag.name === tagToDelete.name,
      )
      if (index !== -1) {
        existingTags.splice(index, 1)
      }
    })

    // Update 'isDeleted' for matching tags or add new tags
    const updatedTags = existingTags.map((existingTag) => {
      const newTag = tags.find((tag) => tag.name === existingTag.name)

      if (newTag) {
        // Update 'isDeleted' only if it's false in the new tag
        existingTag.isDeleted =
          newTag.isDeleted === false ? false : existingTag.isDeleted
      }

      return existingTag
    })

    // Add new tags that don't exist in the current data and are not isDeleted: true
    tags.forEach((newTag) => {
      const existingTag = updatedTags.find((tag) => tag.name === newTag.name)

      if (!existingTag && newTag.isDeleted !== true) {
        updatedTags.push(newTag)
      }
    })

    // Update 'tags' in modifiedData
    modifiedData.tags = updatedTags
  }

  // Handle updating 'startDate' and 'endDate' and calculate 'durationInWeeks'
  if (startDate && endDate) {
    modifiedData.startDate = startDate
    modifiedData.endDate = endDate

    const start = new Date(startDate)
    const end = new Date(endDate)
    const timeDiff = Math.abs(end.getTime() - start.getTime())
    const durationInWeeks = Math.ceil(timeDiff / (1000 * 3600 * 24 * 7))

    modifiedData.durationInWeeks = durationInWeeks
  }

  console.log(id, modifiedData)

  const result = await Course.findOneAndUpdate({ _id: id }, modifiedData, {
    new: true,
    runValidators: true,
  })

  return result
}

const getCourseWithReviewsIntoDB = async (id: string) => {
  console.log(`Fetching course with ID: ${id}`)

  // Find the course by ID
  const data = await Course.findById(id)

  // If course is not found, throw an error
  if (!data) {
    throw new Error('Course not found')
  }

  console.log('Course:', data)

  // Find reviews for the course
  const reviews = await Review.find({ courseId: id }).select('-__v')

  console.log('Reviews:', reviews)

  return {
    data,
    reviews,
  }
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getCourseWithReviewsIntoDB,
}
