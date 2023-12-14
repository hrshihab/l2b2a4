import { z } from 'zod'
const createCategoryValidation = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const CategoryValidation = {
  createCategoryValidation,
}
