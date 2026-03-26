import { NextFunction, Request, Response } from "express";

export type ValidationIssue = {
  path: string;
  message: string;
  code: string;
};

type ErrorPayload = {
  success: false;
  code: string;
  message: string;
  details?: ValidationIssue[];
};

export class AppError extends Error {
  statusCode: number;
  code: string;
  details: ValidationIssue[] | undefined;

  constructor(statusCode: number, code: string, message: string, details?: ValidationIssue[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(details: ValidationIssue[]) {
    super(400, "VALIDATION_ERROR", "Request validation failed", details);
  }
}

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response<ErrorPayload>,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      code: error.code,
      message: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
  }

  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};
