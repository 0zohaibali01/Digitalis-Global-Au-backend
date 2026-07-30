import { Router } from 'express'

import { getCaseStudies, getCaseStudyBySlug } from '../controllers/caseStudyController.js'

const router = Router()

router.get('/', getCaseStudies)
router.get('/:slug', getCaseStudyBySlug)

export default router