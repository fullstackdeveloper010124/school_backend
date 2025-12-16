"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const volunteerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'pending_approval', 'inactive'],
        default: 'pending_approval'
    },
    backgroundCheck: {
        type: String,
        enum: ['completed', 'pending', 'expired'],
        default: 'pending'
    },
    backgroundCheckDate: { type: Date, default: null },
    hoursThisMonth: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: null },
    schedule: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    skills: [{ type: String }],
    isCheckedIn: { type: Boolean, default: false },
    checkInTime: { type: Date, default: null },
    currentAssignment: { type: String, default: null }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Volunteer", volunteerSchema);
//# sourceMappingURL=Volunteer.js.map