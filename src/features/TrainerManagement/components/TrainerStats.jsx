/**
 * TrainerStats Component
 * Displays statistical information about trainers
 */

import React, { memo } from 'react';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  EventBusy as LeaveIcon,
} from '@mui/icons-material';
import { useTrainer } from '../context';

const StatCard = memo(({ title, value, icon, color, description }) => (
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
  </Paper>
));

StatCard.displayName = 'StatCard';

const CapacityIndicator = memo(({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const isNearCapacity = percentage > 80;
  const isMediumLoad = percentage > 60;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Training Capacity
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography variant='body1' sx={{ mr: 2 }}>
          {current} / {total} clients
        </Typography>
        <Chip
          label={`${percentage.toFixed(1)}%`}
          color={
            isNearCapacity ? 'error' : isMediumLoad ? 'warning' : 'success'
          }
          size='small'
        />
      </Box>
      <LinearProgress
        variant='determinate'
        value={percentage}
        color={isNearCapacity ? 'error' : isMediumLoad ? 'warning' : 'success'}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Paper>
  );
});

CapacityIndicator.displayName = 'CapacityIndicator';

const TrainerStats = memo(() => {
  const { trainerStats } = useTrainer();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        Trainer Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Trainers'
            value={trainerStats.total}
            icon={<PeopleIcon />}
            color='primary.main'
            description='All registered trainers'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Active'
            value={trainerStats.active}
            icon={<ActiveIcon />}
            color='success.main'
            description='Currently working'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Inactive'
            value={trainerStats.inactive}
            icon={<InactiveIcon />}
            color='error.main'
            description='Not currently working'
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='On Leave'
            value={trainerStats.onLeave}
            icon={<LeaveIcon />}
            color='warning.main'
            description='Temporarily unavailable'
          />
        </Grid>
      </Grid>

      <CapacityIndicator
        current={trainerStats.currentLoad}
        total={trainerStats.totalCapacity}
      />
    </Box>
  );
});

TrainerStats.displayName = 'TrainerStats';

export default TrainerStats;
