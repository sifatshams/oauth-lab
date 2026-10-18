import type { Response } from 'express';
import { COOKIE_NAME, cookieOptions } from '../config/cookie.js';
import { registerUser } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateToken } from '../utils/jwt.util.js';
import { validateRegister } from '../validators/auth.validator.js';

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
