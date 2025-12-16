"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeString = exports.isValidIncident = void 0;
const isValidIncident = (incident) => {
    return !!(incident.type && incident.location);
};
exports.isValidIncident = isValidIncident;
const sanitizeString = (str) => {
    return str.trim().replace(/[^a-zA-Z0-9\s\-_]/g, '');
};
exports.sanitizeString = sanitizeString;
//# sourceMappingURL=validation.js.map