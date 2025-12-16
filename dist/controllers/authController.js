"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const crypto = __importStar(require("crypto"));
const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password, role, agreeTerms } = req.body;
        console.log('Received signup request with data:', req.body);
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            console.log('User already exists with email:', email);
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');
        const user = new User_1.default({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: role || "visitor",
            agreeTerms: agreeTerms || false,
            // Add a field to track if the user is approved by admin
            isApproved: false
        });
        const savedUser = await user.save();
        console.log('User saved to database:', savedUser._id);
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET not configured');
            res.status(500).json({ message: "JWT secret not configured" });
            return;
        }
        console.log('User registered successfully:', savedUser._id);
        res.status(201).json({
            message: "User registered successfully. Waiting for admin approval.",
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                phone: savedUser.phone,
                role: savedUser.role
            }
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
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
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log('Login failed: User not found with email:', email);
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check if user is approved by admin
        if (!user.isApproved && user.role !== "admin") {
            console.log('Login failed: User not approved by admin:', email);
            res.status(401).json({ message: "Account pending admin approval" });
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
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: "7d" });
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
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.loginUser = loginUser;
const forgotPassword = async (req, res) => {
    try {
        const { email, role } = req.body;
        // Validate input
        if (!email || !role) {
            res.status(400).json({ message: "Email and role are required" });
            return;
        }
        // Find user by email and role
        const user = await User_1.default.findOne({ email, role });
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map