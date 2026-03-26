import { NextFunction, Request, Response } from "express";

export const validateUserName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters" });
  }

  return next();
};
