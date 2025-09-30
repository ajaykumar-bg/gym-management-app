/**
 * TrainerViewRouter Component
 * Handles routing between different views (list, profile)
 */

import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import TrainerList from './TrainerList';
import TrainerProfile from './TrainerProfile';
import TrainerStats from './TrainerStats';
import { useTrainer } from '../context';
import { useUser } from '../../../context/UserContext';

const ListView = memo(() => {
  const {
    getFilteredTrainers,
    viewTrainer,
    openEditForm,
    deleteTrainer,
    openAddForm,
  } = useTrainer();
  const { user, permissions } = useUser();

  const filteredTrainers = getFilteredTrainers(user);

  return (
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

      <TrainerStats />

      <TrainerList
        trainers={filteredTrainers}
        onViewTrainer={viewTrainer}
        onEditTrainer={permissions.canManageTrainers ? openEditForm : null}
        onDeleteTrainer={permissions.canManageTrainers ? deleteTrainer : null}
        onAddTrainer={permissions.canManageTrainers ? openAddForm : null}
      />
    </>
  );
});

ListView.displayName = 'ListView';

const ProfileView = memo(() => {
  const { selectedTrainer, openEditForm, backToList } = useTrainer();
  const { permissions } = useUser();

  return (
    <TrainerProfile
      trainer={selectedTrainer}
      onEdit={
        permissions.canManageTrainers
          ? () => openEditForm(selectedTrainer)
          : null
      }
      onClose={backToList}
    />
  );
});

ProfileView.displayName = 'ProfileView';

const TrainerViewRouter = memo(() => {
  const { view } = useTrainer();

  switch (view) {
    case 'profile':
      return <ProfileView />;
    case 'list':
    default:
      return <ListView />;
  }
});

TrainerViewRouter.displayName = 'TrainerViewRouter';

export default TrainerViewRouter;
