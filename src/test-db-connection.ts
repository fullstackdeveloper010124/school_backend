import connectDB from "./config/db";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("Database connection verified!");

    // Test creating a sample user (will be deleted after)
    const sampleUser = new User({
      fullName: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      password: "hashed_password_for_test",
      role: "visitor",
      agreeTerms: true
    });

    // Save the user to ensure the collection is created
    const savedUser = await sampleUser.save();
    console.log("Sample user created:", savedUser._id);

    // Delete the sample user
    await User.deleteOne({ _id: savedUser._id });
    console.log("Sample user deleted");

    console.log("Database connection and User collection verified successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Database test failed:", error);
    process.exit(1);
  }
};

testConnection();