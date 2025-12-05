import { Request, Response } from 'express';
import Incident, { CreateIncidentRequest } from '../models/Incident';
import { isValidIncident, sanitizeString } from '../utils/validation';

export const getAllIncidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const incidents = await Incident.find({});
    res.status(200).json({
      success: true,
      data: incidents
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const incident = await Incident.findById(req.params.id);
    
    if (!incident) {
      res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: incident
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createIncident = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, location }: CreateIncidentRequest = req.body;
    
    // Sanitize inputs
    const sanitizedType = sanitizeString(type);
    const sanitizedLocation = sanitizeString(location);
    
    const newIncidentData: Partial<CreateIncidentRequest> = {
      type: sanitizedType,
      location: sanitizedLocation
    };
    
    if (!isValidIncident(newIncidentData)) {
      res.status(400).json({
        success: false,
        message: 'Type and location are required'
      });
      return;
    }
    
    const incident = new Incident({
      type: sanitizedType,
      location: sanitizedLocation
    });
    
    const savedIncident = await incident.save();
    
    res.status(201).json({
      success: true,
      data: savedIncident
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};