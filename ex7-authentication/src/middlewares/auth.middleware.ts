import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env.config.js'
import { AuthenticatedRequest, AuthTokenPayload, UserRole } from '../interface/auth.interface.js'

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET)
    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token payload' })
    }

    req.user = decoded as AuthTokenPayload
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function authorizeRoles(...roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' })
    }

    next()
  }
}
