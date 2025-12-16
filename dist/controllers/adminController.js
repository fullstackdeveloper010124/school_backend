"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncidentStatus = exports.updateVolunteerStatus = exports.updateUserRoleStatus = exports.getAllUsers = exports.getPendingApprovals = void 0;
const User_1 = __importDefault(require("../models/User"));
const Volunteer_1 = __importDefault(require("../models/Volunteer"));
const Incident_1 = __importDefault(require("../models/Incident"));
// Get all pending approvals
const getPendingApprovals = async (req, res) => {
    try {
        // Get pending users (visitors waiting for role approval)
        const pendingUsers = await User_1.default.find({ isApproved: false, role: { $ne: "admin" } }).select('-password');
        // Get pending volunteers
        const pendingVolunteers = await Volunteer_1.default.find({ status: 'pending_approval' });
        // Get pending incidents (if needed)
        const pendingIncidents = await Incident_1.default.find({ status: 'Reported' });
        res.status(200).json({
            success: true,
            data: {
                pendingUsers,
                pendingVolunteers,
                pendingIncidents
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getPendingApprovals = getPendingApprovals;
// Get all users (for admin dashboard)
const getAllUsers = async (req, res) => {
    try {
        // Get all users (including admins)
        const users = await User_1.default.find({}).select('-password');
        res.status(200).json({
            success: true,
            data: {
                users
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getAllUsers = getAllUsers;
// Approve or reject a user role
const updateUserRoleStatus = async (req, res) => {
    try {
        const { userId, newRole, action } = req.body;
        if (!userId || !action) {
            res.status(400).json({
                success: false,
                message: 'User ID and action are required'
            });
            return;
        }
        if (action !== 'approve' && action !== 'reject') {
            res.status(400).json({
                success: false,
                message: 'Action must be either "approve" or "reject"'
            });
            return;
        }
        const user = await User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
            return;
        }
        if (action === 'approve') {
            // Approve user and assign role
            user.role = newRole || 'visitor'; // Default to visitor if no role specified
            user.isApproved = true; // Mark user as approved
            await user.save();
            res.status(200).json({
                success: true,
                message: `User approved with role: ${user.role}`,
                user
            });
        }
        else {
            // Reject user - could delete or mark as rejected
            await User_1.default.deleteOne({ _id: userId });
            res.status(200).json({
                success: true,
                message: 'User rejected and removed'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateUserRoleStatus = updateUserRoleStatus;
// Approve or reject a volunteer
const updateVolunteerStatus = async (req, res) => {
    try {
        const { volunteerId, action } = req.body;
        if (!volunteerId || !action) {
            res.status(400).json({
                success: false,
                message: 'Volunteer ID and action are required'
            });
            return;
        }
        if (action !== 'approve' && action !== 'reject') {
            res.status(400).json({
                success: false,
                message: 'Action must be either "approve" or "reject"'
            });
            return;
        }
        const volunteer = await Volunteer_1.default.findById(volunteerId);
        if (!volunteer) {
            res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
            return;
        }
        if (action === 'approve') {
            // Approve volunteer
            volunteer.status = 'active';
            await volunteer.save();
            res.status(200).json({
                success: true,
                message: 'Volunteer approved',
                volunteer
            });
        }
        else {
            // Reject volunteer
            volunteer.status = 'inactive';
            await volunteer.save();
            res.status(200).json({
                success: true,
                message: 'Volunteer rejected',
                volunteer
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateVolunteerStatus = updateVolunteerStatus;
// Update incident status
const updateIncidentStatus = async (req, res) => {
    try {
        const { incidentId, status } = req.body;
        if (!incidentId || !status) {
            res.status(400).json({
                success: false,
                message: 'Incident ID and status are required'
            });
            return;
        }
        const validStatuses = ['Reported', 'In Progress', 'Completed', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({
                success: false,
                message: `Status must be one of: ${validStatuses.join(', ')}`
            });
            return;
        }
        const incident = await Incident_1.default.findById(incidentId);
        if (!incident) {
            res.status(404).json({
                success: false,
                message: 'Incident not found'
            });
            return;
        }
        incident.status = status;
        await incident.save();
        res.status(200).json({
            success: true,
            message: `Incident status updated to: ${status}`,
            incident
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateIncidentStatus = updateIncidentStatus;
//# sourceMappingURL=adminController.js.map