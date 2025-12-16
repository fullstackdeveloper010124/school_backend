"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoUri = process.env.DB_URL;
        if (!mongoUri) {
            throw new Error("DB_URL environment variable is not defined");
        }
        await mongoose_1.default.connect(mongoUri);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map