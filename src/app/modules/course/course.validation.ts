import { z } from 'zod'

const TagsValidation = z.object({
  name: z.string({
    invalid_type_error: 'Tag name must be a string',
    required_error: 'Tag name is required',
  }),
  isDeleted: z.boolean({
    invalid_type_error: 'isDeleted must be a boolean',
    required_error: 'Delete condition is required',
  }),
})

const DetailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().min(1).optional(),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(TagsValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string().min(1),
    provider: z.string().min(1),
    durationInWeeks: z.number().optional(),
    details: DetailsSchema,
  }),
})
const UpdateTagsValidation = z.object({
  name: z
    .string({
      invalid_type_error: 'Tag name must be a string',
      required_error: 'Tag name is required',
    })
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be a boolean',
      required_error: 'Delete condition is required',
    })
    .optional(),
})

const UpdateDetailsSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z.string().min(1).optional(),
})

const UpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(UpdateTagsValidation).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().min(1).optional(),
    provider: z.string().min(1).optional(),
    durationInWeeks: z.number().optional().optional(),
    details: UpdateDetailsSchema.optional(),
  }),
})

export const CourseValidation = {
  createCourseValidationSchema,
  UpdateCourseValidationSchema,
}
