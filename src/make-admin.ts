import dotenv from 'dotenv';
import User from './models/User';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const makeAdmin = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found`);
      process.exit(1);
    }
    
    user.isAdmin = true;
    user.role = 'admin';
    await user.save();
    
    console.log(`User ${user.email} has been made an admin`);
    process.exit(0);
  } catch (error) {
    console.error('Error making user admin:', error);
    process.exit(1);
  }
};

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Please provide an email address as an argument');
  console.log('Usage: npm run make-admin user@example.com');
  process.exit(1);
}

makeAdmin(email);