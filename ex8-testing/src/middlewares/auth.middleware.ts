import { NextFunction, Request, Response } from "express";

const AUTH_TOKEN = "Bearer test-token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== AUTH_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};
