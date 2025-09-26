import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useUser } from '../../context/UserContext';

const TrainerManagement = () => {
  const { permissions } = useUser();

  // Check permissions
  if (!permissions.canViewTrainers) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h5' color='error'>
          Access Denied
        </Typography>
        <Typography variant='body1' sx={{ mt: 1 }}>
          You don't have permission to view trainer information.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Trainer Management
      </Typography>

      <Alert severity='info' sx={{ mt: 2 }}>
        Trainer Management module is under development. This feature will
        include:
        <ul>
          <li>Trainer profiles and schedules</li>
          <li>Certification tracking</li>
          <li>Performance metrics</li>
          <li>Client assignment management</li>
        </ul>
      </Alert>
    </Box>
  );
};

export default TrainerManagement;
