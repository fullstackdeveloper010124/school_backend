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
declare const _default: mongoose.Model<IVolunteer, {}, {}, {}, mongoose.Document<unknown, {}, IVolunteer, {}, mongoose.DefaultSchemaOptions> & IVolunteer & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IVolunteer>;
export default _default;
//# sourceMappingURL=Volunteer.d.ts.map