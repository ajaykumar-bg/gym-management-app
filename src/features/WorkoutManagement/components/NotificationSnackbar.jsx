/**
 * NotificationSnackbar Component
 * Centralized notification system for Workout Management
 */

import React, { memo } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useWorkout } from '../context';

const NotificationSnackbar = memo(() => {
  const { snackbar, hideSnackbar } = useWorkout();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
        elevation={6}
        variant='filled'
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
});

NotificationSnackbar.displayName = 'NotificationSnackbar';

export default NotificationSnackbar;
