# Dashboard Feature

A comprehensive dashboard feature for the gym management application with role-based content and interactive charts.

## Overview

The Dashboard provides a personalized experience for each user role (Admin, Trainer, Member) with relevant statistics, charts, activities, and quick actions.

## Components Structure

```
Dashboard/
├── Dashboard.js                    # Main dashboard container
├── index.js                       # Feature exports
├── constants.js                   # Dashboard data and configuration
├── dashboard.utils.js             # Utility functions
└── components/
    ├── index.js                   # Component exports
    ├── StatCard.js               # Individual stat display card
    ├── RecentActivity.js         # Recent activities list
    ├── QuickActions.js           # Quick action buttons
    ├── MembershipGrowthChart.js  # Line chart for membership growth
    ├── RevenueChart.js           # Bar chart for revenue
    ├── ClassAttendanceChart.js   # Pie chart for class attendance
    ├── WorkoutChart.js           # Bar chart for member workouts
    └── TrainerScheduleChart.js   # Line chart for trainer schedule
```

## Role-Based Dashboards

### Admin Dashboard

- **Stats**: Total Members, Active Trainers, Monthly Revenue, Equipment Issues
- **Charts**: Membership Growth, Class Attendance, Monthly Revenue
- **Activities**: New member registrations, payments, equipment updates, trainer onboarding
- **Quick Actions**: Add New Member, View Reports, Manage Equipment, Financial Overview

### Trainer Dashboard

- **Stats**: My Members, Today's Classes, Weekly Hours, Member Progress
- **Charts**: Daily Class Schedule, My Class Attendance
- **Activities**: Class completions, new member assignments, member progress updates
- **Quick Actions**: Schedule Class, View My Members, Member Progress, Equipment Check

### Member Dashboard

- **Stats**: Workouts This Month, Calories Burned, Membership Days Left, Next Class
- **Charts**: Weekly Workouts, Available Classes
- **Activities**: Workout completions, class bookings, achievements, measurements
- **Quick Actions**: Book a Class, Track Workout, View Progress, Update Profile

## Key Features

### 📊 Interactive Charts

- Built with @mui/x-charts 8.11.1
- Line charts for trends (membership growth, class schedules)
- Bar charts for comparisons (revenue, workouts)
- Pie charts for distributions (class attendance)

### 📈 Statistical Cards

- Role-specific KPIs and metrics
- Color-coded change indicators
- Hover effects and animations
- Icon-based visual identification

### 🔄 Recent Activities

- Real-time activity feed
- Role-appropriate activity types
- Avatar-based activity identification
- Time-based activity sorting

### ⚡ Quick Actions

- Role-specific action buttons
- Direct navigation to key features
- Icon-based action identification
- Responsive grid layout

### 🎨 Visual Design

- Material-UI 7.3.2 Grid system with `size` prop
- Consistent color theming
- Responsive design for all screen sizes
- Smooth animations and hover effects

## Technical Implementation

### Chart Integration

```javascript
import { LineChart, BarChart, PieChart } from '@mui/x-charts';

// Line Chart Example
<LineChart
  width={500}
  height={300}
  series={[
    {
      data: dataArray,
      label: 'Series Name',
      color: theme.palette.primary.main,
    },
  ]}
  xAxis={[{ scaleType: 'point', data: xAxisLabels }]}
/>;
```

### Grid Layout (MUI 7.3.2)

```javascript
<Grid container spacing={3}>
  <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
    <StatCard />
  </Grid>
  <Grid size={{ xs: 12, lg: 8 }}>
    <Chart />
  </Grid>
</Grid>
```

### Role-Based Rendering

```javascript
const { user } = useUser();
const userStats = DASHBOARD_STATS[user.role] || [];

const renderRoleSpecificCharts = () => {
  switch (user.role) {
    case 'admin':
      return <AdminCharts />;
    case 'trainer':
      return <TrainerCharts />;
    case 'member':
      return <MemberCharts />;
  }
};
```

## Data Structure

### Stats Configuration

```javascript
export const DASHBOARD_STATS = {
  admin: [
    {
      id: 'totalMembers',
      title: 'Total Members',
      value: 1247,
      change: '+12%',
      changeType: 'positive',
      icon: 'People',
      color: 'primary',
    },
    // ... more stats
  ],
  // ... other roles
};
```

### Chart Data

```javascript
export const CHART_DATA = {
  membershipGrowth: {
    data: [
      { month: 'Jan', members: 980, newMembers: 45 },
      // ... more data points
    ],
  },
  // ... other chart datasets
};
```

## Customization

### Adding New Stats

1. Update `DASHBOARD_STATS` in `constants.js`
2. Add corresponding icon to `StatCard.js` icon mapping
3. Implement any special formatting in `dashboard.utils.js`

### Adding New Charts

1. Create chart component in `components/` directory
2. Add chart data to `CHART_DATA` in `constants.js`
3. Import and use in `Dashboard.js`
4. Update exports in `index.js`

### Styling Customization

- All components use Material-UI theming
- Colors are derived from theme palette
- Spacing follows Material-UI spacing system
- Responsive breakpoints use MUI Grid system

## Dependencies

- `@mui/material ^7.3.2` - UI components
- `@mui/x-charts ^8.11.1` - Chart components
- `@mui/icons-material ^7.3.2` - Icons
- `react ^19.1.1` - React framework

## Usage

```javascript
import Dashboard from './features/Dashboard';

// In your app
<Dashboard />;
```

The dashboard will automatically adapt based on the current user's role from UserContext.

## Performance Considerations

- Charts are only rendered when needed
- Data is mocked but structured for easy API integration
- Components are optimized with proper React patterns
- Responsive images and efficient re-renders

## Future Enhancements

- Real-time data updates
- Customizable dashboard layouts
- Export functionality for charts
- Advanced filtering and date ranges
- Mobile-specific optimizations
- Progressive Web App features
