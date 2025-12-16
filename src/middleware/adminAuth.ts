import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
  role?: string;
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Check if user exists and is admin
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Access denied. User not found.' });
      return;
    }
    
    // Allow access if user is admin OR has admin role
    if (!user.isAdmin && user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admin rights required.' });
      return;
    }

    // Attach user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};