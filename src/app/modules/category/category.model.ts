import { Schema } from 'mongoose'
import { TCategory } from './category.interface'
import { model } from 'mongoose'

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Category Name is required and Unique'],
  },
})

// categorySchema.pre('save', async function (next) {
//   const isCategoryExists = await Category.findOne({
//     name: this.name,
//   })
//   if (isCategoryExists) {
//     throw new Error('Category is already exists')
//   }
//   next()
// })

export const Category = model<TCategory>('Category', categorySchema)
