import type { Response } from 'express';
import { COOKIE_NAME, cookieOptions } from '../config/cookie.js';
import { generateToken } from '../utils/jwt.util.js';

// send auth response
const sendAuthResponse = (
  res: Response,
  user: { id: string; [key: string]: unknown },
  statusCode: number,
  message: string,
) => {
  const token = generateToken(user.id);

  // cookie res
  res.cookie(COOKIE_NAME, token, cookieOptions);

  // success res
  return res.status(statusCode).json({ success: true, message, user });
};
