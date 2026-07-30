import type { NextFunction, Request, Response } from 'express'

import { prisma } from '../config/prisma.js'

// Only fields the frontend renders — keeps internal columns (isPublished,
// createdAt, updatedAt) out of the public response.
const publicFields = {
  slug: true,
  client: true,
  industry: true,
  metric: true,
  roi: true,
  summary: true,
  headline: true,
  challenge: true,
  approach: true,
  results: true,
  services: true,
} as const

// GET /api/case-studies
export const getCaseStudies = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: publicFields,
    })

    res.json(caseStudies)
  } catch (error) {
    next(error)
  }
}

// GET /api/case-studies/:slug
export const getCaseStudyBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const caseStudy = await prisma.caseStudy.findFirst({
      where: { slug: req.params.slug, isPublished: true },
      select: publicFields,
    })

    if (!caseStudy) {
      res.status(404).json({ error: 'Case study not found' })
      return
    }

    res.json(caseStudy)
  } catch (error) {
    next(error)
  }
}