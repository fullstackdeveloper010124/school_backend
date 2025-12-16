"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const incidentSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Reported', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Reported'
    },
    reportedBy: {
        type: String
    }
}, {
    timestamps: true
});
const Incident = mongoose_1.default.model('Incident', incidentSchema);
exports.default = Incident;
//# sourceMappingURL=Incident.js.map