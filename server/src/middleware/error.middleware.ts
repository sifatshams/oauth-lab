import type { ErrorRequestHandler } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  const message =
    error instanceof AppError ? error.message : 'Internal server error';

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
