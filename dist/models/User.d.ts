import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role: "visitor" | "student" | "teacher" | "parent" | "admin";
    agreeTerms: boolean;
    isAdmin: boolean;
    isApproved: boolean;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map