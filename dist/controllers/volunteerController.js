"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOutVolunteer = exports.checkInVolunteer = exports.deleteVolunteer = exports.updateVolunteer = exports.createVolunteer = exports.getVolunteerById = exports.getAllVolunteers = void 0;
const Volunteer_1 = __importDefault(require("../models/Volunteer"));
// Get all volunteers
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(volunteers);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching volunteers", error: error.message });
    }
};
exports.getAllVolunteers = getAllVolunteers;
// Get volunteer by ID
const getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer_1.default.findById(id);
        if (!volunteer) {
            res.status(404).json({ message: "Volunteer not found" });
            return;
        }
        res.status(200).json(volunteer);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching volunteer", error: error.message });
    }
};
exports.getVolunteerById = getVolunteerById;
// Create new volunteer
const createVolunteer = async (req, res) => {
    try {
        const volunteerData = req.body;
        const newVolunteer = new Volunteer_1.default(volunteerData);
        const savedVolunteer = await newVolunteer.save();
        res.status(201).json({
            message: "Volunteer created successfully",
            volunteer: savedVolunteer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating volunteer", error: error.message });
    }
};
exports.createVolunteer = createVolunteer;
// Update volunteer
const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedVolunteer = await Volunteer_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedVolunteer) {
            res.status(404).json({ message: "Volunteer not found" });
            return;
        }
        res.status(200).json({
            message: "Volunteer updated successfully",
            volunteer: updatedVolunteer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating volunteer", error: error.message });
    }
};
exports.updateVolunteer = updateVolunteer;
// Delete volunteer
const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVolunteer = await Volunteer_1.default.findByIdAndDelete(id);
        if (!deletedVolunteer) {
            res.status(404).json({ message: "Volunteer not found" });
            return;
        }
        res.status(200).json({
            message: "Volunteer deleted successfully",
            volunteer: deletedVolunteer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting volunteer", error: error.message });
    }
};
exports.deleteVolunteer = deleteVolunteer;
// Check-in volunteer
const checkInVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const { assignment } = req.body;
        const updatedVolunteer = await Volunteer_1.default.findByIdAndUpdate(id, {
            isCheckedIn: true,
            checkInTime: new Date(),
            currentAssignment: assignment
        }, { new: true });
        if (!updatedVolunteer) {
            res.status(404).json({ message: "Volunteer not found" });
            return;
        }
        res.status(200).json({
            message: "Volunteer checked in successfully",
            volunteer: updatedVolunteer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error checking in volunteer", error: error.message });
    }
};
exports.checkInVolunteer = checkInVolunteer;
// Check-out volunteer
const checkOutVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer_1.default.findById(id);
        if (!volunteer) {
            res.status(404).json({ message: "Volunteer not found" });
            return;
        }
        // Calculate hours if checkInTime exists
        let hoursThisMonth = volunteer.hoursThisMonth;
        if (volunteer.checkInTime) {
            const checkInTime = new Date(volunteer.checkInTime);
            const checkOutTime = new Date();
            const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
            hoursThisMonth = Math.round((hoursThisMonth + hoursWorked) * 100) / 100;
        }
        const updatedVolunteer = await Volunteer_1.default.findByIdAndUpdate(id, {
            isCheckedIn: false,
            checkInTime: null,
            currentAssignment: null,
            hoursThisMonth: hoursThisMonth,
            totalHours: volunteer.totalHours + (hoursThisMonth - volunteer.hoursThisMonth),
            lastVisit: new Date()
        }, { new: true });
        res.status(200).json({
            message: "Volunteer checked out successfully",
            volunteer: updatedVolunteer
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error checking out volunteer", error: error.message });
    }
};
exports.checkOutVolunteer = checkOutVolunteer;
//# sourceMappingURL=volunteerController.js.map