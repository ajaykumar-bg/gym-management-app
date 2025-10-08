/**
 * WorkoutSession Component
 * Interface for tracking and completing workout sessions
 */

import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  PlayArrow as StartIcon,
  Pause as PauseIcon,
  CheckCircle as CompleteIcon,
  Cancel as FailIcon,
  ExpandMore as ExpandIcon,
  Timer as TimerIcon,
  FitnessCenter as WeightIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';
import { WORKOUT_STATUS, SET_STATUS } from '../workout.constants';

const SetCompletionDialog = memo(
  ({ open, set, exercise, onClose, onComplete }) => {
    const [setData, setSetData] = useState({
      reps: set?.targetReps || 0,
      weight: set?.weight || 0,
      notes: '',
    });

    const handleChange = (field, value) => {
      setSetData((prev) => ({ ...prev, [field]: value }));
    };

    const handleComplete = () => {
      onComplete(setData);
      onClose();
    };

    if (!set || !exercise) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Complete Set</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant='body1' gutterBottom>
              <strong>{exercise.exercise.name}</strong> - Set {set.setNumber}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label='Reps Completed'
                  type='number'
                  value={setData.reps}
                  onChange={(e) =>
                    handleChange('reps', parseInt(e.target.value) || 0)
                  }
                  inputProps={{ min: 0, max: 100 }}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label='Weight (lbs)'
                  type='number'
                  value={setData.weight}
                  onChange={(e) =>
                    handleChange('weight', parseInt(e.target.value) || 0)
                  }
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Notes (optional)'
                  value={setData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleComplete} variant='contained'>
            Complete Set
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

SetCompletionDialog.displayName = 'SetCompletionDialog';

const SetRow = memo(({ set, exercise, onCompleteSet, onFailSet }) => {
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case SET_STATUS.COMPLETED:
        return 'success';
      case SET_STATUS.FAILED:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case SET_STATUS.COMPLETED:
        return <CompleteIcon />;
      case SET_STATUS.FAILED:
        return <FailIcon />;
      default:
        return null;
    }
  };

  const handleCompleteSet = (setData) => {
    onCompleteSet(exercise.id, set.id, setData);
  };

  const handleFailSet = () => {
    onFailSet(exercise.id, set.id, 'Unable to complete set');
  };

  const isPending = set.status === SET_STATUS.PENDING;

  return (
    <>
      <TableRow>
        <TableCell>{set.setNumber}</TableCell>
        <TableCell>
          {isPending
            ? set.targetReps
            : `${set.actualReps || 0} / ${set.targetReps}`}
        </TableCell>
        <TableCell>{isPending ? set.weight || 0 : set.weight || 0}</TableCell>
        <TableCell>
          <Chip
            label={set.status}
            color={getStatusColor(set.status)}
            size='small'
            icon={getStatusIcon(set.status)}
          />
        </TableCell>
        <TableCell>
          {isPending ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size='small'
                variant='contained'
                color='success'
                onClick={() => setShowCompletionDialog(true)}
              >
                Complete
              </Button>
              <Button
                size='small'
                variant='outlined'
                color='error'
                onClick={handleFailSet}
              >
                Skip
              </Button>
            </Box>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {set.completedAt &&
                new Date(set.completedAt).toLocaleTimeString()}
            </Typography>
          )}
        </TableCell>
      </TableRow>

      <SetCompletionDialog
        open={showCompletionDialog}
        set={set}
        exercise={exercise}
        onClose={() => setShowCompletionDialog(false)}
        onComplete={handleCompleteSet}
      />
    </>
  );
});

SetRow.displayName = 'SetRow';

const ExerciseAccordion = memo(
  ({ exercise, onCompleteSet, onFailSet, expanded, onToggle }) => {
    const completedSets = exercise.sets.filter(
      (set) => set.status === SET_STATUS.COMPLETED
    ).length;
    const totalSets = exercise.sets.length;
    const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    return (
      <Accordion expanded={expanded} onChange={onToggle}>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 1 }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant='h6'>{exercise.exercise.name}</Typography>
              <Typography variant='body2' color='text.secondary'>
                {exercise.exercise.primaryMuscles.join(', ')} • {completedSets}/
                {totalSets} sets
              </Typography>
            </Box>
            <Box sx={{ minWidth: 100 }}>
              <LinearProgress
                variant='determinate'
                value={progress}
                color={progress === 100 ? 'success' : 'primary'}
                sx={{ height: 6, borderRadius: 3 }}
              />
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Set</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercise.sets.map((set) => (
                <SetRow
                  key={set.id}
                  set={set}
                  exercise={exercise}
                  onCompleteSet={onCompleteSet}
                  onFailSet={onFailSet}
                />
              ))}
            </TableBody>
          </Table>

          {exercise.notes && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant='body2' color='text.secondary'>
                <strong>Notes:</strong> {exercise.notes}
              </Typography>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    );
  }
);

