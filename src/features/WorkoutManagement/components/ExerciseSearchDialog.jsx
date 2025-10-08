/**
 * ExerciseSearchDialog Component
 * Dialog for searching and selecting exercises to add to workouts
 */

import React, { memo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  Grid,
  InputAdornment,
  IconButton,
  Collapse,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';
import {
  getMuscleGroupOptions,
  getEquipmentCategories,
} from '../workout.utils';

const ExerciseSetsConfig = memo(({ exercise, onAddExercise, onCancel }) => {
  const [setsConfig, setSetsConfig] = useState({
    sets: 3,
    reps: [8, 10, 12],
    weight: 0,
    restTime: 60,
    priority: 'medium',
  });

  const handleChange = (field, value) => {
    setSetsConfig((prev) => {
      if (field === 'sets') {
        const newReps = Array.from(
          { length: value },
          (_, i) => prev.reps[i] || 10
        );
        return { ...prev, [field]: value, reps: newReps };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleRepsChange = (setIndex, reps) => {
    setSetsConfig((prev) => ({
      ...prev,
      reps: prev.reps.map((rep, index) =>
        index === setIndex ? parseInt(reps) || 0 : rep
      ),
    }));
  };

  const handleAdd = () => {
    onAddExercise(exercise, setsConfig);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant='h6' gutterBottom>
        Configure Sets for {exercise.name}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            label='Sets'
            type='number'
            value={setsConfig.sets}
            onChange={(e) =>
              handleChange('sets', parseInt(e.target.value) || 1)
            }
            inputProps={{ min: 1, max: 10 }}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            label='Weight (lbs)'
            type='number'
            value={setsConfig.weight}
            onChange={(e) =>
              handleChange('weight', parseInt(e.target.value) || 0)
            }
            inputProps={{ min: 0 }}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            label='Rest (seconds)'
            type='number'
            value={setsConfig.restTime}
            onChange={(e) =>
              handleChange('restTime', parseInt(e.target.value) || 60)
            }
            inputProps={{ min: 15, max: 300 }}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={setsConfig.priority}
              label='Priority'
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <MenuItem value='low'>Low</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='high'>High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant='body2' color='text.secondary' gutterBottom>
        Reps per set:
      </Typography>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {setsConfig.reps.map((reps, index) => (
          <Grid key={index} size={{ xs: 2 }}>
            <TextField
              size='small'
              label={`Set ${index + 1}`}
              type='number'
              value={reps}
              onChange={(e) => handleRepsChange(index, e.target.value)}
              inputProps={{ min: 1, max: 50 }}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant='contained' onClick={handleAdd} startIcon={<AddIcon />}>
          Add to Workout
        </Button>
      </Box>
    </Paper>
  );
});

ExerciseSetsConfig.displayName = 'ExerciseSetsConfig';

const ExerciseFilters = memo(({ filters, onFiltersChange, onClear }) => {
  const [showFilters, setShowFilters] = useState(false);
  const muscleGroups = getMuscleGroupOptions();
  const equipmentOptions = getEquipmentCategories();

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
        <TextField
          fullWidth
          placeholder='Search exercises...'
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: filters.search && (
              <InputAdornment position='end'>
                <IconButton
                  size='small'
                  onClick={() => onFiltersChange({ search: '' })}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant='outlined'
          startIcon={<FilterIcon />}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? <CollapseIcon /> : <ExpandIcon />}
        </Button>
      </Box>

      <Collapse in={showFilters}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Muscle Group</InputLabel>
              <Select
                value={filters.muscleGroup || ''}
                label='Muscle Group'
                onChange={(e) =>
                  onFiltersChange({ muscleGroup: e.target.value })
                }
              >
                <MenuItem value=''>All</MenuItem>
                {muscleGroups.map((group) => (
                  <MenuItem key={group.value} value={group.value}>
                    {group.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Equipment</InputLabel>
              <Select
                value={filters.equipment || ''}
                label='Equipment'
                onChange={(e) => onFiltersChange({ equipment: e.target.value })}
              >
                <MenuItem value=''>All</MenuItem>
                {equipmentOptions.map((equipment) => (
                  <MenuItem key={equipment.value} value={equipment.value}>
                    {equipment.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={filters.difficulty || ''}
                label='Difficulty'
                onChange={(e) =>
                  onFiltersChange({ difficulty: e.target.value })
                }
              >
                <MenuItem value=''>All</MenuItem>
                <MenuItem value='beginner'>Beginner</MenuItem>
                <MenuItem value='intermediate'>Intermediate</MenuItem>
                <MenuItem value='expert'>Expert</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {(filters.muscleGroup || filters.equipment || filters.difficulty) && (
          <Box sx={{ mt: 2 }}>
            <Button size='small' startIcon={<ClearIcon />} onClick={onClear}>
              Clear Filters
            </Button>
          </Box>
        )}
      </Collapse>
    </Box>
  );
});

ExerciseFilters.displayName = 'ExerciseFilters';

const ExerciseSearchDialog = memo(({ open, onClose, onAddExercise }) => {
  const {
    exercises,
    exerciseSearch,
    exerciseFilters,
    updateExerciseSearch,
    updateExerciseFilters,
    clearExerciseFilters,
  } = useWorkout();

  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleFiltersChange = (newFilters) => {
    updateExerciseFilters(newFilters);
  };

  const handleSearchChange = (newSearch) => {
    updateExerciseSearch(newSearch);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleAddExercise = (exercise, setsConfig) => {
    onAddExercise(exercise, setsConfig);
    setSelectedExercise(null);
  };

  const handleCancel = () => {
    setSelectedExercise(null);
  };

  const handleClose = () => {
    setSelectedExercise(null);
    onClose();
  };

  // Create a combined filters object for the component
  const combinedFilters = {
    search: exerciseSearch,
    ...exerciseFilters,
  };

  const handleCombinedFiltersChange = (newFilters) => {
    if ('search' in newFilters) {
      handleSearchChange(newFilters.search);
    }

    // Extract non-search filters
    const { search, ...otherFilters } = newFilters;
    if (Object.keys(otherFilters).length > 0) {
      handleFiltersChange(otherFilters);
    }
  };

  const handleClearAll = () => {
    clearExerciseFilters();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{ sx: { height: '80vh' } }}
    >
      <DialogTitle>Add Exercise to Workout</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <ExerciseFilters
          filters={combinedFilters}
          onFiltersChange={handleCombinedFiltersChange}
          onClear={handleClearAll}
        />

        {selectedExercise ? (
          <ExerciseSetsConfig
            exercise={selectedExercise}
            onAddExercise={handleAddExercise}
            onCancel={handleCancel}
          />
        ) : (
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
              {exercises.length} exercises found
            </Typography>

            <List sx={{ flex: 1, overflow: 'auto' }}>
              {exercises.length === 0 ? (
                <ListItem>
                  <ListItemText
                    primary='No exercises found'
                    secondary='Try adjusting your search terms or filters'
                  />
                </ListItem>
              ) : (
                exercises.map((exercise) => (
                  <ListItem
                    key={exercise.name}
                    divider
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleSelectExercise(exercise)}
                  >
                    <ListItemText
                      primary={exercise.name}
                      secondary={
                        <Box component='div'>
                          <Box
                            component='span'
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.875rem',
                            }}
                          >
                            {exercise.primaryMuscles.join(', ')}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                            <Chip
                              label={exercise.equipment}
                              size='small'
                              variant='outlined'
                            />
                            <Chip
                              label={exercise.level}
                              size='small'
                              color={
                                exercise.level === 'beginner'
                                  ? 'success'
                                  : exercise.level === 'intermediate'
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        onClick={() => handleSelectExercise(exercise)}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              )}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

ExerciseSearchDialog.displayName = 'ExerciseSearchDialog';

export default ExerciseSearchDialog;
