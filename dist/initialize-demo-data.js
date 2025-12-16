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
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const Volunteer_1 = __importDefault(require("./models/Volunteer"));
const Incident_1 = __importDefault(require("./models/Incident"));
const db_1 = __importDefault(require("./config/db"));
const bcrypt = __importStar(require("bcryptjs"));
// Load environment variables
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const initializeDemoData = async () => {
    try {
        // Clear existing data
        await User_1.default.deleteMany({});
        await Volunteer_1.default.deleteMany({});
        await Incident_1.default.deleteMany({});
        console.log('Existing data cleared');
        // Create sample users with different roles
        const users = [
            {
                fullName: "Admin User",
                email: "admin@school.edu",
                phone: "+1555000000",
                password: await bcrypt.hash("adminPassword123", 10),
                role: "admin",
                isAdmin: true,
                isApproved: true, // Admins are automatically approved
                agreeTerms: true
            },
            {
                fullName: "John Smith",
                email: "john.smith@example.com",
                phone: "+1234567890",
                password: await bcrypt.hash("securePassword123", 10),
                role: "visitor", // Pending approval
                isAdmin: false,
                isApproved: false, // Not approved yet
                agreeTerms: true
            },
            {
                fullName: "Alice Johnson",
                email: "alice.johnson@student.school.edu",
                phone: "+1987654321",
                password: await bcrypt.hash("studentPass456", 10),
                role: "student",
                isAdmin: false,
                isApproved: true, // Pre-approved for demo
                agreeTerms: true
            },
            {
                fullName: "Robert Davis",
                email: "robert.davis@school.edu",
                phone: "+1555123456",
                password: await bcrypt.hash("teacherPass789", 10),
                role: "teacher",
                isAdmin: false,
                isApproved: true, // Pre-approved for demo
                agreeTerms: true
            }
        ];
        // Insert users
        for (const userData of users) {
            const user = new User_1.default(userData);
            await user.save();
            console.log(`Created user: ${user.fullName} (${user.role}) - ${user.isApproved ? 'Approved' : 'Pending Approval'}`);
        }
        // Create sample volunteers with different statuses
        const volunteers = [
            {
                name: "Sarah Wilson",
                email: "sarah.wilson.volunteer@gmail.com",
                phone: "+1555111222",
                role: "Library Assistant",
                status: "pending_approval", // Pending admin approval
                backgroundCheck: "pending",
                hoursThisMonth: 0,
                totalHours: 0,
                joinDate: new Date(),
                schedule: "Monday & Wednesday 3-6 PM",
                emergencyContact: "+1555999888",
                skills: ["Organization", "Customer Service"]
            },
            {
                name: "Michael Brown",
                email: "michael.brown.volunteer@gmail.com",
                phone: "+1555333444",
                role: "Tutor",
                status: "active", // Already approved
                backgroundCheck: "completed",
                backgroundCheckDate: new Date(),
                hoursThisMonth: 15,
                totalHours: 120,
                joinDate: new Date("2023-01-15"),
                schedule: "Tuesday & Thursday 4-7 PM",
                emergencyContact: "+1555777666",
                skills: ["Mathematics", "Science"]
            },
            {
                name: "Emily Chen",
                email: "emily.chen.volunteer@gmail.com",
                phone: "+1555555666",
                role: "Event Coordinator",
                status: "inactive", // Rejected
                backgroundCheck: "pending",
                hoursThisMonth: 0,
                totalHours: 0,
                joinDate: new Date(),
                schedule: "Flexible",
                emergencyContact: "+1555333222",
                skills: ["Event Planning", "Communication"]
            }
        ];
        // Insert volunteers
        for (const volunteerData of volunteers) {
            const volunteer = new Volunteer_1.default(volunteerData);
            await volunteer.save();
            console.log(`Created volunteer: ${volunteer.name} (${volunteer.status})`);
        }
        // Create sample incidents
        const incidents = [
            {
                type: "Slip and Fall",
                location: "Main Hallway near Cafeteria",
                status: "Reported", // Pending admin action
                reportedBy: "Security Staff"
            },
            {
                type: "Unauthorized Person",
                location: "Library Entrance",
                status: "In Progress", // Being handled by admin
                reportedBy: "Librarian"
            },
            {
                type: "Equipment Malfunction",
                location: "Computer Lab Room 204",
                status: "Completed", // Resolved
                reportedBy: "Teacher"
            }
        ];
        // Insert incidents
        for (const incidentData of incidents) {
            const incident = new Incident_1.default(incidentData);
            await incident.save();
            console.log(`Created incident: ${incident.type} (${incident.status})`);
        }
        console.log('\n=== DEMO DATA INITIALIZATION COMPLETE ===');
        console.log('The database now contains:');
        console.log('- 1 Admin user (approved)');
        console.log('- 1 Visitor (pending approval)');
        console.log('- 1 Student (approved)');
        console.log('- 1 Teacher (approved)');
        console.log('- 1 Volunteer pending approval');
        console.log('- 1 Active volunteer');
        console.log('- 1 Inactive volunteer');
        console.log('- 1 Reported incident');
        console.log('- 1 In-progress incident');
        console.log('- 1 Completed incident');
        console.log('\nAdmin can now log in and manage all pending approvals through the dashboard.');
        process.exit(0);
    }
    catch (error) {
        console.error('Error initializing demo data:', error);
        process.exit(1);
    }
};
initializeDemoData();
//# sourceMappingURL=initialize-demo-data.js.map