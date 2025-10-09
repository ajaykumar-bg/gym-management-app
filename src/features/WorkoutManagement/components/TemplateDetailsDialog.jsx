/**
 * TemplateDetailsDialog Component
 * Dialog for viewing detailed information about a workout template
 */

import React, { memo, useMemo } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Schedule as DurationIcon,
  FitnessCenter as ExerciseIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { getAllExercises } from '../workout.utils';
import ExerciseInfo from './ExerciseInfo';

const TemplateDetailsDialog = memo(({ open, template, onClose }) => {
  const exerciseDatabase = useMemo(() => getAllExercises(), []);

  if (!template) return null;
  const getTotalExercises = (exercises) => {
    return (exercises || []).reduce(
      (total, req) => total + (req.count || 0),
      0
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'expert':
        return 'error';
      default:
        return 'default';
    }
  };

  // Function to find exercises matching the template requirements
  const findMatchingExercises = (exerciseReq) => {
    if (!exerciseDatabase || !Array.isArray(exerciseDatabase)) {
      return [];
    }

    const isCompound = exerciseReq.category === 'compound';
    const targetMuscles = exerciseReq.muscleGroups || [];

    return exerciseDatabase
      .filter((exercise) => {
        // Check if exercise matches the compound/isolation requirement
        const exerciseIsCompound = exercise.mechanic === 'compound';
        if (isCompound !== exerciseIsCompound) return false;

        // Check if exercise targets the required muscle groups
        const exerciseMuscles = [
          ...(exercise.primaryMuscles || []),
          ...(exercise.secondaryMuscles || []),
        ].map((muscle) => muscle.toLowerCase());

        return targetMuscles.some((targetMuscle) =>
          exerciseMuscles.includes(targetMuscle.toLowerCase())
        );
      })
      .slice(0, exerciseReq.count + 2); // Get a few extra options
  };

  const getExerciseTypeLabel = (exerciseReq) => {
    const category =
      exerciseReq.category === 'compound' ? 'Compound' : 'Isolation';
    const muscles = (exerciseReq.muscleGroups || [])
      .map((muscle) => muscle.charAt(0).toUpperCase() + muscle.slice(1))
      .join(', ');
    return `${category} - ${muscles}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='h2'>
            {template.name}
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant='body1' color='text.secondary' paragraph>
            {template.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label={template.category} size='small' variant='outlined' />
            <Chip
              label={template.difficulty}
              size='small'
              color={getDifficultyColor(template.difficulty)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DurationIcon fontSize='small' color='action' />
              <Typography variant='body2'>
                Duration: {template.estimatedDuration} minutes
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ExerciseIcon fontSize='small' color='action' />
              <Typography variant='body2'>
                Total Exercises: ~{getTotalExercises(template.exercises)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
              Target Muscles:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(template.targetMuscles || []).map((muscle, index) => (
                <Chip
                  key={index}
                  label={muscle}
                  size='small'
                  variant='outlined'
                  color='primary'
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 2 }}>
          Exercise Breakdown:
        </Typography>

        <Box sx={{ mb: 3 }}>
          {(template.exercises || []).map((exerciseReq, index) => {
            const matchingExercises = findMatchingExercises(exerciseReq);
            const typeLabel = getExerciseTypeLabel(exerciseReq);
            const priorityColor =
              exerciseReq.priority === 'high'
                ? 'error'
                : exerciseReq.priority === 'medium'
                ? 'warning'
                : 'success';

            return (
              <Accordion key={index} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant='body1'
                      fontWeight='medium'
                      sx={{ flex: 1 }}
                    >
                      {typeLabel}
                    </Typography>
                    <Chip
                      label={`${exerciseReq.count} exercises`}
                      size='small'
                      color='primary'
                      variant='outlined'
                    />
                    <Chip
                      label={exerciseReq.priority || 'medium'}
                      size='small'
                      color={priorityColor}
                      variant='outlined'
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 2 }}
                    >
                      Recommended exercises for this category:
                    </Typography>

                    {matchingExercises.length > 0 ? (
                      <List dense>
                        {matchingExercises
                          .slice(0, exerciseReq.count + 2)
                          .map((exercise, exerciseIndex) => (
                            <ExerciseInfo
                              key={exerciseIndex}
                              exercise={exercise}
                              getDifficultyColor={getDifficultyColor}
                            />
                          ))}
                      </List>
                    ) : (
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ fontStyle: 'italic' }}
                      >
                        No matching exercises found in database
                      </Typography>
                    )}

                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        // bgcolor: 'grey.50',
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant='caption' color='text.secondary'>
                        <strong>Training Tip:</strong> Choose{' '}
                        {exerciseReq.count} exercise
                        {exerciseReq.count > 1 ? 's' : ''} from the list above.
                        {exerciseReq.priority === 'high' &&
                          ' These are foundational exercises - focus on proper form and progressive overload.'}
                        {exerciseReq.priority === 'medium' &&
                          ' These exercises complement your main lifts - maintain good form and mind-muscle connection.'}
                        {exerciseReq.priority === 'low' &&
                          ' These are finishing exercises - focus on higher reps and muscle fatigue.'}
                      </Typography>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        {template.notes && (
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
              Additional Notes:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {template.notes}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

TemplateDetailsDialog.displayName = 'TemplateDetailsDialog';

export default TemplateDetailsDialog;
