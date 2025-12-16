"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const volunteerController_1 = require("../controllers/volunteerController");
const router = (0, express_1.Router)();
// GET /api/volunteers - Get all volunteers
router.get("/", volunteerController_1.getAllVolunteers);
// GET /api/volunteers/:id - Get volunteer by ID
router.get("/:id", volunteerController_1.getVolunteerById);
// POST /api/volunteers - Create new volunteer
router.post("/", volunteerController_1.createVolunteer);
// PUT /api/volunteers/:id - Update volunteer
router.put("/:id", volunteerController_1.updateVolunteer);
// DELETE /api/volunteers/:id - Delete volunteer
router.delete("/:id", volunteerController_1.deleteVolunteer);
// PUT /api/volunteers/:id/checkin - Check-in volunteer
router.put("/:id/checkin", volunteerController_1.checkInVolunteer);
// PUT /api/volunteers/:id/checkout - Check-out volunteer
router.put("/:id/checkout", volunteerController_1.checkOutVolunteer);
exports.default = router;
//# sourceMappingURL=volunteerRoutes.js.map