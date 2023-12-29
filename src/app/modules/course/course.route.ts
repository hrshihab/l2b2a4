import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseControllers } from './course.controllers'
import auth from '../../middlewares/userAuth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()
router.post(
  '/course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/courses', CourseControllers.getAllCourses)
router.put(
  '/courses/:courseId',
  validateRequest(CourseValidation.UpdateCourseValidationSchema),
  CourseControllers.updateCourse,
)
router.get('/courses/:courseId/reviews', CourseControllers.getCourseWithReview)

export const CourseRoutes = router
