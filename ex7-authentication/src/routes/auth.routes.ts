import { Router } from "express";
import bcrypt from 'bcrypt';
import { User} from "../interface/user.interface.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../util/token.util.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import { AuthenticatedRequest, UserRole } from "../interface/auth.interface.js";
import crypto from "crypto";
import rateLimit from "express-rate-limit";

const router = Router();

const users: User[] = []
const refreshTokens = new Set<string>()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many auth requests, try again later' },
})

router.post('/register', authLimiter, async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const safeRole: UserRole = role === 'ADMIN' ? 'ADMIN' : 'USER'

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: safeRole,
    resetToken: null,
    resetTokenExpiresAt: null,
  }

  users.push(user)

  res.json({ message: 'User registered', user: { id: user.id, email: user.email, role: user.role } })
})

router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email)

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  refreshTokens.add(refreshToken)

  res.json({ accessToken, refreshToken })
})

router.post('/refresh-token', authLimiter, (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' })
  }

  if (!refreshTokens.has(refreshToken)) {
    return res.status(403).json({ message: 'Invalid refresh token' })
  }

  const payload = verifyRefreshToken(refreshToken)
  if (!payload) {
    return res.status(403).json({ message: 'Expired or invalid refresh token' })
  }

  const accessToken = generateAccessToken({ id: payload.id, email: payload.email, role: payload.role })
  res.json({ accessToken })
})

router.post('/logout', authLimiter, (req, res) => {
  const { refreshToken } = req.body
  if (refreshToken) {
    refreshTokens.delete(refreshToken)
  }

  res.json({ message: 'Logged out' })
})

router.post('/forgot-password', authLimiter, (req, res) => {
  const { email } = req.body
  const user = users.find(u => u.email === email)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const resetToken = crypto.randomBytes(32).toString('hex')
  user.resetToken = resetToken
  user.resetTokenExpiresAt = Date.now() + 15 * 60 * 1000

  // Keep it simple: return reset token directly for lab testing.
  res.json({ message: 'Reset token generated', resetToken })
})

router.post('/reset-password', authLimiter, async (req, res) => {
  const { token, newPassword } = req.body
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' })
  }

  const user = users.find(
    u => u.resetToken === token && !!u.resetTokenExpiresAt && u.resetTokenExpiresAt > Date.now()
  )

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' })
  }

  user.password = await bcrypt.hash(newPassword, 10)
  user.resetToken = null
  user.resetTokenExpiresAt = null

  res.json({ message: 'Password reset successful' })
})

router.get('/profile', authMiddleware, (req: AuthenticatedRequest, res) => {
  res.json({
    message: 'Protected data',
    user: req.user
  })
})

router.get('/admin', authMiddleware, authorizeRoles('ADMIN'), (req: AuthenticatedRequest, res) => {
  res.json({
    message: 'Admin route access granted',
    user: req.user,
  })
})




export default router;
