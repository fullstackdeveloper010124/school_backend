import mongoose, { Document } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'pending_approval' | 'inactive';
  backgroundCheck: 'completed' | 'pending' | 'expired';
  backgroundCheckDate: Date | null;
  hoursThisMonth: number;
  totalHours: number;
  joinDate: Date;
  lastVisit: Date | null;
  schedule: string;
  emergencyContact: string;
  skills: string[];
  isCheckedIn: boolean;
  checkInTime: Date | null;
  currentAssignment: string | null;
}

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'pending_approval', 'inactive'],
      default: 'pending_approval'
    },
    backgroundCheck: {
      type: String,
      enum: ['completed', 'pending', 'expired'],
      default: 'pending'
    },
    backgroundCheckDate: { type: Date, default: null },
    hoursThisMonth: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },
    lastVisit: { type: Date, default: null },
    schedule: { type: String, default: '' },
    emergencyContact: { type: String, default: '' },
    skills: [{ type: String }],
    isCheckedIn: { type: Boolean, default: false },
    checkInTime: { type: Date, default: null },
    currentAssignment: { type: String, default: null }
  },
  { timestamps: true }
);

export default mongoose.model<IVolunteer>("Volunteer", volunteerSchema);