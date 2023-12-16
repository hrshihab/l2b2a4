import { Request, Response } from 'express'
import { ReviewServices } from './review.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createReview = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const allData = await ReviewServices.createReviewIntoDB(req.body)

  // Convert Mongoose document to a plain JavaScript object
  // const reviewData = allData?.toObject()

  // // Exclude specific fields if needed
  // const { __v, ...result } = reviewData || {}

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review are created successfully',
    data: allData,
  })
})

export const ReviewControllers = {
  createReview,
}
