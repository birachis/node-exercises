import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.config.js'

import { User } from "../interface/user.interface.js";
import { AuthTokenPayload } from '../interface/auth.interface.js';

type TokenUser = Pick<User, "id" | "email" | "role">;

export function generateAccessToken(user: TokenUser) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function generateRefreshToken(user: TokenUser) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ENV.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyRefreshToken(token: string): AuthTokenPayload | null {
  try {
    const decoded = jwt.verify(token, ENV.JWT_REFRESH_SECRET);
    if (typeof decoded === "string") {
      return null;
    }
    return decoded as AuthTokenPayload;
  } catch (_err) {
    return null;
  }
}
