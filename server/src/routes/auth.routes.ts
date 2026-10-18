import express from 'express';
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

export default authRouter;
