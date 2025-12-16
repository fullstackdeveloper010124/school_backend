import express from 'express';
import { adminAuth } from '../middleware/adminAuth';
import {
  getPendingApprovals,
  getAllUsers,
  updateUserRoleStatus,
  updateVolunteerStatus,
  updateIncidentStatus
} from '../controllers/adminController';

const router = express.Router();

// All routes require admin authentication
router.use(adminAuth);

// Get all pending approvals
router.get('/approvals/pending', getPendingApprovals);

// Get all users
router.get('/users', getAllUsers);

// Update user role status (approve/reject)
router.put('/users/status', updateUserRoleStatus);

// Update volunteer status (approve/reject)
router.put('/volunteers/status', updateVolunteerStatus);

// Update incident status
router.put('/incidents/status', updateIncidentStatus);

export default router;