import { Router } from "express";
import {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer,
  checkInVolunteer,
  checkOutVolunteer
} from "../controllers/volunteerController";
import { auth } from "../middleware/auth";
import { adminAuth } from "../middleware/adminAuth";

const router = Router();

// Apply auth middleware to all routes
router.use(auth);

// GET /api/volunteers - Get all volunteers (admin only)
router.get("/", adminAuth, getAllVolunteers);

// GET /api/volunteers/:id - Get volunteer by ID (admin only)
router.get("/:id", adminAuth, getVolunteerById);

// POST /api/volunteers - Create new volunteer (admin only)
router.post("/", adminAuth, createVolunteer);

// PUT /api/volunteers/:id - Update volunteer (admin only)
router.put("/:id", adminAuth, updateVolunteer);

// DELETE /api/volunteers/:id - Delete volunteer (admin only)
router.delete("/:id", adminAuth, deleteVolunteer);

// PUT /api/volunteers/:id/checkin - Check-in volunteer (admin only)
router.put("/:id/checkin", adminAuth, checkInVolunteer);

// PUT /api/volunteers/:id/checkout - Check-out volunteer (admin only)
router.put("/:id/checkout", adminAuth, checkOutVolunteer);

export default router;