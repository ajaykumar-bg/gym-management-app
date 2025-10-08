/**
 * WorkoutViewRouter Component
 * Handles routing between different workout views
 */

import React, { memo } from 'react';
import { Box, Typography, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import WorkoutList from './WorkoutList';
import WorkoutBuilder from './WorkoutBuilder';
import WorkoutTemplates from './WorkoutTemplates';
import WorkoutSession from './WorkoutSession';
import WorkoutStats from './WorkoutStats';
import { useWorkout } from '../context';
import { useUser } from '../../../context/UserContext';

const ListView = memo(() => {
  const { navigateToCreate, navigateToTemplates } = useWorkout();
  const { permissions } = useUser();

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
          Workout Management
        </Typography>
      </Box>

      <WorkoutStats />
      <WorkoutList />

      {permissions.canManageWorkouts && (
        <>
          <Fab
            color='primary'
            aria-label='create workout'
            sx={{ position: 'fixed', bottom: 80, right: 16 }}
            onClick={navigateToCreate}
          >
            <AddIcon />
          </Fab>

          <Fab
            color='secondary'
            aria-label='templates'
            sx={{ position: 'fixed', bottom: 150, right: 16 }}
            onClick={navigateToTemplates}
            size='small'
          >
            <Typography variant='caption' sx={{ fontSize: '0.7rem' }}>
              T
            </Typography>
          </Fab>
        </>
      )}
    </>
  );
});

ListView.displayName = 'ListView';

const CreateView = memo(() => {
  return <WorkoutBuilder />;
});

CreateView.displayName = 'CreateView';

const TemplatesView = memo(() => {
  return <WorkoutTemplates />;
});

TemplatesView.displayName = 'TemplatesView';

const WorkoutView = memo(() => {
  return <WorkoutSession />;
});

WorkoutView.displayName = 'WorkoutView';

const WorkoutViewRouter = memo(() => {
  const { view } = useWorkout();

  switch (view) {
    case 'create':
      return <CreateView />;
    case 'templates':
      return <TemplatesView />;
    case 'workout':
      return <WorkoutView />;
    case 'list':
    default:
      return <ListView />;
  }
});

WorkoutViewRouter.displayName = 'WorkoutViewRouter';

export default WorkoutViewRouter;
