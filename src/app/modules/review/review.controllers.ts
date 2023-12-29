import { Request, Response } from 'express'
import { ReviewServices } from './review.services'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createReview = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body)
  const allData = await ReviewServices.createReviewIntoDB(
    req.body,
    req.user.username,
  )

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review are created successfully',
    data: allData,
  })
})

const getBestCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getBestCourseFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Best course retrieved successfully',
    data: result,
  })
})

export const ReviewControllers = {
  createReview,
  getBestCourse,
}
