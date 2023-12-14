/* eslint-disable no-unused-vars */

import { Model, Types } from 'mongoose'

export type TTags = {
  name: string
  isDeleted: boolean
}

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
}

export type TLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type TCourse = {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: TTags[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks?: number
  details: TDetails
}

export interface courseModel extends Model<TCourse> {
  isCourseExists(id: string): Promise<TCourse | null>
}
