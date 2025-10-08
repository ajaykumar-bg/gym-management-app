/**
 * WorkoutManagement Component
 * Main component for workout management feature with context-based architecture
 */

import React from 'react';
import { Box } from '@mui/material';
import { WorkoutProvider } from './context';
import WorkoutViewRouter from './components/WorkoutViewRouter';
import PermissionGuard from './components/PermissionGuard';
import NotificationSnackbar from './components/NotificationSnackbar';

// Main content component
const WorkoutManagementContent = () => {
  return (
    <Box sx={{ p: 3 }}>
      <PermissionGuard>
        <WorkoutViewRouter />
        <NotificationSnackbar />
      </PermissionGuard>
    </Box>
  );
};

// Root component with provider
const WorkoutManagement = () => {
  return (
    <WorkoutProvider>
      <WorkoutManagementContent />
    </WorkoutProvider>
  );
};

export default WorkoutManagement;
