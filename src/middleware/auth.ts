import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
  role?: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Access denied. User not found.' });
      return;
    }

    // Attach user to request object
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
  const { fullName, email, phone, password, confirmPassword, role } = req.body;

  if (!fullName || !email || !phone || !password || !confirmPassword) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Passwords do not match" });
    return;
  }

  const roles = ["visitor", "student", "teacher", "parent"];
  if (role && !roles.includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }

  next();
};