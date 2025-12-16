import mongoose, { Document } from 'mongoose';
export interface IIncident extends Document {
    type: string;
    location: string;
    timestamp: Date;
    status: string;
    reportedBy?: string;
}
declare const Incident: mongoose.Model<IIncident, {}, {}, {}, mongoose.Document<unknown, {}, IIncident, {}, mongoose.DefaultSchemaOptions> & IIncident & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IIncident>;
export default Incident;
export interface CreateIncidentRequest {
    type: string;
    location: string;
}
//# sourceMappingURL=Incident.d.ts.map