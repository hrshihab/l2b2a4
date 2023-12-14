import { Request, Response } from 'express'
import { ReviewServices } from './review.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createReview = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body)
  const result = await ReviewServices.createReviewIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review are created successfully',
    data: result,
  })
})

export const ReviewControllers = {
  createReview,
}
