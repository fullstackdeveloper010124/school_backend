import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import safetyRoutes from './routes/safetyRoutes';
import authRoutes from './routes/authRoutes';
import volunteerRoutes from './routes/volunteerRoutes';
import adminRoutes from './routes/adminRoutes';
import { logger } from './middleware/logger';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app: Application = express();
const PORT = process.env.PORT || "3000";

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(logger); // Request logging

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', safetyRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'School Safety System API',
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;