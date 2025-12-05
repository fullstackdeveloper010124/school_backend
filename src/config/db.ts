import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.DB_URL;

    if (!mongoUri) {
      throw new Error("DB_URL environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;