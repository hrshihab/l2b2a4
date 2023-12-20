import { Request, Response } from 'express'
import { CategoryServices } from './category.services'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  //console.log(req.body)
  const result = await CategoryServices.createCategoryIntoDB(req.body)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category is created successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Category is retrieved successfully',
    data: result,
  })
})
export const CategoryControllers = {
  createCategory,
  getAllCategories,
}
