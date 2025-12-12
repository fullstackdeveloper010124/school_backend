import express from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  getPendingApprovals,
  updateUserRoleStatus,
  updateVolunteerStatus,
  updateIncidentStatus
} from '../controllers/adminController';

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// Get all pending approvals
router.get('/approvals/pending', getPendingApprovals);

// Update user role status (approve/reject)
router.put('/users/status', updateUserRoleStatus);

// Update volunteer status (approve/reject)
router.put('/volunteers/status', updateVolunteerStatus);

// Update incident status
router.put('/incidents/status', updateIncidentStatus);

export default router;