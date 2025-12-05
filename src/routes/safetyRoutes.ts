import express from 'express';
import {
  getAllIncidents,
  getIncidentById,
  createIncident
} from '../controllers/safetyController';

const router = express.Router();

router.get('/incidents', getAllIncidents);
router.get('/incidents/:id', getIncidentById);
router.post('/incidents', createIncident);

export default router;