import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useUser } from '../../context/UserContext';
import {
  DASHBOARD_STATS,
  CHART_DATA,
  RECENT_ACTIVITIES,
  QUICK_ACTIONS,
} from './constants';
import { getDashboardTitle } from './dashboard.utils';

// Import components
import StatCard from './components/StatCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import MembershipGrowthChart from './components/MembershipGrowthChart';
import RevenueChart from './components/RevenueChart';
import ClassAttendanceChart from './components/ClassAttendanceChart';
import WorkoutChart from './components/WorkoutChart';
import TrainerScheduleChart from './components/TrainerScheduleChart';

const Dashboard = () => {
  const { user } = useUser();
  const userStats = DASHBOARD_STATS[user.role] || [];
  const userActivities = RECENT_ACTIVITIES[user.role] || [];
  const userQuickActions = QUICK_ACTIONS[user.role] || [];

  const renderRoleSpecificCharts = () => {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <Grid size={{ xs: 12, lg: 8 }}>
              <MembershipGrowthChart data={CHART_DATA.membershipGrowth.data} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ClassAttendanceChart data={CHART_DATA.classAttendance.data} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <RevenueChart data={CHART_DATA.revenueByMonth} />
            </Grid>
          </>
        );

      case 'trainer':
        return (
          <>
            <Grid size={{ xs: 12, lg: 8 }}>
              <TrainerScheduleChart data={CHART_DATA.trainerSchedule.data} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ClassAttendanceChart
                data={CHART_DATA.classAttendance.data}
                title='My Class Attendance'
              />
            </Grid>
          </>
        );

      case 'member':
        return (
          <>
            <Grid size={{ xs: 12, lg: 8 }}>
              <WorkoutChart data={CHART_DATA.memberWorkouts.data} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ClassAttendanceChart
                data={CHART_DATA.classAttendance.data}
                title='Available Classes'
              />
            </Grid>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant='h4' gutterBottom>
        {getDashboardTitle(user.role, user.name)}
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
        Welcome to your {user.role} dashboard. Here's your overview.
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {userStats.map((stat) => (
          <Grid key={stat.id} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard stat={stat} />
          </Grid>
        ))}

        {/* Charts Section */}
        {renderRoleSpecificCharts()}

        {/* Recent Activities */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <RecentActivity activities={userActivities} />
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <QuickActions actions={userQuickActions} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
