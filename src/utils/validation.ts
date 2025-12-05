import { CreateIncidentRequest } from '../models/Incident';

export const isValidIncident = (incident: Partial<CreateIncidentRequest>): boolean => {
  return !!(incident.type && incident.location);
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[^a-zA-Z0-9\s\-_]/g, '');
};