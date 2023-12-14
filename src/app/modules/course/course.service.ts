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

export const CourseServices = {
  createCourseIntoDB,
}
