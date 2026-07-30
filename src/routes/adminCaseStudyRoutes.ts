import { Router } from 'express'

import {
  getAllCaseStudiesAdmin,
  getCaseStudyByIdAdmin,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
} from '../controllers/adminCaseStudyController.js'
import { requireAuth } from '../middlewares/requireAuth.js'

const router = Router()

// Every route below requires a valid Bearer token.
router.use(requireAuth)

router.get('/', getAllCaseStudiesAdmin)
router.get('/:id', getCaseStudyByIdAdmin)
router.post('/', createCaseStudy)
router.put('/:id', updateCaseStudy)
router.delete('/:id', deleteCaseStudy)

export default router