"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = void 0;
const validateSignup = (req, res, next) => {
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
exports.validateSignup = validateSignup;
//# sourceMappingURL=auth.js.map