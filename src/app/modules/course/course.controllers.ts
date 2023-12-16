import { Request, Response, response } from 'express'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDB(req.body)
  console.log(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)
  res.json(result)
  //console.log(result)
})

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  })
})

const getCourseWithReview = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params
  const { data, reviews } =
    await CourseServices.getCourseWithReviewsIntoDB(courseId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: {
      course: data,
      reviews,
    },
  })
})

export const CourseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getCourseWithReview,
}
