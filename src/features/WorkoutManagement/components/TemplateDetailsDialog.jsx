/**
 * TemplateDetailsDialog Component
 * Dialog for viewing detailed information about a workout template
 */

import React, { memo } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import {
  Schedule as DurationIcon,
  FitnessCenter as ExerciseIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const TemplateDetailsDialog = memo(({ open, template, onClose }) => {
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

        <TableContainer component={Paper} variant='outlined'>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Exercise Type</TableCell>
                <TableCell align='center'>Count</TableCell>
                <TableCell>Target Muscles</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(template.exercises || []).map((exercise, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {exercise.type || 'Unknown'}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={exercise.count || 0}
                      size='small'
                      color='primary'
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(exercise.muscles || []).map((muscle, muscleIndex) => (
                        <Chip
                          key={muscleIndex}
                          label={muscle}
                          size='small'
                          variant='outlined'
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {exercise.notes || 'Standard execution'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
