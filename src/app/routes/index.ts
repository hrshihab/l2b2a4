import { Router } from 'express'
import { CourseRoutes } from '../modules/course/course.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { UserRoutes } from '../modules/user/user.route'

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
    path: '/',
    route: ReviewRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
