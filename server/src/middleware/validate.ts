import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).send(err.errors.map(({ message }) => message));
      } else {
        return res.status(500).json({ error: err });
      }
    }
  };
