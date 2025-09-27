import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { useUser } from '../../context/UserContext';
import TrainerList from './components/TrainerList';
import TrainerProfile from './components/TrainerProfile';
import TrainerForm from './components/TrainerForm';
import { MOCK_TRAINERS } from './trainer.constants';

const TrainerManagement = () => {
  const { user, permissions } = useUser();
  const [trainers, setTrainers] = useState(MOCK_TRAINERS);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'profile'
  const [showForm, setShowForm] = useState(false);
  const [formTrainer, setFormTrainer] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleViewTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setView('profile');
  };

  const handleBackToList = () => {
    setSelectedTrainer(null);
    setView('list');
  };

  const handleAddTrainer = () => {
    setFormTrainer(null);
    setShowForm(true);
  };

  const handleEditTrainer = (trainer) => {
    setFormTrainer(trainer);
    setShowForm(true);
  };

  const handleSaveTrainer = (trainerData) => {
    if (formTrainer) {
      // Edit existing trainer
      setTrainers((prev) =>
        prev.map((trainer) =>
          trainer.id === trainerData.id ? trainerData : trainer
        )
      );
      setSnackbar({
        open: true,
        message: 'Trainer updated successfully',
        severity: 'success',
      });
    } else {
      // Add new trainer
      setTrainers((prev) => [...prev, trainerData]);
      setSnackbar({
        open: true,
        message: 'Trainer added successfully',
        severity: 'success',
      });
    }
  };

  const handleDeleteTrainer = (trainerId) => {
    setTrainers((prev) => prev.filter((trainer) => trainer.id !== trainerId));
    setSnackbar({
      open: true,
      message: 'Trainer deleted successfully',
      severity: 'success',
    });
    if (selectedTrainer?.id === trainerId) {
      handleBackToList();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter trainers based on role
  const getFilteredTrainers = () => {
    if (user.role === 'admin') {
      return trainers; // Admin can see all trainers
    } else if (user.role === 'trainer') {
      // Trainers can see all trainers for collaboration
      return trainers;
    } else {
      // Members can see all trainers for selection
      return trainers.filter((trainer) => trainer.status === 'active');
    }
  };

  const filteredTrainers = getFilteredTrainers();

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
      {view === 'list' ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant='h4' component='h1'>
              Trainer Management
            </Typography>
          </Box>
          <TrainerList
            trainers={filteredTrainers}
            onViewTrainer={handleViewTrainer}
            onEditTrainer={
              permissions.canManageTrainers ? handleEditTrainer : null
            }
            onDeleteTrainer={
              permissions.canManageTrainers ? handleDeleteTrainer : null
            }
            onAddTrainer={
              permissions.canManageTrainers ? handleAddTrainer : null
            }
          />
        </>
      ) : (
        <TrainerProfile
          trainer={selectedTrainer}
          onEdit={
            permissions.canManageTrainers
              ? () => handleEditTrainer(selectedTrainer)
              : null
          }
          onClose={handleBackToList}
        />
      )}

      <TrainerForm
        open={showForm}
        onClose={() => setShowForm(false)}
        trainer={formTrainer}
        onSave={handleSaveTrainer}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainerManagement;
