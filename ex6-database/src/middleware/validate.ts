import { Request, RequestHandler } from "express";
import { ZodTypeAny } from "zod";
import { ValidationError } from "./errorHandler.js";

type RequestPart = "body" | "query" | "params";

type SchemaMap = {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
};

export const validateRequest = (schemas: SchemaMap): RequestHandler => {
  return (req, _res, next) => {
    const parts: RequestPart[] = ["params", "query", "body"];

    for (const part of parts) {
      const schema = schemas[part];
      if (!schema) {
        continue;
      }

      const result = schema.safeParse(req[part]);

      if (!result.success) {
        next(
          new ValidationError(
            result.error.issues.map((issue) => ({
              path: [part, ...issue.path].join("."),
              message: issue.message,
              code: issue.code,
            })),
          ),
        );
        return;
      }

      if (part === "query") {
        Object.defineProperty(req, "query", {
          value: result.data,
          writable: true,
          configurable: true,
          enumerable: true,
        });
        continue;
      }

      if (part === "params") {
        Object.assign(req.params, result.data);
        continue;
      }

      req.body = result.data;
    }

    next();
  };
};
