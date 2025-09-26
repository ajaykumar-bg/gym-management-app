# RoleConfiguration Component

The RoleConfiguration component manages role-based access control for the gym management application, providing a comprehensive interface for testing and understanding different permission levels.

## Component Structure

```
RoleConfiguration/
├── index.js                  # Main exports
├── RoleConfiguration.js      # Main container component
├── UserInformation.js        # Current user display
├── RoleManagement.js         # Role switching functionality
├── CurrentPermissions.js     # Current user permissions grid
├── RoleComparison.js         # Permission comparison table
├── RoleDetails.js           # Role access details cards
├── role.constants.js        # Role and permission configuration
└── README.md               # Component documentation
```

## Components

### RoleConfiguration (Main Container)

- **Purpose**: Main container that orchestrates the role configuration layout for gym management
- **Layout**: Uses Grid system to arrange all role management components
- **Responsive**: Adapts layout for different screen sizes

### UserInformation

- **Purpose**: Displays current user information and role
- **Features**:
  - User name, email, and current role
  - Role-specific icons (Admin: AdminPanel, Trainer: FitnessCenter, Member: Person)
  - Dynamic role chip styling
- **Integration**: Uses `useUser` hook from UserContext

### RoleManagement

- **Purpose**: Handles role switching functionality for testing permissions
- **Features**:
  - Interactive role switching buttons
  - Gym-specific role descriptions and explanations
  - Visual feedback for current role
  - Alert for immediate role change effects
- **State Management**: Uses `switchRole` function from UserContext

### CurrentPermissions

- **Purpose**: Displays current user's gym-specific permissions in a visual grid
- **Features**:
  - Permission cards with enabled/disabled states
  - Color-coded permission status
  - Responsive grid layout
- **Data**: Uses permissions from UserContext and labels from constants

### RoleComparison

- **Purpose**: Compares gym management permissions across all roles in a table format
- **Features**:
  - Interactive table with role comparison
  - Legend for permission levels
  - Visual indicators for access levels (Full/View/None)
  - Hover effects for better UX
- **Logic**: Complex permission calculation for gym-specific roles

### RoleDetails

- **Purpose**: Shows detailed access information for each gym role
- **Features**:
  - Role-specific access cards
  - Color-coded role categories
  - Feature lists for each role
- **Design**: Uses role-specific themes and colors

## Gym Management Permission System

### Admin Role

- **Access**: Full gym management access
- **Permissions**: All modules including member management, trainer oversight, financial management
- **Capabilities**:
  - Manage all members and trainers
  - Access financial reports and payments
  - Configure gym settings and equipment
  - View comprehensive analytics
- **Color Theme**: Red (error color)
- **Icon**: AdminPanelSettings

### Trainer Role

- **Access**: Training and member management focus
- **Permissions**: Member management, class scheduling, equipment tracking, analytics
- **Capabilities**:
  - Manage assigned members
  - Schedule and conduct classes
  - Track equipment usage
  - View training analytics
- **Restrictions**: No financial access, user management, or trainer oversight
- **Color Theme**: Orange (warning color)
- **Icon**: FitnessCenter

### Member Role

- **Access**: Self-service gym experience
- **Permissions**: Personal dashboard, class booking, workout tracking
- **Capabilities**:
  - View personal profile and membership
  - Book available classes
  - Track workout progress
  - View payment history
- **Restrictions**: No management access to other members, trainers, or gym operations
- **Color Theme**: Blue (primary color)
- **Icon**: Person

## Gym-Specific Permissions

### Core Permissions

- **canViewDashboard**: Access to personal/role-specific dashboard
- **canManageMembers**: Create, edit, and manage gym member profiles
- **canManageTrainers**: Oversee trainer profiles and assignments (Admin only)
- **canManageClasses**: Schedule, modify, and manage fitness classes
- **canManageEquipment**: Track and manage gym equipment
- **canManageMemberships**: Handle membership plans and renewals
- **canManagePayments**: Process payments and handle billing
- **canAccessRoleConfiguration**: Access role management system
- **canManageUsers**: System user management
- **canViewAllReports**: Access comprehensive gym reports
- **canViewAnalytics**: View gym performance and member analytics
- **canViewFinancials**: Access financial reports and data

### Permission Levels

- **Full Access (✓)**: Complete read/write permissions
- **View Only (◐)**: Read-only access with limited interaction
- **No Access (✗)**: No access to the module or feature

## Usage

```javascript
import RoleConfiguration from './features/RoleConfiguration';

// The RoleConfiguration component is fully self-contained for gym management
<RoleConfiguration />;
```

## UserContext Integration

The RoleConfiguration component integrates with the gym management application's UserContext:

- Uses `useUser` hook to get current user and gym-specific permissions
- Supports real-time role switching with `switchRole` function
- Changes are applied globally across the gym management application
- Permission updates are reflected immediately in the UI

## Testing Gym Role Changes

The component provides an interactive way to test different gym permission levels:

1. Switch between Admin, Trainer, and Member roles
2. View real-time permission changes for gym operations
3. See how different roles affect gym dashboard visibility
4. Compare access levels across all roles in the gym management system
5. Test member booking capabilities vs trainer class management vs admin oversight

## Development Notes

- All permission constants are centralized in `role.constants.js`
- Icons are gym-appropriate (FitnessCenter for trainers, Person for members)
- Permission logic handles gym-specific workflows (class booking, member management, etc.)
- Components are designed to be easily extensible for additional gym features
