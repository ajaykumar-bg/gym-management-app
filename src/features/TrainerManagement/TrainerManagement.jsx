/**
 * TrainerManagement Component
 * Main component for trainer management feature with context-based architecture
 */

import React from 'react';
import { Box } from '@mui/material';
import { TrainerProvider } from './context';
import TrainerViewRouter from './components/TrainerViewRouter';
import PermissionGuard from './components/PermissionGuard';
import NotificationSnackbar from './components/NotificationSnackbar';
import TrainerForm from './components/TrainerForm';
import { useTrainer } from './context';

// Form component wrapper to access context
const TrainerFormWrapper = () => {
  const { showForm, closeForm, formTrainer, saveTrainer } = useTrainer();

  return (
    <TrainerForm
      open={showForm}
      onClose={closeForm}
      trainer={formTrainer}
      onSave={saveTrainer}
    />
  );
};

// Main content component
const TrainerManagementContent = () => {
  return (
    <Box sx={{ p: 3 }}>
      <PermissionGuard>
        <TrainerViewRouter />
        <TrainerFormWrapper />
        <NotificationSnackbar />
      </PermissionGuard>
    </Box>
  );
};

// Root component with provider
const TrainerManagement = () => {
  return (
    <TrainerProvider>
      <TrainerManagementContent />
    </TrainerProvider>
  );
};

export default TrainerManagement;