ExerciseAccordion.displayName = 'ExerciseAccordion';

const WorkoutHeader = memo(
  ({ workout, progress, onStart, onPause, onResume, onStop }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case WORKOUT_STATUS.COMPLETED:
          return 'success';
        case WORKOUT_STATUS.IN_PROGRESS:
          return 'warning';
        case WORKOUT_STATUS.PAUSED:
          return 'info';
        default:
          return 'default';
      }
    };

    const canStart = workout.status === WORKOUT_STATUS.DRAFT;
    const canPause = workout.status === WORKOUT_STATUS.IN_PROGRESS;
    const canResume = workout.status === WORKOUT_STATUS.PAUSED;
    const isCompleted = workout.status === WORKOUT_STATUS.COMPLETED;

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box>
              <Typography variant='h5' gutterBottom>
                {workout.name}
              </Typography>
              {workout.description && (
                <Typography variant='body2' color='text.secondary' paragraph>
                  {workout.description}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {canStart && (
                <Button
                  variant='contained'
                  color='success'
                  startIcon={<StartIcon />}
                  onClick={onStart}
                >
                  Start Workout
                </Button>
              )}
              {canPause && (
                <Button
                  variant='outlined'
                  color='warning'
                  startIcon={<PauseIcon />}
                  onClick={onPause}
                >
                  Pause
                </Button>
              )}
              {canResume && (
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<StartIcon />}
                  onClick={onResume}
                >
                  Resume
                </Button>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip
              label={workout.status.replace('_', ' ').toUpperCase()}
              color={getStatusColor(workout.status)}
            />
            <Chip
              label={workout.difficulty}
              color={
                workout.difficulty === 'beginner'
                  ? 'success'
                  : workout.difficulty === 'intermediate'
                  ? 'warning'
                  : 'error'
              }
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TimerIcon fontSize='small' />
              <Typography variant='body2'>
                {workout.estimatedDuration} min
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WeightIcon fontSize='small' />
              <Typography variant='body2'>
                {workout.exercises.length} exercises
              </Typography>
            </Box>
          </Box>

          {progress && (
            <Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography variant='body2'>
                  Progress: {progress.completedSets} / {progress.totalSets} sets
                </Typography>
                <Typography variant='body2' fontWeight='bold'>
                  {progress.percentage}%
                </Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={progress.percentage}
                color={progress.percentage === 100 ? 'success' : 'primary'}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          )}

          {isCompleted && (
            <Box
              sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }}
            >
              <Typography
                variant='body1'
                color='success.dark'
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <CompleteIcon />
                Workout completed! Great job!
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
);

WorkoutHeader.displayName = 'WorkoutHeader';

const WorkoutSession = memo(() => {
  const {
    currentWorkout,
    currentWorkoutProgress,
    navigateToList,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    completeSetInWorkout,
    failSetInWorkout,
  } = useWorkout();

  const [expandedExercise, setExpandedExercise] = useState(null);

  if (!currentWorkout) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          No workout selected
        </Typography>
        <Button onClick={navigateToList} sx={{ mt: 2 }}>
          Back to Workouts
        </Button>
      </Box>
    );
  }

  const handleToggleExercise = (exerciseId) => {
    setExpandedExercise((prev) => (prev === exerciseId ? null : exerciseId));
  };

  const handleStartWorkout = () => {
    startWorkout(currentWorkout);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={navigateToList} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant='h4' component='h1'>
          Workout Session
        </Typography>
      </Box>

      <WorkoutHeader
        workout={currentWorkout}
        progress={currentWorkoutProgress}
        onStart={handleStartWorkout}
        onPause={pauseWorkout}
        onResume={resumeWorkout}
      />

      <Box>
        <Typography variant='h6' gutterBottom>
          Exercises
        </Typography>

        {currentWorkout.exercises.map((exercise) => (
          <ExerciseAccordion
            key={exercise.id}
            exercise={exercise}
            expanded={expandedExercise === exercise.id}
            onToggle={() => handleToggleExercise(exercise.id)}
            onCompleteSet={completeSetInWorkout}
            onFailSet={failSetInWorkout}
          />
        ))}
      </Box>
    </Box>
  );
});

WorkoutSession.displayName = 'WorkoutSession';

export default WorkoutSession;
