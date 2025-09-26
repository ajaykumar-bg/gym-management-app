import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import {
  FitnessCenter,
  Assignment,
  TrendingUp,
  LocalFireDepartment,
} from '@mui/icons-material';
import { getWorkoutPlanStats } from '../utils';

const WorkoutPlanStats = ({ plans }) => {
  const stats = getWorkoutPlanStats(plans);

  const statCards = [
    {
      title: 'Total Plans',
      value: stats.total,
      icon: <Assignment color='primary' />,
      color: 'primary.main',
    },
    {
      title: 'Active Plans',
      value: stats.active,
      icon: <TrendingUp color='success' />,
      color: 'success.main',
    },
    {
      title: 'Avg Duration',
      value: `${stats.averageDuration}min`,
      icon: <FitnessCenter color='info' />,
      color: 'info.main',
    },
    {
      title: 'Total Calories',
      value: stats.totalCalories.toLocaleString(),
      icon: <LocalFireDepartment color='warning' />,
      color: 'warning.main',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statCards.map((stat, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Box sx={{ mb: 1 }}>{stat.icon}</Box>
              <Typography
                variant='h4'
                component='div'
                color={stat.color}
                sx={{ fontWeight: 'bold', mb: 0.5 }}
              >
                {stat.value}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {stat.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WorkoutPlanStats;
