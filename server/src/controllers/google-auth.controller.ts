import type { RequestHandler } from 'express';
import { cookieOptions } from '../config/cookie.js';
import { env } from '../config/env.js';
import { generateToken } from '../utils/jwt.util.js';

interface AuthenticatedGoogleUser {
  id: string;
  name: string;
  email: string;
}

export const googleAuthController: RequestHandler = (req, res, next) => {
  try {
    const user = req.user as AuthenticatedGoogleUser | undefined;

    // validate
    if (!user?.id) {
      res.redirect(`${env.CLIENT_URL}/login?error=google`);
      return;
    }

    // generate jwt token
    const token = generateToken(user.id);

    // set cookie
    res.cookie('auth_token', token, cookieOptions);

    // redirect
    res.redirect(env.CLIENT_URL);
  } catch (error) {
    next(error);
  }
};
