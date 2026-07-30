import type { Request, Response } from 'express'
import { z } from 'zod'

import { prisma } from '../config/prisma.js'

// ---- Validation -----------------------------------------------------------

const resultPairSchema = z.object({
  value: z.string().min(1, 'Result value is required'),
  label: z.string().min(1, 'Result label is required'),
})

const slugSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    'Slug must be lowercase letters, numbers and hyphens only (e.g. my-client-name)',
  )

const caseStudyBaseSchema = z.object({
  slug: slugSchema,
  client: z.string().min(1, 'Client name is required'),
  industry: z.string().min(1, 'Industry is required'),
  metric: z.string().min(1, 'Metric is required'),
  roi: z.string().nullable().optional(),
  summary: z.string().min(1, 'Summary is required'),
  headline: z.string().nullable().optional(),
  challenge: z.string().nullable().optional(),
  approach: z.array(z.string().min(1)).default([]),
  results: z.array(resultPairSchema).default([]),
  services: z.array(z.string().min(1)).default([]),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
})

const createSchema = caseStudyBaseSchema
const updateSchema = caseStudyBaseSchema.partial()

// ---- Shape conversion -------------------------------------------------
// DB/public API stores results as [value, label] tuples. The admin API
// speaks {value, label} objects instead, which are much easier to bind to
// a repeatable form field. Convert at the boundary.

const tuplesToObjects = (
  tuples: unknown,
): { value: string; label: string }[] => {
  if (!Array.isArray(tuples)) return []
  return tuples
    .filter((t): t is [string, string] => Array.isArray(t) && t.length === 2)
    .map(([value, label]) => ({ value, label }))
}

const objectsToTuples = (
  objects: { value: string; label: string }[],
): [string, string][] => objects.map(({ value, label }) => [value, label])

const serializeForAdmin = (row: {
  id: string
  slug: string
  client: string
  industry: string
  metric: string
  roi: string | null
  summary: string
  headline: string | null
  challenge: string | null
  approach: unknown
  results: unknown
  services: unknown
  sortOrder: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}) => ({
  ...row,
  approach: Array.isArray(row.approach) ? row.approach : [],
  services: Array.isArray(row.services) ? row.services : [],
  results: tuplesToObjects(row.results),
})

// ---- Handlers ---------------------------------------------------------

// GET /api/v1/admin/case-studies
export const getAllCaseStudiesAdmin = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const rows = await prisma.caseStudy.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  })

  res.json(rows.map(serializeForAdmin))
}

// GET /api/v1/admin/case-studies/:id
export const getCaseStudyByIdAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const row = await prisma.caseStudy.findUnique({
    where: { id: req.params.id },
  })

  if (!row) {
    res.status(404).json({ error: 'Case study not found.' })
    return
  }

  res.json(serializeForAdmin(row))
}

// POST /api/v1/admin/case-studies
export const createCaseStudy = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = createSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid case study data.', details: parsed.error.flatten() })
    return
  }

  const data = parsed.data

  const existing = await prisma.caseStudy.findUnique({ where: { slug: data.slug } })
  if (existing) {
    res.status(409).json({ error: `Slug "${data.slug}" is already in use.` })
    return
  }

  const row = await prisma.caseStudy.create({
    data: {
      ...data,
      results: objectsToTuples(data.results),
    },
  })

  res.status(201).json(serializeForAdmin(row))
}

// PUT /api/v1/admin/case-studies/:id
export const updateCaseStudy = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = updateSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({ error: 'Invalid case study data.', details: parsed.error.flatten() })
    return
  }

  const existing = await prisma.caseStudy.findUnique({ where: { id: req.params.id } })
  if (!existing) {
    res.status(404).json({ error: 'Case study not found.' })
    return
  }

  const data = parsed.data

  if (data.slug && data.slug !== existing.slug) {
    const slugTaken = await prisma.caseStudy.findUnique({ where: { slug: data.slug } })
    if (slugTaken) {
      res.status(409).json({ error: `Slug "${data.slug}" is already in use.` })
      return
    }
  }

  const row = await prisma.caseStudy.update({
    where: { id: req.params.id },
    data: {
      ...data,
      ...(data.results ? { results: objectsToTuples(data.results) } : {}),
    },
  })

  res.json(serializeForAdmin(row))
}

// DELETE /api/v1/admin/case-studies/:id
export const deleteCaseStudy = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const existing = await prisma.caseStudy.findUnique({ where: { id: req.params.id } })
  if (!existing) {
    res.status(404).json({ error: 'Case study not found.' })
    return
  }

  await prisma.caseStudy.delete({ where: { id: req.params.id } })

  res.status(204).send()
}