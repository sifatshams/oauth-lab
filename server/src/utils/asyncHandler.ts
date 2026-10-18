import type { NextFunction, Request, RequestHandler, Response } from 'express';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export const asyncHandler = (controller: AsyncController): RequestHandler => {
  return (req, res, next) => {
    void controller(req, res, next).catch(next);
  };
};
