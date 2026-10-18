import { RequestHandler } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { COOKIE_NAME } from '../config/cookie.js';
import { env } from '../config/env.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from './error.middleware.js';

// protect auth function
export const protect: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token = req.cookies?.[COOKIE_NAME];

  // validate
  if (!token) {
    throw new AppError(401, 'Please log in to continue');
  }

  let payload: string | JwtPayload;

  try {
    payload = jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new AppError(401, 'Invalid or expired session');
  }

  if (typeof payload === 'string' || typeof payload.sub !== 'string') {
    throw new AppError(401, 'Invalid authentication token');
  }

  req.user = { id: payload.sub };
  next();
});
