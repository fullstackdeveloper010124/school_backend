import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
};