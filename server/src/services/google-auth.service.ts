import { db } from '../prisma/db.js';

interface GoogleUserInput {
  googleId: String;
  name: String;
  email: String;
}

export const findOrCreateGoogleUser = async ({
  googleId,
  name,
  email,
}: GoogleUserInput) => {
  const normalizedEmail = email.trim().toLocaleLowerCase();

  // find an existing Google account
  const existingGoogleUser = await db.orm.public.User.first({
    googleId,
  });

  // validate
  if (existingGoogleUser) {
    return existingGoogleUser;
  }

  // check for an existing account with this email
  const existingEmailUser = await db.orm.public.User.first({
    email: normalizedEmail,
  });

  if (existingEmailUser) {
    throw new Error(
      'An account with this email already exists. Please sign in using your existing method!',
    );
  }

  // create a new Google user
  const newUser = await db.orm.public.User.create({
    name,
    email: normalizedEmail,
    googleId,
  });

  return newUser;
};
