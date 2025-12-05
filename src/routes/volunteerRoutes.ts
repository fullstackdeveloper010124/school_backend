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

const router = Router();

// GET /api/volunteers - Get all volunteers
router.get("/", getAllVolunteers);

// GET /api/volunteers/:id - Get volunteer by ID
router.get("/:id", getVolunteerById);

// POST /api/volunteers - Create new volunteer
router.post("/", createVolunteer);

// PUT /api/volunteers/:id - Update volunteer
router.put("/:id", updateVolunteer);

// DELETE /api/volunteers/:id - Delete volunteer
router.delete("/:id", deleteVolunteer);

// PUT /api/volunteers/:id/checkin - Check-in volunteer
router.put("/:id/checkin", checkInVolunteer);

// PUT /api/volunteers/:id/checkout - Check-out volunteer
router.put("/:id/checkout", checkOutVolunteer);

export default router;