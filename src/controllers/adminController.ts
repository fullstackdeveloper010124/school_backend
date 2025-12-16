import { Request, Response } from 'express';
import User from '../models/User';
import Volunteer from '../models/Volunteer';
import Incident from '../models/Incident';

// Get all pending approvals
export const getPendingApprovals = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get pending users (visitors waiting for role approval)
    const pendingUsers = await User.find({ isApproved: false, role: { $ne: "admin" } }).select('-password');
    
    // Get pending volunteers
    const pendingVolunteers = await Volunteer.find({ status: 'pending_approval' });
    
    // Get pending incidents (if needed)
    const pendingIncidents = await Incident.find({ status: 'Reported' });
    
    res.status(200).json({
      success: true,
      data: {
        pendingUsers,
        pendingVolunteers,
        pendingIncidents
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all users (for admin dashboard)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get all users (including admins)
    const users = await User.find({}).select('-password');
    
    res.status(200).json({
      success: true,
      data: {
        users
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Approve or reject a user role
export const updateUserRoleStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, newRole, action } = req.body;
    
    if (!userId || !action) {
      res.status(400).json({
        success: false,
        message: 'User ID and action are required'
      });
      return;
    }
    
    if (action !== 'approve' && action !== 'reject') {
      res.status(400).json({
        success: false,
        message: 'Action must be either "approve" or "reject"'
      });
      return;
    }
    
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }
    
    if (action === 'approve') {
      // Approve user and assign role
      user.role = newRole || 'visitor'; // Default to visitor if no role specified
      user.isApproved = true; // Mark user as approved
      await user.save();
      
      res.status(200).json({
        success: true,
        message: `User approved with role: ${user.role}`,
        user
      });
    } else {
      // Reject user - could delete or mark as rejected
      await User.deleteOne({ _id: userId });
      
      res.status(200).json({
        success: true,
        message: 'User rejected and removed'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Approve or reject a volunteer
export const updateVolunteerStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { volunteerId, action } = req.body;
    
    if (!volunteerId || !action) {
      res.status(400).json({
        success: false,
        message: 'Volunteer ID and action are required'
      });
      return;
    }
    
    if (action !== 'approve' && action !== 'reject') {
      res.status(400).json({
        success: false,
        message: 'Action must be either "approve" or "reject"'
      });
      return;
    }
    
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      res.status(404).json({
        success: false,
        message: 'Volunteer not found'
      });
      return;
    }
    
    if (action === 'approve') {
      // Approve volunteer
      volunteer.status = 'active';
      await volunteer.save();
      
      res.status(200).json({
        success: true,
        message: 'Volunteer approved',
        volunteer
      });
    } else {
      // Reject volunteer
      volunteer.status = 'inactive';
      await volunteer.save();
      
      res.status(200).json({
        success: true,
        message: 'Volunteer rejected',
        volunteer
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update incident status
export const updateIncidentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { incidentId, status } = req.body;
    
    if (!incidentId || !status) {
      res.status(400).json({
        success: false,
        message: 'Incident ID and status are required'
      });
      return;
    }
    
    const validStatuses = ['Reported', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
      return;
    }
    
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
      return;
    }
    
    incident.status = status;
    await incident.save();
    
    res.status(200).json({
      success: true,
      message: `Incident status updated to: ${status}`,
      incident
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};