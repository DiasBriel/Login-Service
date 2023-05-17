import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/apiError";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  console.error(error);
  
  const message = error.statusCode ? error.message : "Erro interno no servidor.";

  return res.status(statusCode).json({ message });
}
