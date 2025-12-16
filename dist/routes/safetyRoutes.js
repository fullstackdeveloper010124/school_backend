"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const safetyController_1 = require("../controllers/safetyController");
const router = express_1.default.Router();
router.get('/incidents', safetyController_1.getAllIncidents);
router.get('/incidents/:id', safetyController_1.getIncidentById);
router.post('/incidents', safetyController_1.createIncident);
exports.default = router;
//# sourceMappingURL=safetyRoutes.js.map