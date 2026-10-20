import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import passport from './config/passport.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import authRouter from './routes/auth.routes.js';

const app = express();

app.disable('x-powered-by');

app.use(
  cors({
    origin: env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(passport.initialize());

// parse JSON bodie's
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// health check route
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running...',
  });
});

// api endpoint
app.use('/api/auth', authRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// err handler
app.use(errorMiddleware);

export default app;
