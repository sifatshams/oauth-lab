import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/error.middleware.js';
import { db } from '../prisma/db.js';
import { LoginInput, RegisterInput } from '../validators/auth.validator.js';

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

// login user service
export const loginUser = async (input: LoginInput) => {
  const user = await db.orm.public.User.first({
    email: input.email,
  });

  // if user not here
  if (!user) {
    throw new AppError(401, 'Invalid email or password');
  }

  // compare passcode
  const passwordMatches = await bcrypt.compare(input.password, user.password);

  // if passcode not match?
  if (!passwordMatches) {
    throw new AppError(401, 'Invalid email or password');
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
};

// find or get user by id
export const getUserById = async (id: string) => {
  const user = await db.orm.public.User.first({ id });

  // if user not found?
  if (!user) {
    throw new AppError(401, 'User not found');
  }

  const { password: _password, ...safeUser } = user;

  return safeUser;
};
