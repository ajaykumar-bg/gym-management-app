/**
 * ExerciseInfo Component
 * Displays detailed information about an exercise in a list item format
 */

import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import ExerciseDetail from '../../Exercises/components/ExerciseDetail/ExerciseDetail';

const ExerciseInfo = memo(({ exercise, getDifficultyColor }) => {
  const [showExerciseDetail, setShowExerciseDetail] = useState(false);

  const handleInfoClick = () => {
    setShowExerciseDetail(true);
  };

  const handleCloseDetail = () => {
    setShowExerciseDetail(false);
  };

  const handleAddToWorkout = (exercise) => {
    // This could be passed as a prop if needed
    console.log('Add to workout:', exercise.name);
  };

  return (
    <>
      <ListItem sx={{ pl: 0 }}>
        <ListItemText
          primary={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant='body2' fontWeight='medium'>
                {exercise.name}
              </Typography>
              <Chip
                label={exercise.equipment || '----'}
                size='small'
                variant='outlined'
                sx={{ fontSize: '0.7rem' }}
              />
              <Chip
                label={exercise.level}
                size='small'
                color={getDifficultyColor(exercise.level)}
                sx={{ fontSize: '0.7rem' }}
              />
              <IconButton
                size='small'
                onClick={handleInfoClick}
                sx={{
                  ml: 'auto',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'primary.contrastText',
                  },
                }}
                aria-label={`View details for ${exercise.name}`}
              >
                <InfoIcon fontSize='small' />
              </IconButton>
            </Box>
          }
          secondary={
            <Box sx={{ mt: 0.5 }}>
              <Typography variant='caption' color='text.secondary'>
                Primary: {(exercise.primaryMuscles || []).join(', ')}
                {exercise.secondaryMuscles &&
                  exercise.secondaryMuscles.length > 0 &&
                  ` | Secondary: ${exercise.secondaryMuscles.join(', ')}`}
              </Typography>
            </Box>
          }
        />
      </ListItem>

      {/* Exercise Detail Drawer */}
      <ExerciseDetail
        selectedExercise={exercise}
        open={showExerciseDetail}
        onClose={handleCloseDetail}
        onAddToWorkout={handleAddToWorkout}
        onToggleFavorite={(exercise, newState) => {
          console.log('Toggle favorite:', exercise.name, newState);
        }}
        onShare={(exercise, shareType) => {
          console.log('Share exercise:', exercise.name, shareType);
        }}
        onSchedule={(exercise) => {
          console.log('Schedule exercise:', exercise.name);
        }}
        onBookmark={(exercise, newState) => {
          console.log('Bookmark exercise:', exercise.name, newState);
        }}
        onEdit={(exercise) => {
          console.log('Edit exercise:', exercise.name);
        }}
        onReport={(exercise) => {
          console.log('Report exercise:', exercise.name);
        }}
        isFavorite={false}
        isBookmarked={false}
        canEdit={false}
      />
    </>
  );
});

ExerciseInfo.displayName = 'ExerciseInfo';

export default ExerciseInfo;
