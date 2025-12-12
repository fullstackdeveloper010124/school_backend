import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "visitor" | "student" | "teacher" | "parent" | "admin";
  agreeTerms: boolean;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["visitor", "student", "teacher", "parent", "admin"],
      default: "visitor"
    },
    agreeTerms: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);