import express from 'express';
import passport from 'passport';
import { env } from '../config/env.js';
import {
  loginController,
  logoutController,
  meController,
  registerController,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

// register route
authRouter.post('/register', registerController);
// login route
authRouter.post('/login', loginController);
// authenticated user profile route
authRouter.get('/me', protect, meController);
// logout route
authRouter.post('/logout', logoutController);

// google auth routes
authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.CLIENT_URL}/login?error=google`,
  }),
  
);

export default authRouter;
