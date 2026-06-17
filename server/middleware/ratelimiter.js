import rateLimit from 'express-rate-limit';

// General API limit - sabke liye
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 min
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Login ke liye strict limit
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // sirf 10 login attempts
  message: {
    success: false,
    message: "Too many login attempts, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Website generate ke liye limit
export const generateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 1 ghante mein 20 generations
  message: {
    success: false,
    message: "Generation limit reached, please try again after 1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment ke liye strict limit
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 1 ghante mein 5 payment attempts
  message: {
    success: false,
    message: "Too many payment attempts, please try again after 1 hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
});