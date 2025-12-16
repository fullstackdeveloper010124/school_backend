"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIncident = exports.getIncidentById = exports.getAllIncidents = void 0;
const Incident_1 = __importDefault(require("../models/Incident"));
const validation_1 = require("../utils/validation");
const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident_1.default.find({});
        res.status(200).json({
            success: true,
            data: incidents
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getAllIncidents = getAllIncidents;
const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident_1.default.findById(req.params.id);
        if (!incident) {
            res.status(404).json({
                success: false,
                message: 'Incident not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: incident
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getIncidentById = getIncidentById;
const createIncident = async (req, res) => {
    try {
        const { type, location } = req.body;
        // Sanitize inputs
        const sanitizedType = (0, validation_1.sanitizeString)(type);
        const sanitizedLocation = (0, validation_1.sanitizeString)(location);
        const newIncidentData = {
            type: sanitizedType,
            location: sanitizedLocation
        };
        if (!(0, validation_1.isValidIncident)(newIncidentData)) {
            res.status(400).json({
                success: false,
                message: 'Type and location are required'
            });
            return;
        }
        const incident = new Incident_1.default({
            type: sanitizedType,
            location: sanitizedLocation
        });
        const savedIncident = await incident.save();
        res.status(201).json({
            success: true,
            data: savedIncident
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.createIncident = createIncident;
//# sourceMappingURL=safetyController.js.map