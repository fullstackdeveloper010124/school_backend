import { Request, Response } from 'express';
import User from "../models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, phone, password, role, agreeTerms } = req.body;
    console.log('Received signup request with data:', req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists with email:', email);
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: role || "visitor",
      agreeTerms: agreeTerms || false
    });

    const savedUser = await user.save();
    console.log('User saved to database:', savedUser._id);

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET not configured');
      res.status(500).json({ message: "JWT secret not configured" });
      return;
    }

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    console.log('User registered successfully:', savedUser._id);
    
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        phone: savedUser.phone,
        role: savedUser.role
      },
      token
    });
  } catch (error: any) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with email:', email);

    // Validate input
    if (!email || !password) {
      console.log('Login failed: Email and password are required');
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: User not found with email:', email);
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    console.log('User found:', user.email);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      console.log('Login failed: Invalid password for user:', email);
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.log('Login failed: JWT secret not configured');
      res.status(500).json({ message: "JWT secret not configured" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    console.log('Login successful for user:', email);
    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, role } = req.body;

    // Validate input
    if (!email || !role) {
      res.status(400).json({ message: "Email and role are required" });
      return;
    }

    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (!user) {
      // For security reasons, we don't reveal if the user exists or not
      // We still return success to prevent email enumeration attacks
      res.status(200).json({ 
        message: "If your account exists, you will receive a password reset email shortly" 
      });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // In a real application, you would save the reset token and expiry to the user document
    // For this implementation, we'll just simulate it
    console.log(`Password reset token for ${email}: ${resetToken}`);
    console.log(`Token expires at: ${resetTokenExpiry}`);

    // In a real application, you would send an email with the reset link
    // For this implementation, we'll just return success
    
    res.status(200).json({ 
      message: "If your account exists, you will receive a password reset email shortly" 
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    // Validate input
    if (!token || !newPassword) {
      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    // In a real application, you would:
    // 1. Find user by reset token
    // 2. Check if token is valid and not expired
    // 3. Hash the new password
    // 4. Update user's password
    // 5. Remove/reset the reset token

    // For this implementation, we'll just simulate the process
    console.log(`Resetting password with token: ${token}`);

    // Simulate successful password reset
    res.status(200).json({ 
      message: "Password reset successfully" 
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};