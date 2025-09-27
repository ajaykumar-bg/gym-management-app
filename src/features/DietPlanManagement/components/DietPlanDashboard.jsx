/**
 * Diet Plan Dashboard
 * Overview dashboard showing key metrics and statistics
 */

import React, { useMemo } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Restaurant as RestaurantIcon,
  Assignment as AssignmentIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDietPlan } from '../context';
import {
  formatPercentage,
  getAdherenceColor,
  calculateProgress,
  getDaysRemaining,
} from '../utils/dietPlanUtils';
import {
  ASSIGNMENT_STATUS_LABELS,
  STATUS_COLORS,
  DIET_PLAN_TYPE_LABELS,
} from '../constants';

const MetricCard = ({ title, value, icon, color = 'primary', subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.main`, mr: 2 }}>{icon}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='h4' component='div' fontWeight='bold'>
            {value}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant='caption' color='text.secondary'>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DietPlanDashboard = () => {
  const {
    dietPlans,
    assignments,
    activeAssignments,
    completedAssignments,
    openProgressModal,
  } = useDietPlan();

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalPlans = dietPlans.filter((plan) => plan.isActive).length;
    const totalAssignments = assignments.length;
    const totalActiveAssignments = activeAssignments.length;
    const totalCompletedAssignments = completedAssignments.length;

    // Calculate average adherence for active assignments
    const avgAdherence =
      activeAssignments.length > 0
        ? activeAssignments.reduce(
            (sum, assignment) => sum + (assignment.progress?.adherence || 0),
            0
          ) / activeAssignments.length
        : 0;

    // Assignment status distribution
    const statusDistribution = assignments.reduce((acc, assignment) => {
      acc[assignment.status] = (acc[assignment.status] || 0) + 1;
      return acc;
    }, {});

    // Plan type distribution
    const planTypeDistribution = assignments.reduce((acc, assignment) => {
      const plan = dietPlans.find((p) => p.id === assignment.dietPlanId);
      if (plan) {
        acc[plan.type] = (acc[plan.type] || 0) + 1;
      }
      return acc;
    }, {});

    return {
      totalPlans,
      totalAssignments,
      totalActiveAssignments,
      totalCompletedAssignments,
      avgAdherence: Math.round(avgAdherence),
      statusDistribution,
      planTypeDistribution,
    };
  }, [dietPlans, assignments, activeAssignments, completedAssignments]);

  // Prepare chart data
  const statusChartData = useMemo(() => {
    return Object.entries(metrics.statusDistribution).map(
      ([status, count]) => ({
        id: status,
        label: ASSIGNMENT_STATUS_LABELS[status] || status,
        value: count,
      })
    );
  }, [metrics.statusDistribution]);

  const planTypeChartData = useMemo(() => {
    return Object.entries(metrics.planTypeDistribution).map(
      ([type, count]) => ({
        id: type,
        label: DIET_PLAN_TYPE_LABELS[type] || type,
        value: count,
      })
    );
  }, [metrics.planTypeDistribution]);

  // Recent assignments for quick overview
  const recentAssignments = useMemo(() => {
    return [...assignments]
      .sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate))
      .slice(0, 5);
  }, [assignments]);

  // Progress tracking data (mock data for demo)
  const progressData = useMemo(() => {
    // Generate weekly progress data for the last 8 weeks
    const weeks = [];
    for (let i = 7; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      weeks.push({
        week: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        adherence: Math.round(75 + Math.random() * 20), // Random adherence between 75-95%
        completedPlans: Math.round(5 + Math.random() * 10), // Random completed plans
      });
    }
    return weeks;
  }, []);

  return (
    <Box>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Active Plans'
            value={metrics.totalPlans}
            icon={<RestaurantIcon />}
            color='primary'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Total Assignments'
            value={metrics.totalAssignments}
            icon={<AssignmentIcon />}
            color='secondary'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Active Members'
            value={metrics.totalActiveAssignments}
            icon={<GroupIcon />}
            color='success'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Average Adherence'
            value={`${metrics.avgAdherence}%`}
            icon={<TrendingUpIcon />}
            color={getAdherenceColor(metrics.avgAdherence)}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Assignment Status Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Assignment Status Distribution
              </Typography>
              {statusChartData.length > 0 ? (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: statusChartData,
                        highlightScope: {
                          faded: 'global',
                          highlighted: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'gray',
                        },
                      },
                    ]}
                    height={280}
                    margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color='text.secondary'>
                    No assignment data available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Plan Type Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Plan Type Distribution
              </Typography>
              {planTypeChartData.length > 0 ? (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <PieChart
                    series={[
                      {
                        data: planTypeChartData,
                        highlightScope: {
                          faded: 'global',
                          highlighted: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'gray',
                        },
                      },
                    ]}
                    height={280}
                    margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color='text.secondary'>
                    No plan data available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Trends */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Weekly Progress Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <LineChart
                  xAxis={[
                    {
                      data: progressData.map((item) => item.week),
                      scaleType: 'point',
                    },
                  ]}
                  series={[
                    {
                      data: progressData.map((item) => item.adherence),
                      label: 'Average Adherence (%)',
                      color: '#1976d2',
                    },
                    {
                      data: progressData.map((item) => item.completedPlans),
                      label: 'Completed Plans',
                      color: '#2e7d32',
                    },
                  ]}
                  height={280}
                  margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Assignments */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant='h6'>Recent Assignments</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Last 5 assignments
                </Typography>
              </Box>

              {recentAssignments.length === 0 ? (
                <Typography color='text.secondary'>
                  No assignments found
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recentAssignments.map((assignment) => {
                    const plan = dietPlans.find(
                      (p) => p.id === assignment.dietPlanId
                    );
                    const progress = calculateProgress(
                      assignment.startDate,
                      assignment.endDate
                    );
                    const daysRemaining = getDaysRemaining(assignment.endDate);

                    return (
                      <Box
                        key={assignment.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {assignment.memberName.charAt(0)}
                        </Avatar>

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant='subtitle1' fontWeight='medium'>
                            {assignment.memberName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {plan?.name || 'Unknown Plan'}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mt: 1,
                            }}
                          >
                            <Chip
                              label={
                                ASSIGNMENT_STATUS_LABELS[assignment.status]
                              }
                              color={STATUS_COLORS[assignment.status]}
                              size='small'
                            />
                            {assignment.status === 'active' && (
                              <>
                                <Chip
                                  label={`${formatPercentage(
                                    assignment.progress?.adherence || 0
                                  )} adherence`}
                                  color={getAdherenceColor(
                                    assignment.progress?.adherence || 0
                                  )}
                                  size='small'
                                  variant='outlined'
                                />
                                <Chip
                                  label={`${daysRemaining} days left`}
                                  size='small'
                                  variant='outlined'
                                />
                              </>
                            )}
                          </Box>

                          {assignment.status === 'active' && (
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                Progress: {formatPercentage(progress)}
                              </Typography>
                              <LinearProgress
                                variant='determinate'
                                value={progress}
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          )}
                        </Box>

                        <Tooltip title='View Progress'>
                          <IconButton
                            onClick={() => openProgressModal(assignment)}
                            size='small'
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DietPlanDashboard;
