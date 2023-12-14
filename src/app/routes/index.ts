import { Router } from 'express'
import { CourseRoutes } from '../modules/course/course.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { ReviewRoutes } from '../modules/review/review.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: CourseRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
