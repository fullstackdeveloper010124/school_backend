"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const Volunteer_1 = __importDefault(require("./models/Volunteer"));
const Incident_1 = __importDefault(require("./models/Incident"));
const db_1 = __importDefault(require("./config/db"));
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const verifyData = async () => {
    try {
        console.log('=== DATABASE VERIFICATION ===\n');
        // Verify users
        const users = await User_1.default.find({});
        console.log(`Users (${users.length}):`);
        users.forEach(user => {
            console.log(`  - ${user.fullName} (${user.role}) ${user.isAdmin ? '[ADMIN]' : ''} ${user.isApproved ? '[APPROVED]' : '[PENDING APPROVAL]'}`);
        });
        console.log('');
        // Verify volunteers
        const volunteers = await Volunteer_1.default.find({});
        console.log(`Volunteers (${volunteers.length}):`);
        volunteers.forEach(volunteer => {
            console.log(`  - ${volunteer.name} (${volunteer.status})`);
        });
        console.log('');
        // Verify incidents
        const incidents = await Incident_1.default.find({});
        console.log(`Incidents (${incidents.length}):`);
        incidents.forEach(incident => {
            console.log(`  - ${incident.type} (${incident.status})`);
        });
        console.log('\n=== VERIFICATION COMPLETE ===');
        process.exit(0);
    }
    catch (error) {
        console.error('Error verifying data:', error);
        process.exit(1);
    }
};
verifyData();
//# sourceMappingURL=verify-data.js.map