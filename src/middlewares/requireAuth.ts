import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type AuthedRequest = Request & {
  user?: { id: string; email: string }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or malformed Authorization header.' })
    return
  }

  const token = header.slice('Bearer '.length)
  const secret = process.env.JWT_SECRET

  if (!secret) {
    res.status(500).json({ error: 'Server auth misconfigured.' })
    return
  }

  try {
    const payload = jwt.verify(token, secret) as { sub: string; email: string }
    ;(req as AuthedRequest).user = { id: payload.sub, email: payload.email }
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
}