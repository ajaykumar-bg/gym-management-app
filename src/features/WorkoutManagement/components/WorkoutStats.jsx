/**
 * WorkoutStats Component
 * Displays statistical information about workouts
 */

import React, { memo } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  FitnessCenter as WorkoutIcon,
  CheckCircle as CompletedIcon,
  PlayArrow as InProgressIcon,
  Drafts as DraftIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';

const StatCard = memo(
  ({ title, value, icon, color, description, progress }) => (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
        {React.cloneElement(icon, { sx: { fontSize: 40, color } })}
      </Box>
      <Typography variant='h4' component='div' fontWeight='bold'>
        {value}
      </Typography>
      <Typography variant='h6' component='div' sx={{ mb: 0.5 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      )}
      {progress !== undefined && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant='determinate'
            value={progress}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}
    </Paper>
  )
);

StatCard.displayName = 'StatCard';

const WorkoutProgressIndicator = memo(({ currentWorkout, progress }) => {
  if (!currentWorkout || !progress) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress':
        return 'primary';
      case 'completed':
        return 'success';
      case 'paused':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Current Workout Progress
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant='body1' sx={{ mb: 1 }}>
          {currentWorkout.name}
        </Typography>
        <Chip
          label={currentWorkout.status.replace('_', ' ').toUpperCase()}
          color={getStatusColor(currentWorkout.status)}
          size='small'
          sx={{ mb: 1 }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant='body2' sx={{ mr: 2 }}>
          {progress.completedSets} / {progress.totalSets} sets completed
        </Typography>
        <Chip
          label={`${progress.percentage}%`}
          color={progress.percentage === 100 ? 'success' : 'primary'}
          size='small'
        />
      </Box>

      <LinearProgress
        variant='determinate'
        value={progress.percentage}
        color={progress.percentage === 100 ? 'success' : 'primary'}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Paper>
  );
});

WorkoutProgressIndicator.displayName = 'WorkoutProgressIndicator';

const WorkoutStats = memo(() => {
  const { workoutStats, currentWorkout, currentWorkoutProgress } = useWorkout();

  const completionRate =
    workoutStats.total > 0
      ? Math.round((workoutStats.completed / workoutStats.total) * 100)
      : 0;

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        Workout Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Workouts'
            value={workoutStats.total}
            icon={<WorkoutIcon />}
            color='primary.main'
            description='All created workouts'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Completed'
            value={workoutStats.completed}
            icon={<CompletedIcon />}
            color='success.main'
            description='Successfully finished'
            progress={completionRate}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='In Progress'
            value={workoutStats.inProgress}
            icon={<InProgressIcon />}
            color='warning.main'
            description='Currently active'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Draft'
            value={workoutStats.draft}
            icon={<DraftIcon />}
            color='info.main'
            description='Ready to start'
          />
        </Grid>
      </Grid>

      {currentWorkout && (
        <WorkoutProgressIndicator
          currentWorkout={currentWorkout}
          progress={currentWorkoutProgress}
        />
      )}
    </Box>
  );
});

WorkoutStats.displayName = 'WorkoutStats';

export default WorkoutStats;
