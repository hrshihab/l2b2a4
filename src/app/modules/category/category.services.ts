import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { User } from '../user/user.model'
import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryIntoDB = async (
  payload: TCategory,
  adminUserName: string,
) => {
  const admin = await User.findOne({ username: adminUserName })
  if (!admin) {
    throw new AppError(httpStatus.FORBIDDEN, 'Admin information not found')
  }
  //console.log(admin)
  const result = await Category.create({ ...payload, createdBy: admin._id })
  return result
}

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate({
    path: 'createdBy',
    select: '_id username email role',
  })
  return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
}
