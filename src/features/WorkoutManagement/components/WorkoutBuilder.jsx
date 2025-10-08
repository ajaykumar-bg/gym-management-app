/**
 * WorkoutBuilder Component
 * Interface for creating custom workouts and adding exercises
 */

import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';
import ExerciseSearchDialog from './ExerciseSearchDialog';

const WorkoutBasicInfo = memo(({ workoutData, onChange }) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant='h6' gutterBottom>
        Workout Information
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Workout Name'
            value={workoutData.name}
            onChange={(e) => onChange('name', e.target.value)}
            required
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={workoutData.difficulty}
              label='Difficulty'
              onChange={(e) => onChange('difficulty', e.target.value)}
            >
              <MenuItem value='beginner'>Beginner</MenuItem>
              <MenuItem value='intermediate'>Intermediate</MenuItem>
              <MenuItem value='expert'>Expert</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label='Estimated Duration (minutes)'
            type='number'
            value={workoutData.estimatedDuration}
            onChange={(e) =>
              onChange('estimatedDuration', parseInt(e.target.value) || 60)
            }
            inputProps={{ min: 15, max: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label='Description'
            value={workoutData.description}
            onChange={(e) => onChange('description', e.target.value)}
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Paper>
  );
});

WorkoutBasicInfo.displayName = 'WorkoutBasicInfo';

const ExerciseListItem = memo(({ exercise, onRemove, onEdit }) => {
  const exerciseData = exercise.exercise;

  return (
    <ListItem>
      <ListItemText
        primary={exerciseData.name}
        secondary={
          <Box>
            <Typography variant='body2' color='text.secondary'>
              {exercise.sets.length} sets •{' '}
              {exerciseData.primaryMuscles.join(', ')}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Equipment: {exerciseData.equipment}
            </Typography>
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => onRemove(exercise.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

ExerciseListItem.displayName = 'ExerciseListItem';

const WorkoutExercises = memo(
  ({ exercises, onAddExercise, onRemoveExercise }) => {
    const [showExerciseDialog, setShowExerciseDialog] = useState(false);

    const handleAddExercise = (exercise, setsConfig) => {
      onAddExercise(exercise, setsConfig);
      setShowExerciseDialog(false);
    };

    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h6'>Exercises ({exercises.length})</Typography>
          <Button
            variant='outlined'
            startIcon={<SearchIcon />}
            onClick={() => setShowExerciseDialog(true)}
          >
            Add Exercise
          </Button>
        </Box>

        {exercises.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            <AddIcon sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant='h6'>No exercises added yet</Typography>
            <Typography variant='body2'>
              Click "Add Exercise" to start building your workout
            </Typography>
          </Box>
        ) : (
          <List>
            {exercises.map((exercise, index) => (
              <React.Fragment key={exercise.id}>
                <ExerciseListItem
                  exercise={exercise}
                  onRemove={onRemoveExercise}
                />
                {index < exercises.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}

        <ExerciseSearchDialog
          open={showExerciseDialog}
          onClose={() => setShowExerciseDialog(false)}
          onAddExercise={handleAddExercise}
        />
      </Paper>
    );
  }
);

WorkoutExercises.displayName = 'WorkoutExercises';

const WorkoutBuilder = memo(() => {
  const { navigateToList, createWorkout } = useWorkout();

  const [workoutData, setWorkoutData] = useState({
    name: '',
    description: '',
    difficulty: 'intermediate',
    estimatedDuration: 60,
    exercises: [],
  });

  const handleBasicInfoChange = (field, value) => {
    setWorkoutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddExercise = (exercise, setsConfig) => {
    const newExercise = {
      id: `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      exercise: exercise,
      sets: Array.from({ length: setsConfig.sets || 3 }, (_, index) => ({
        id: `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        setNumber: index + 1,
        targetReps: setsConfig.reps?.[index] || 10,
        actualReps: null,
        weight: setsConfig.weight || 0,
        previousWeight: 0,
        status: 'pending',
        restTime: setsConfig.restTime || 60,
        completedAt: null,
        notes: '',
      })),
      notes: '',
      priority: setsConfig.priority || 'medium',
    };

    setWorkoutData((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
  };

  const handleRemoveExercise = (exerciseId) => {
    setWorkoutData((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== exerciseId),
    }));
  };

  const handleCreateWorkout = () => {
    if (!workoutData.name.trim()) {
      return;
    }

    if (workoutData.exercises.length === 0) {
      return;
    }

    const success = createWorkout(workoutData);
    if (success) {
      // The context will handle navigation to the created workout
    }
  };

  const canCreateWorkout =
    workoutData.name.trim() && workoutData.exercises.length > 0;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={navigateToList} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant='h4' component='h1'>
          Create Workout
        </Typography>
      </Box>

      <WorkoutBasicInfo
        workoutData={workoutData}
        onChange={handleBasicInfoChange}
      />

      <WorkoutExercises
        exercises={workoutData.exercises}
        onAddExercise={handleAddExercise}
        onRemoveExercise={handleRemoveExercise}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant='outlined' onClick={navigateToList}>
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={handleCreateWorkout}
          disabled={!canCreateWorkout}
        >
          Create Workout
        </Button>
      </Box>
    </Box>
  );
});

WorkoutBuilder.displayName = 'WorkoutBuilder';

export default WorkoutBuilder;
