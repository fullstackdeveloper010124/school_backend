import { Request, Response, NextFunction } from 'express';

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