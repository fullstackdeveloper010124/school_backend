"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const db_1 = __importDefault(require("./config/db"));
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const makeAdmin = async (email) => {
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log(`User with email ${email} not found`);
            process.exit(1);
        }
        user.isAdmin = true;
        user.role = 'admin';
        await user.save();
        console.log(`User ${user.email} has been made an admin`);
        process.exit(0);
    }
    catch (error) {
        console.error('Error making user admin:', error);
        process.exit(1);
    }
};
// Get email from command line arguments
const email = process.argv[2];
if (!email) {
    console.log('Please provide an email address as an argument');
    console.log('Usage: npm run make-admin user@example.com');
    process.exit(1);
}
makeAdmin(email);
//# sourceMappingURL=make-admin.js.map