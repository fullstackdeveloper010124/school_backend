import dotenv from 'dotenv';
import User from './models/User';
import Volunteer from './models/Volunteer';
import Incident from './models/Incident';
import connectDB from './config/db';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const verifyData = async () => {
  try {
    console.log('=== DATABASE VERIFICATION ===\n');
    
    // Verify users
    const users = await User.find({});
    console.log(`Users (${users.length}):`);
    users.forEach(user => {
      console.log(`  - ${user.fullName} (${user.role}) ${user.isAdmin ? '[ADMIN]' : ''} ${user.isApproved ? '[APPROVED]' : '[PENDING APPROVAL]'}`);
    });
    
    console.log('');
    
    // Verify volunteers
    const volunteers = await Volunteer.find({});
    console.log(`Volunteers (${volunteers.length}):`);
    volunteers.forEach(volunteer => {
      console.log(`  - ${volunteer.name} (${volunteer.status})`);
    });
    
    console.log('');
    
    // Verify incidents
    const incidents = await Incident.find({});
    console.log(`Incidents (${incidents.length}):`);
    incidents.forEach(incident => {
      console.log(`  - ${incident.type} (${incident.status})`);
    });
    
    console.log('\n=== VERIFICATION COMPLETE ===');
    
    process.exit(0);
  } catch (error) {
    console.error('Error verifying data:', error);
    process.exit(1);
  }
};

verifyData();