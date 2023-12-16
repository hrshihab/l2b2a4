import { TCategory } from './category.interface'
import { Category } from './category.model'

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

const getAllCategoriesFromDB = async () => {
  const result = await Category.find().select('_id name')
  return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
}
