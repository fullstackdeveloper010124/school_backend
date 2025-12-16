"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const adminAuth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Check if user exists and is admin
        const user = await User_1.default.findById(decoded.id);
        if (!user || !user.isAdmin) {
            res.status(403).json({ message: 'Access denied. Admin rights required.' });
            return;
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=adminAuth.js.map