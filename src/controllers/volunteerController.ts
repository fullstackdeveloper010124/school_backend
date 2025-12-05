import { Request, Response } from "express";
import Volunteer, { IVolunteer } from "../models/Volunteer";

// Get all volunteers
export const getAllVolunteers = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.status(200).json(volunteers);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching volunteers", error: error.message });
  }
};

// Get volunteer by ID
export const getVolunteerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findById(id);
    
    if (!volunteer) {
      res.status(404).json({ message: "Volunteer not found" });
      return;
    }
    
    res.status(200).json(volunteer);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching volunteer", error: error.message });
  }
};

// Create new volunteer
export const createVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const volunteerData = req.body;
    const newVolunteer = new Volunteer(volunteerData);
    const savedVolunteer = await newVolunteer.save();
    
    res.status(201).json({
      message: "Volunteer created successfully",
      volunteer: savedVolunteer
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating volunteer", error: error.message });
  }
};

// Update volunteer
export const updateVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedVolunteer) {
      res.status(404).json({ message: "Volunteer not found" });
      return;
    }
    
    res.status(200).json({
      message: "Volunteer updated successfully",
      volunteer: updatedVolunteer
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating volunteer", error: error.message });
  }
};

// Delete volunteer
export const deleteVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
    
    if (!deletedVolunteer) {
      res.status(404).json({ message: "Volunteer not found" });
      return;
    }
    
    res.status(200).json({
      message: "Volunteer deleted successfully",
      volunteer: deletedVolunteer
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting volunteer", error: error.message });
  }
};

// Check-in volunteer
export const checkInVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { assignment } = req.body;
    
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      {
        isCheckedIn: true,
        checkInTime: new Date(),
        currentAssignment: assignment
      },
      { new: true }
    );
    
    if (!updatedVolunteer) {
      res.status(404).json({ message: "Volunteer not found" });
      return;
    }
    
    res.status(200).json({
      message: "Volunteer checked in successfully",
      volunteer: updatedVolunteer
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error checking in volunteer", error: error.message });
  }
};

// Check-out volunteer
export const checkOutVolunteer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const volunteer = await Volunteer.findById(id);
    
    if (!volunteer) {
      res.status(404).json({ message: "Volunteer not found" });
      return;
    }
    
    // Calculate hours if checkInTime exists
    let hoursThisMonth = volunteer.hoursThisMonth;
    if (volunteer.checkInTime) {
      const checkInTime = new Date(volunteer.checkInTime);
      const checkOutTime = new Date();
      const hoursWorked = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      hoursThisMonth = Math.round((hoursThisMonth + hoursWorked) * 100) / 100;
    }
    
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      {
        isCheckedIn: false,
        checkInTime: null,
        currentAssignment: null,
        hoursThisMonth: hoursThisMonth,
        totalHours: volunteer.totalHours + (hoursThisMonth - volunteer.hoursThisMonth),
        lastVisit: new Date()
      },
      { new: true }
    );
    
    res.status(200).json({
      message: "Volunteer checked out successfully",
      volunteer: updatedVolunteer
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error checking out volunteer", error: error.message });
  }
};