import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { prisma } from '../config/prisma.js'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not set.')
  }

  return secret
}

// POST /api/v1/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body)

    if (!parsed.success) {
      res.status(400).json({ error: 'Invalid email or password format.' })
      return
    }

    const { email, password } = parsed.data

    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    })

    const invalidCredentials = () =>
      res.status(401).json({ error: 'Invalid email or password.' })

    if (!user) {
      invalidCredentials()
      return
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
      invalidCredentials()
      return
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      getJwtSecret(),
      { expiresIn: '8h' },
    )

    res.json({
      token,
      user: { id: user.id, email: user.email },
    })
  } catch (error) {
    // Covers Neon cold-start ("Can't reach database server", P1001) and any
    // other unexpected failure. Without this, an uncaught rejection here
    // crashes the whole Node process — the backend then refuses every
    // connection until it's manually restarted, which is what was happening
    // before this fix.
    console.error('Login failed:', error)
    res.status(503).json({ error: 'Service temporarily unavailable. Please try again.' })
  }
}

// GET /api/v1/auth/me
export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ user: (req as Request & { user?: unknown }).user })
  } catch (error) {
    console.error('Session check failed:', error)
    res.status(503).json({ error: 'Service temporarily unavailable. Please try again.' })
  }
}