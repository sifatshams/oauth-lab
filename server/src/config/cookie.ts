import type { CookieOptions } from 'express';
import { env } from './env.js';

export const COOKIE_NAME = 'auth_token';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 24 * 60 * 60 * 1000,
};
