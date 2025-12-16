"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./config/db"));
const User_1 = __importDefault(require("./models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const testConnection = async () => {
    try {
        // Connect to database
        await (0, db_1.default)();
        console.log("Database connection verified!");
        // Test creating a sample user (will be deleted after)
        const sampleUser = new User_1.default({
            fullName: "Test User",
            email: "test@example.com",
            phone: "1234567890",
            password: "hashed_password_for_test",
            role: "visitor",
            agreeTerms: true
        });
        // Save the user to ensure the collection is created
        const savedUser = await sampleUser.save();
        console.log("Sample user created:", savedUser._id);
        // Delete the sample user
        await User_1.default.deleteOne({ _id: savedUser._id });
        console.log("Sample user deleted");
        console.log("Database connection and User collection verified successfully!");
        process.exit(0);
    }
    catch (error) {
        console.error("Database test failed:", error);
        process.exit(1);
    }
};
testConnection();
//# sourceMappingURL=test-db-connection.js.map