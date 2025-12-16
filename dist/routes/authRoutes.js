"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Signup route
router.post("/signup", auth_1.validateSignup, authController_1.registerUser);
// Login route
router.post("/login", authController_1.loginUser);
// Forgot password route
router.post("/forgot-password", authController_1.forgotPassword);
// Reset password route
router.post("/reset-password", authController_1.resetPassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map