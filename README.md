# school_backend
School Safety System Backend

## Overview
This is the backend API for a school safety system built with Node.js, Express, and MongoDB. It provides functionality for user authentication, incident reporting, and volunteer management.

## Features
- User authentication (signup, login, password reset)
- Role-based access control (visitor, student, teacher, parent, admin)
- Incident reporting and management
- Volunteer management with check-in/check-out functionality
- Admin dashboard for approving/rejecting users and volunteers

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Incidents
- `GET /api/incidents` - Get all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `POST /api/incidents` - Create new incident

### Volunteers
- `GET /api/volunteers` - Get all volunteers
- `GET /api/volunteers/:id` - Get volunteer by ID
- `POST /api/volunteers` - Create new volunteer
- `PUT /api/volunteers/:id` - Update volunteer
- `DELETE /api/volunteers/:id` - Delete volunteer
- `PUT /api/volunteers/:id/checkin` - Check-in volunteer
- `PUT /api/volunteers/:id/checkout` - Check-out volunteer

### Admin (requires admin authentication)
- `GET /api/admin/approvals/pending` - Get all pending approvals
- `PUT /api/admin/users/status` - Approve/reject user role
- `PUT /api/admin/volunteers/status` - Approve/reject volunteer
- `PUT /api/admin/incidents/status` - Update incident status

## Admin Functionality
The system includes an admin dashboard with the following capabilities:

1. View all pending approvals:
   - New user registrations with "visitor" role awaiting approval
   - Volunteer applications awaiting approval

2. Approve or reject users:
   - Assign appropriate roles (student, teacher, parent) to visitors
   - Reject and remove inappropriate registrations

3. Manage volunteers:
   - Approve volunteer applications
   - Reject volunteer applications

4. Update incident statuses:
   - Change incident status from "Reported" to "In Progress", "Completed", or "Cancelled"

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the development server: `npm run dev`

## Making a User Admin
To make a user an admin, use the following command:
```
npm run make-admin user@example.com
```

## Demo
To run the demo signup script:
```
npx ts-node src/demo-signup.ts
```