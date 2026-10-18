import { AppError } from '../middleware/error.middleware.js';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const validateRegister = (body: unknown): RegisterInput => {
  if (!body || typeof body !== 'object') {
    throw new AppError(400, 'Request body is required');
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email =
    typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const password = typeof data.password === 'string' ? data.password : '';

  if (!name || !email || !password) {
    throw new AppError(400, 'Name, email and password are required');
  }

  if (name.length > 100) {
    throw new AppError(400, 'Name must be at most 100 characters');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, 'Please provide a valid email');
  }

  if (password.length < 8) {
    throw new AppError(400, 'Password must be at least 8 characters');
  }

  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw new AppError(400, 'Password is too long');
  }

  return { name, email, password };
};

export const validateLogin = (body: unknown): LoginInput => {
  if (!body || typeof body !== 'object') {
    throw new AppError(400, 'Request body is required');
  }

  const data = body as Record<string, unknown>;
  const email =
    typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  const password = typeof data.password === 'string' ? data.password : '';

  if (!email || !password) {
    throw new AppError(400, 'Email and password are required');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, 'Please provide a valid email');
  }

  return { email, password };
};
