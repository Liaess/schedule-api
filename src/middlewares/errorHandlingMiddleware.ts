import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ConflictError from "@/errors/conflictError";
import InvalidDataError from "@/errors/invalidError";

export default function errorHandlingMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ConflictError) {
    return res.status(httpStatus.CONFLICT).send({
      error: err.message,
    });
  }

  if (err instanceof InvalidDataError) {
    return res.status(httpStatus.BAD_REQUEST).send({
      error: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Error interno no servidor!",
  });
}
