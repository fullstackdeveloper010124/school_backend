"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const safetyRoutes_1 = __importDefault(require("./routes/safetyRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const volunteerRoutes_1 = __importDefault(require("./routes/volunteerRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const logger_1 = require("./middleware/logger");
const db_1 = __importDefault(require("./config/db"));
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3000";
// Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON bodies
app.use(logger_1.logger); // Request logging
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api', safetyRoutes_1.default);
app.use('/api/volunteers', volunteerRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'School Safety System API',
        version: '1.0.0'
    });
});
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map