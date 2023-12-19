import { Schema, model } from 'mongoose'
import { TCourse, TDetails, TTags, courseModel } from './course.interface'
import { Level } from './course.constant'

const Tags = new Schema<TTags>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'Delete condition is true'],
    },
  },
  { _id: false },
)

const Details = new Schema<TDetails>(
  {
    level: {
      type: String,
      enum: {
        values: Level,
        message: '{VALUES} is not a valid level',
      },
    },
    description: {
      type: String,
      required: [true, 'Description required'],
    },
  },
  { _id: false },
)

const courseSchema = new Schema<TCourse, courseModel>({
  title: {
    type: String,

    required: [true, 'Title is required'],
    trim: true,
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'CategoryId is required'],
    ref: 'Category',
  },
  price: {
    type: Number,
    required: [true, 'Price must be mentioned'],
  },
  tags: [Tags],
  startDate: {
    type: String,
    required: [true, 'StartDate must be required'],
  },

  endDate: {
    type: String,
    required: [true, 'EndDate must be required'],
  },
  language: {
    type: String,
    required: [true, 'Language must be required'],
  },
  provider: {
    type: String,
    required: [true, 'Provider Name is required'],
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    type: Details,
    required: [true, 'Details required'],
  },
})

courseSchema.pre('save', function (next) {
  const start = new Date(this.startDate)
  const end = new Date(this.endDate)

  const timeDifference = end.getTime() - start.getTime()
  const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7))

  this.durationInWeeks = weeks
  next()
})

// courseSchema.pre('find', function (next) {
//   // Exclude tags where isDeleted: true
//   this.find({ tags: { $not: { $elemMatch: { isDeleted: true } } } })
//   next()
// })

courseSchema.pre('findOne', function (next) {
  // Exclude tags where isDeleted: true
  this.find({ tags: { $not: { $elemMatch: { isDeleted: true } } } })
  next()
})

// courseSchema.pre('aggregate', function (next) {
//   // Exclude tags where isDeleted: true
//   this.pipeline().unshift({
//     $match: { tags: { $not: { $elemMatch: { isDeleted: true } } } },
//   })
//   next()
// })

const Course = model<TCourse, courseModel>('Course', courseSchema)

export default Course
