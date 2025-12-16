"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../middleware/adminAuth");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// All routes require admin authentication
router.use(adminAuth_1.adminAuth);
// Get all pending approvals
router.get('/approvals/pending', adminController_1.getPendingApprovals);
// Get all users
router.get('/users', adminController_1.getAllUsers);
// Update user role status (approve/reject)
router.put('/users/status', adminController_1.updateUserRoleStatus);
// Update volunteer status (approve/reject)
router.put('/volunteers/status', adminController_1.updateVolunteerStatus);
// Update incident status
router.put('/incidents/status', adminController_1.updateIncidentStatus);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map