// Demo signup data
const demoUsers = [
  {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+1234567890",
    password: "securePassword123",
    confirmPassword: "securePassword123",
    role: "visitor",
    agreeTerms: true
  },
  {
    fullName: "Alice Johnson",
    email: "alice.johnson@student.school.edu",
    phone: "+1987654321",
    password: "studentPass456",
    confirmPassword: "studentPass456",
    role: "student",
    agreeTerms: true
  },
  {
    fullName: "Robert Davis",
    email: "robert.davis@school.edu",
    phone: "+1555123456",
    password: "teacherPass789",
    confirmPassword: "teacherPass789",
    role: "teacher",
    agreeTerms: true
  }
];

const API_BASE_URL = 'http://localhost:3001';

const demoSignup = async () => {
  console.log('Starting signup demo...\n');
  
  for (const [index, user] of demoUsers.entries()) {
    try {
      console.log(`Attempting to register ${user.role}: ${user.fullName}`);
      
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      
      if (!response.ok) {
        const errorData: any = await response.json();
        throw new Error(errorData.message || 'Unknown error');
      }
      
      const data: any = await response.json();
      
      console.log(`✓ Success! ${user.role} registered:`);
      console.log(`  ID: ${data.user.id}`);
      console.log(`  Name: ${data.user.fullName}`);
      console.log(`  Email: ${data.user.email}`);
      console.log(`  Token: ${data.token.substring(0, 30)}...\n`);
    } catch (error: any) {
      if (error.message) {
        console.log(`✗ Failed to register ${user.role}: ${error.message}\n`);
      } else {
        console.log(`✗ Network error: ${error.message}\n`);
      }
    }
  }
  
  console.log('Demo completed.');
};

demoSignup();