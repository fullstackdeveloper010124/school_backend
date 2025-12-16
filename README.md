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
- User approval system requiring admin authorization before login

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login (requires admin approval for non-admin users)
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
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/status` - Approve/reject user role
- `PUT /api/admin/volunteers/status` - Approve/reject volunteer
- `PUT /api/admin/incidents/status` - Update incident status

## Admin Functionality
The system includes an admin dashboard with the following capabilities:

1. View all pending approvals:
   - New user registrations awaiting approval
   - Volunteer applications awaiting approval

2. View all users:
   - See all registered users and their approval status
   - Manage user roles and permissions

3. Approve or reject users:
   - Assign appropriate roles (student, teacher, parent) to visitors
   - Reject and remove inappropriate registrations

4. Manage volunteers:
   - Approve volunteer applications
   - Reject volunteer applications

5. Update incident statuses:
   - Change incident status from "Reported" to "In Progress", "Completed", or "Cancelled"

## User Approval Workflow
1. Users sign up through the registration form
2. New users are marked as "pending approval" in the system
3. Admins review pending users through the admin dashboard
4. Admins either approve (granting access) or reject (removing) users
5. Approved users can then log in to the system

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

## Initializing Demo Data
To initialize the database with sample data for testing the admin approval system:
```
npm run init-demo
```

This will populate the database with:
- Sample users with different roles (admin, visitor, student, teacher)
- Sample volunteers with different statuses (pending, active, inactive)
- Sample incidents with different statuses (reported, in progress, completed)

## Verifying Database Content
To verify that all data has been properly set in the database:
```
npm run verify-data
```

## Demo
To run the demo signup script:
```
npx ts-node src/demo-signup.ts
```