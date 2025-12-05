import mongoose, { Document, Schema } from 'mongoose';

export interface IIncident extends Document {
  type: string;
  location: string;
  timestamp: Date;
  status: string;
  reportedBy?: string;
}

const incidentSchema: Schema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Reported', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Reported'
  },
  reportedBy: {
    type: String
  }
}, {
  timestamps: true
});

const Incident = mongoose.model<IIncident>('Incident', incidentSchema);
export default Incident;

export interface CreateIncidentRequest {
  type: string;
  location: string;
}