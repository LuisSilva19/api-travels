import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { errorLogger } from "../configs/logger";

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        errorLogger.error(error);
        return res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      errorLogger.error(error);
      next(error);
    }
  };
