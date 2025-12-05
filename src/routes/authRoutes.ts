import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/authController";
import { validateSignup } from "../middleware/auth";

const router = express.Router();

// Signup route
router.post("/signup", validateSignup, registerUser);

// Login route
router.post("/login", loginUser);

// Forgot password route
router.post("/forgot-password", forgotPassword);

// Reset password route
router.post("/reset-password", resetPassword);

export default router;