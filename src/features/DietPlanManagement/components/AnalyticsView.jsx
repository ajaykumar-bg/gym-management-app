/**
 * Analytics View Component
 * Displays comprehensive analytics and insights for diet plan management
 */

import React, { useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Group as GroupIcon,
  Restaurant as RestaurantIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDietPlan } from '../context';
import { formatPercentage, getAdherenceColor } from '../utils/dietPlanUtils';
import {
  DIET_PLAN_TYPE_LABELS,
  DIET_GOAL_LABELS,
  ASSIGNMENT_STATUS_LABELS,
} from '../constants';

const MetricCard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon,
  color = 'primary',
}) => (
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
        {trend && (
          <Box sx={{ textAlign: 'right' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {trend === 'up' ? (
                <TrendingUpIcon color='success' />
              ) : (
                <TrendingDownIcon color='error' />
              )}
              <Typography
                variant='caption'
                color={trend === 'up' ? 'success.main' : 'error.main'}
                fontWeight='medium'
                sx={{ ml: 0.5 }}
              >
                {trendValue}
              </Typography>
            </Box>
            <Typography variant='caption' color='text.secondary'>
              vs last month
            </Typography>
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

const TopPerformersTable = ({ assignments, dietPlans }) => {
  const topPerformers = useMemo(() => {
    return assignments
      .filter(
        (assignment) =>
          assignment.status === 'active' && assignment.progress?.adherence
      )
      .sort(
        (a, b) => (b.progress?.adherence || 0) - (a.progress?.adherence || 0)
      )
      .slice(0, 10)
      .map((assignment) => {
        const plan = dietPlans.find((p) => p.id === assignment.dietPlanId);
        return {
          ...assignment,
          planName: plan?.name || 'Unknown Plan',
          planType: plan?.type || 'unknown',
        };
      });
  }, [assignments, dietPlans]);

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Diet Plan</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align='center'>Adherence</TableCell>
            <TableCell align='center'>Weight Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topPerformers.map((assignment, index) => (
            <TableRow key={assignment.id}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ minWidth: 20 }}
                  >
                    #{index + 1}
                  </Typography>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {assignment.memberName.charAt(0)}
                  </Avatar>
                  <Typography variant='body2' fontWeight='medium'>
                    {assignment.memberName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{assignment.planName}</Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={
                    DIET_PLAN_TYPE_LABELS[assignment.planType] ||
                    assignment.planType
                  }
                  size='small'
                  variant='outlined'
                />
              </TableCell>
              <TableCell align='center'>
                <Typography
                  variant='body2'
                  fontWeight='bold'
                  color={
                    getAdherenceColor(assignment.progress?.adherence || 0) +
                    '.main'
                  }
                >
                  {formatPercentage(assignment.progress?.adherence || 0)}
                </Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography
                  variant='body2'
                  color={
                    assignment.progress?.weightChange >= 0
                      ? 'success.main'
                      : 'error.main'
                  }
                  fontWeight='medium'
                >
                  {assignment.progress?.weightChange > 0 ? '+' : ''}
                  {assignment.progress?.weightChange || 0} kg
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AnalyticsView = () => {
  const { dietPlans, assignments } = useDietPlan();

  // Calculate comprehensive metrics
  const analytics = useMemo(() => {
    const activeAssignments = assignments.filter((a) => a.status === 'active');
    const completedAssignments = assignments.filter(
      (a) => a.status === 'completed'
    );

    // Basic metrics
    const totalMembers = new Set(assignments.map((a) => a.memberId)).size;
    const avgAdherence =
      activeAssignments.length > 0
        ? activeAssignments.reduce(
            (sum, a) => sum + (a.progress?.adherence || 0),
            0
          ) / activeAssignments.length
        : 0;

    const completionRate =
      assignments.length > 0
        ? (completedAssignments.length / assignments.length) * 100
        : 0;

    // Plan type distribution
    const planTypeDistribution = assignments.reduce((acc, assignment) => {
      const plan = dietPlans.find((p) => p.id === assignment.dietPlanId);
      if (plan) {
        const label = DIET_PLAN_TYPE_LABELS[plan.type] || plan.type;
        acc[label] = (acc[label] || 0) + 1;
      }
      return acc;
    }, {});

    // Goal distribution
    const goalDistribution = assignments.reduce((acc, assignment) => {
      const plan = dietPlans.find((p) => p.id === assignment.dietPlanId);
      if (plan && plan.goals) {
        plan.goals.forEach((goal) => {
          const label = DIET_GOAL_LABELS[goal] || goal;
          acc[label] = (acc[label] || 0) + 1;
        });
      }
      return acc;
    }, {});

    // Status distribution
    const statusDistribution = assignments.reduce((acc, assignment) => {
      const label =
        ASSIGNMENT_STATUS_LABELS[assignment.status] || assignment.status;
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});

    // Adherence distribution
    const adherenceRanges = {
      'Excellent (90-100%)': 0,
      'Good (70-89%)': 0,
      'Fair (50-69%)': 0,
      'Poor (<50%)': 0,
    };

    activeAssignments.forEach((assignment) => {
      const adherence = assignment.progress?.adherence || 0;
      if (adherence >= 90) adherenceRanges['Excellent (90-100%)']++;
      else if (adherence >= 70) adherenceRanges['Good (70-89%)']++;
      else if (adherence >= 50) adherenceRanges['Fair (50-69%)']++;
      else adherenceRanges['Poor (<50%)']++;
    });

    // Monthly trends (mock data for demo)
    const monthlyTrends = [
      { month: 'Jan', assignments: 12, completions: 8, avgAdherence: 78 },
      { month: 'Feb', assignments: 15, completions: 10, avgAdherence: 82 },
      { month: 'Mar', assignments: 18, completions: 12, avgAdherence: 85 },
      { month: 'Apr', assignments: 22, completions: 16, avgAdherence: 88 },
      { month: 'May', assignments: 25, completions: 18, avgAdherence: 86 },
      { month: 'Jun', assignments: 20, completions: 14, avgAdherence: 84 },
    ];

    return {
      totalMembers,
      totalAssignments: assignments.length,
      activeAssignments: activeAssignments.length,
      completedAssignments: completedAssignments.length,
      avgAdherence: Math.round(avgAdherence),
      completionRate: Math.round(completionRate),
      planTypeDistribution,
      goalDistribution,
      statusDistribution,
      adherenceRanges,
      monthlyTrends,
    };
  }, [dietPlans, assignments]);

  // Prepare chart data
  const planTypeChartData = Object.entries(analytics.planTypeDistribution).map(
    ([type, count]) => ({
      id: type,
      label: type,
      value: count,
    })
  );

  const adherenceChartData = Object.entries(analytics.adherenceRanges).map(
    ([range, count]) => ({
      id: range,
      label: range,
      value: count,
    })
  );

  return (
    <Box>
      <Typography variant='h5' component='h1' gutterBottom>
        Diet Plan Analytics
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 4 }}>
        Comprehensive insights and performance metrics for your diet plan
        management
      </Typography>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Total Members'
            value={analytics.totalMembers}
            icon={<GroupIcon />}
            color='primary'
            trend='up'
            trendValue='+12%'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Active Assignments'
            value={analytics.activeAssignments}
            subtitle={`${analytics.totalAssignments} total`}
            icon={<RestaurantIcon />}
            color='secondary'
            trend='up'
            trendValue='+8%'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Completion Rate'
            value={`${analytics.completionRate}%`}
            icon={<CheckCircleIcon />}
            color='success'
            trend='up'
            trendValue='+15%'
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            title='Avg Adherence'
            value={`${analytics.avgAdherence}%`}
            icon={<TrendingUpIcon />}
            color={getAdherenceColor(analytics.avgAdherence)}
            trend='up'
            trendValue='+5%'
          />
        </Grid>
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Plan Type Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Plan Type Distribution
              </Typography>
              {planTypeChartData.length > 0 ? (
                <Box sx={{ height: 300 }}>
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
                    No data available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Adherence Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Adherence Distribution
              </Typography>
              {adherenceChartData.some((item) => item.value > 0) ? (
                <Box sx={{ height: 300 }}>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: adherenceChartData.map((item) => item.label),
                      },
                    ]}
                    series={[
                      {
                        data: adherenceChartData.map((item) => item.value),
                        color: '#1976d2',
                      },
                    ]}
                    height={280}
                    margin={{ top: 20, bottom: 60, left: 40, right: 20 }}
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
                    No active assignments
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Trends */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Monthly Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <LineChart
                  xAxis={[
                    {
                      data: analytics.monthlyTrends.map((item) => item.month),
                      scaleType: 'point',
                    },
                  ]}
                  series={[
                    {
                      data: analytics.monthlyTrends.map(
                        (item) => item.assignments
                      ),
                      label: 'New Assignments',
                      color: '#1976d2',
                    },
                    {
                      data: analytics.monthlyTrends.map(
                        (item) => item.completions
                      ),
                      label: 'Completions',
                      color: '#2e7d32',
                    },
                    {
                      data: analytics.monthlyTrends.map(
                        (item) => item.avgAdherence
                      ),
                      label: 'Avg Adherence %',
                      color: '#ed6c02',
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

      {/* Top Performers */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Top Performers
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Members with highest adherence rates in active assignments
              </Typography>
              <TopPerformersTable
                assignments={assignments}
                dietPlans={dietPlans}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsView;
