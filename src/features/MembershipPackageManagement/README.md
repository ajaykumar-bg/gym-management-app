# Membership & Package Management

A comprehensive module for managing gym membership packages and member subscriptions with advanced analytics and role-based access control.

## Features

### 📦 Package Management

- Create and edit membership packages with flexible pricing models
- Support for multiple membership types (Basic, Premium, VIP, Student, Corporate, Family, Lifetime)
- Configurable durations (Monthly, Quarterly, Semi-annual, Annual, Lifetime)
- Rich feature lists and package descriptions
- Status management (Active, Inactive, Archived)
- Package popularity tracking and revenue analytics

### 👥 Subscription Management

- Track member subscriptions across all packages
- Real-time subscription status monitoring (Active, Expired, Suspended, Cancelled)
- Payment status tracking (Paid, Pending, Failed, Overdue)
- Automatic expiration notifications and alerts
- Subscription renewal management
- Member subscription history

### 📊 Analytics & Statistics

- Revenue tracking and financial analytics
- Package performance metrics and popularity rankings
- Member growth and retention statistics
- Payment status breakdowns and alerts
- Real-time dashboard with key performance indicators
- Trend analysis and reporting

### 🎛️ Advanced Filtering & Search

- Multi-criteria filtering by type, duration, status
- Intelligent search across packages and subscriptions
- Sorting by popularity, price, creation date
- Real-time filter state management
- Export capabilities for reporting

## Components

### Main Components

#### `MembershipPackageManagement.js`

The main orchestrating component that provides:

- Tabbed interface for Packages, Subscriptions, and Statistics
- Centralized state management for all data
- Responsive design with mobile-optimized FAB
- Role-based feature access control
- Comprehensive CRUD operations

### Specialized Components

#### `PackageCard.js`

Displays membership packages with:

- Package details, pricing, and features
- Subscription count and revenue metrics
- Status indicators and management actions
- Responsive card layout with hover effects
- Feature truncation for clean presentation

#### `PackageForm.js`

Comprehensive form for package creation/editing:

- Multi-step form with validation
- Dynamic feature management
- Pricing configuration with discounts
- Auto-renewal and limit settings
- Real-time validation with error handling

#### `SubscriptionCard.js`

Member subscription management interface:

- Subscription details and timeline
- Status management with quick actions
- Expiration alerts and notifications
- Payment status tracking
- Member information display

#### `MembershipStats.js`

Advanced analytics dashboard:

- Revenue metrics and trends
- Package performance rankings
- Member statistics and growth
- Alert system for overdue payments
- Interactive charts and visualizations

## Data Structure

### Membership Package

```javascript
{
  id: string,
  name: string,
  description: string,
  type: 'basic' | 'premium' | 'vip' | 'student' | 'corporate' | 'family',
  duration: 'monthly' | 'quarterly' | 'semiannual' | 'annual' | 'lifetime',
  price: number,
  features: string[],
  status: 'active' | 'inactive' | 'archived',
  maxMembers: number | null,
  discountPercentage: number,
  autoRenewal: boolean,
  createdDate: string,
  updatedDate?: string
}
```

### Member Subscription

```javascript
{
  id: string,
  memberId: string,
  packageId: string,
  startDate: string,
  endDate: string,
  status: 'active' | 'expired' | 'suspended' | 'cancelled',
  paymentStatus: 'paid' | 'pending' | 'failed' | 'overdue',
  price: number,
  autoRenewal: boolean,
  nextPaymentDate?: string,
  totalPaid?: number
}
```

## Role-Based Access Control

### Admin

- Full package management (create, edit, delete)
- Complete subscription oversight
- Financial analytics and reporting
- User role and permission management

### Trainer

- View membership packages for member enrollment
- Limited subscription viewing for assigned members
- Package information for consultations

### Member

- View available membership packages
- Personal subscription history
- Payment status and renewal information

## Usage

### Basic Implementation

```javascript
import MembershipPackageManagement from './features/MembershipPackageManagement';

function App() {
  return <MembershipPackageManagement userRole={currentUser.permissions} />;
}
```

### Integration with Navigation

The module automatically integrates with the gym management system's navigation:

- Sidebar navigation item with role-based visibility
- Route configuration in `AppRoutes.js`
- Permission system integration

## Utilities

### Filter Functions

- `filterPackagesByType()` - Filter packages by membership type
- `filterPackagesByStatus()` - Filter by package status
- `filterSubscriptionsByStatus()` - Filter subscriptions by status
- `searchPackages()` - Intelligent package search
- `searchSubscriptions()` - Subscription search functionality

### Validation Functions

- `validatePackageData()` - Comprehensive package validation
- `generatePackageId()` - Unique ID generation
- `generateSubscriptionId()` - Subscription ID generation

### Analytics Functions

- `calculateRevenueStats()` - Revenue analytics calculations
- `getMembershipStats()` - Membership statistics
- `getDaysUntilExpiry()` - Expiration calculations
- `isExpiringSoon()` - Expiration alerts
- `formatCurrency()` - Consistent currency formatting

## Mock Data

The module includes comprehensive mock data:

- 7 diverse membership packages covering all business scenarios
- 6 sample subscriptions with various statuses
- Realistic pricing and feature sets
- Representative member scenarios

## Best Practices

1. **Performance**: Uses React.memo and useMemo for optimized rendering
2. **Accessibility**: WCAG-compliant with proper ARIA labels
3. **Mobile-First**: Responsive design with touch-friendly interfaces
4. **Error Handling**: Comprehensive validation and error recovery
5. **User Experience**: Intuitive workflows with clear feedback
6. **Security**: Role-based access with permission checks

## Future Enhancements

- Integration with payment gateways
- Automated subscription renewals
- Email notification system
- Advanced reporting with data export
- Member communication tools
- Integration with third-party CRM systems

This module provides a complete business solution for gym membership management, combining powerful features with an intuitive interface and robust architecture.
