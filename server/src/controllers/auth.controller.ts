import type { Request, Response } from 'express';
import { COOKIE_NAME, cookieOptions } from '../config/cookie.js';
import { db } from '../prisma/db.js';
import { loginUser, registerUser } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/jwt.util.js';
import {
  validateLogin,
  validateRegister,
} from '../validators/auth.validator.js';

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

// user register controler
export const registerController = asyncHandler(async (req, res) => {
  const input = validateRegister(req.body);
  const user = await registerUser(input);

  // send auth res
  return sendAuthResponse(
    res,
    { ...user, id: user.id },
    201,
    'Account created successfully',
  );
});

// login user controller
export const loginController = asyncHandler(async (req, res) => {
  const input = validateLogin(req.body);
  const user = await loginUser(input);

  // send auth res
  return sendAuthResponse(
    res,
    { ...user, id: user.id },
    200,
    'Logged in successfully',
  );
});

// authenticated user profile controller
export const meController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await db.orm.public.User.first({ id: req.user.id });

    // success res
    return res.status(200).json({ success: true, user });
  },
);

// logout user controller
export const logoutController = asyncHandler(async (_req, res) => {
  // clear cookie
  res.clearCookie(COOKIE_NAME, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
  });

  // success res
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
