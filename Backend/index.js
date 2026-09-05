import express from 'express';
import connectDB from './config/database.js';
import HANDLERS from './handlers/index.js';
import errorMiddleware from './middlewares/error.js';
import { authMiddleware } from './middlewares/auth.js';
import rateLimit from './middlewares/rate-limit.js';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const PORT = process.env.PORT;

connectDB();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Rate limit auth endpoints: 30 requests per 15 minutes
app.use("/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 30 }));
app.use("/auth/register", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }));

// General rate limit: 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(authMiddleware);
app.use("/", HANDLERS);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
