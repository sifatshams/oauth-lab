import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/error.middleware.js';
import { db } from '../prisma/db.js';
import { RegisterInput } from '../validators/auth.validator.js';

// salt round
const SALT_ROUNDS = 12;

// register user service
export const registerUser = async (input: RegisterInput) => {
  const existingUser = await db.orm.public.User.first({
    email: input.email,
  });

  if (existingUser) {
    throw new AppError(409, 'An account with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

  try {
    // create user
    const user = await db.orm.public.User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    const { password: _password, ...safeUser } = user;

    return safeUser;
  } catch (error) {
    if (error instanceof Error && /unique|duplicate/i.test(error.message)) {
      throw new AppError(409, 'An account with this email already exists');
    }
    throw error;
  }
};
