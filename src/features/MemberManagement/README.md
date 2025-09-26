# Member Management Module

The Member Management module provides comprehensive functionality for managing gym members, including profile management, membership tracking, and role-based access control.

## Features

### Core Functionality

- **Member Profiles**: View and edit detailed member information including personal details, membership status, and fitness goals
- **Member List**: Browse, search, and filter members with different views for different user roles
- **Add/Edit Members**: Complete form for adding new members or editing existing member information
- **Role-Based Access**: Different permissions for Admin, Trainer, and Member roles

### Components

#### MemberManagement (Main Component)

- Entry point for the member management feature
- Handles routing between list, profile, and form views
- Manages member data state and operations

#### MemberList

- Displays members in a searchable and filterable table
- Supports actions like view, edit, and delete based on user permissions
- Implements pagination for large member lists

#### MemberProfile

- Detailed member information display with tabbed interface
- Shows personal info, membership details, fitness goals, and visit history
- Includes action buttons for editing and managing the member

#### MemberForm

- Comprehensive form for adding new members or editing existing ones
- Includes validation for required fields
- Supports all member data including emergency contacts and physical information

### Data Structure

Members contain the following information:

- Basic Information (name, email, phone, address, date of birth)
- Emergency Contact details
- Membership information (type, status, join date)
- Physical information (height, weight, BMI calculation)
- Fitness goals and medical conditions
- Trainer assignment and workout preferences
- Visit tracking and activity history

### Role-Based Permissions

#### Admin

- Full access to all members
- Can create, edit, and delete members
- Can view all member statistics and reports

#### Trainer

- Can view members assigned to them
- Can edit basic information for assigned members
- Can view member progress and fitness goals

#### Member

- Can only view their own profile
- Limited editing capabilities for personal information
- Cannot see other members' information

### Mock Data

The module includes comprehensive mock data with realistic member profiles for development and testing purposes.

## Usage

```javascript
import MemberManagement from '../features/MemberManagement';

// In your routing
<Route path='/members' component={MemberManagement} />;
```

## Dependencies

- Material-UI components for consistent UI
- UserContext for role-based permissions
- React hooks for state management

## Future Enhancements

- Member photo upload and management
- Advanced search and filtering options
- Member communication features
- Integration with billing and payment systems
- Member portal for self-service features
- Membership renewal and upgrade workflows
