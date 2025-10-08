/**
 * WorkoutList Component
 * Displays and manages the list of workouts
 */

import React, { memo, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Button,
  TableSortLabel,
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ContentCopy as DuplicateIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';
import { useUser } from '../../../context/UserContext';
import { WORKOUT_STATUS } from '../workout.constants';

const WorkoutStatusChip = memo(({ status }) => {
  const getStatusProps = (status) => {
    switch (status) {
      case WORKOUT_STATUS.COMPLETED:
        return { color: 'success', label: 'Completed' };
      case WORKOUT_STATUS.IN_PROGRESS:
        return { color: 'warning', label: 'In Progress' };
      case WORKOUT_STATUS.PAUSED:
        return { color: 'info', label: 'Paused' };
      case WORKOUT_STATUS.DRAFT:
      default:
        return { color: 'default', label: 'Draft' };
    }
  };

  const { color, label } = getStatusProps(status);
  return <Chip label={label} color={color} size='small' />;
});

WorkoutStatusChip.displayName = 'WorkoutStatusChip';

const WorkoutActionsMenu = memo(
  ({ workout, anchorEl, onClose, onStart, onDuplicate, onDelete }) => {
    const { permissions } = useUser();
    const canStart =
      workout &&
      (workout.status === WORKOUT_STATUS.DRAFT ||
        workout.status === WORKOUT_STATUS.PAUSED);
    const canManage = permissions.canManageWorkouts;

    if (!workout) {
      return null;
    }

    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {canStart && (
          <MenuItem
            onClick={() => {
              onStart(workout);
              onClose();
            }}
          >
            <StartIcon sx={{ mr: 1 }} />
            Start Workout
          </MenuItem>
        )}
        {canManage && (
          <MenuItem
            onClick={() => {
              onDuplicate(workout);
              onClose();
            }}
          >
            <DuplicateIcon sx={{ mr: 1 }} />
            Duplicate
          </MenuItem>
        )}
        {canManage && (
          <MenuItem
            onClick={() => {
              onDelete(workout.id);
              onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        )}
      </Menu>
    );
  }
);

WorkoutActionsMenu.displayName = 'WorkoutActionsMenu';

const WorkoutFilters = memo(({ filters, onFiltersChange, onClear }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          placeholder='Search workouts...'
          value={filters.search}
          onChange={(e) => onFiltersChange({ search: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant='outlined'
          startIcon={<FilterIcon />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
        {(filters.search ||
          filters.category ||
          filters.difficulty ||
          filters.status) && (
          <Button
            variant='outlined'
            startIcon={<ClearIcon />}
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </Box>

      {showFilters && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label='Category'
              onChange={(e) => onFiltersChange({ category: e.target.value })}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='Push/Pull/Legs'>Push/Pull/Legs</MenuItem>
              <MenuItem value='Body Parts'>Body Parts</MenuItem>
              <MenuItem value='Full Body'>Full Body</MenuItem>
              <MenuItem value='custom'>Custom</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={filters.difficulty}
              label='Difficulty'
              onChange={(e) => onFiltersChange({ difficulty: e.target.value })}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value='beginner'>Beginner</MenuItem>
              <MenuItem value='intermediate'>Intermediate</MenuItem>
              <MenuItem value='expert'>Expert</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label='Status'
              onChange={(e) => onFiltersChange({ status: e.target.value })}
            >
              <MenuItem value=''>All</MenuItem>
              <MenuItem value={WORKOUT_STATUS.DRAFT}>Draft</MenuItem>
              <MenuItem value={WORKOUT_STATUS.IN_PROGRESS}>
                In Progress
              </MenuItem>
              <MenuItem value={WORKOUT_STATUS.COMPLETED}>Completed</MenuItem>
              <MenuItem value={WORKOUT_STATUS.PAUSED}>Paused</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
});

WorkoutFilters.displayName = 'WorkoutFilters';

const WorkoutList = memo(() => {
  const {
    workouts,
    workoutFilters,
    workoutSort,
    updateWorkoutFilters,
    updateWorkoutSort,
    startWorkout,
    duplicateWorkout,
    deleteWorkout,
    navigateToWorkout,
  } = useWorkout();

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleMenuOpen = (event, workout) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedWorkout(workout);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedWorkout(null);
  };

  const handleSort = (field) => {
    const isAsc =
      workoutSort.field === field && workoutSort.direction === 'asc';
    updateWorkoutSort(field, isAsc ? 'desc' : 'asc');
  };

  const handleFiltersChange = (newFilters) => {
    updateWorkoutFilters(newFilters);
  };

  const handleClearFilters = () => {
    updateWorkoutFilters({
      search: '',
      category: '',
      difficulty: '',
      status: '',
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        My Workouts
      </Typography>

      <WorkoutFilters
        filters={workoutFilters}
        onFiltersChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={workoutSort.field === 'name'}
                  direction={
                    workoutSort.field === 'name' ? workoutSort.direction : 'asc'
                  }
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>
                <TableSortLabel
                  active={workoutSort.field === 'difficulty'}
                  direction={
                    workoutSort.field === 'difficulty'
                      ? workoutSort.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('difficulty')}
                >
                  Difficulty
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={workoutSort.field === 'duration'}
                  direction={
                    workoutSort.field === 'duration'
                      ? workoutSort.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('duration')}
                >
                  Duration
                </TableSortLabel>
              </TableCell>
              <TableCell>Exercises</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={workoutSort.field === 'createdAt'}
                  direction={
                    workoutSort.field === 'createdAt'
                      ? workoutSort.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('createdAt')}
                >
                  Created
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align='center' sx={{ py: 4 }}>
                  <Typography variant='body1' color='text.secondary'>
                    No workouts found. Create your first workout to get started!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              workouts.map((workout) => (
                <TableRow
                  key={workout.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigateToWorkout(workout)}
                >
                  <TableCell>
                    <Typography
                      variant='subtitle2'
                      sx={{ fontWeight: 'medium' }}
                    >
                      {workout.name}
                    </Typography>
                    {workout.description && (
                      <Typography variant='body2' color='text.secondary' noWrap>
                        {workout.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={workout.category}
                      size='small'
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={workout.difficulty}
                      size='small'
                      color={
                        workout.difficulty === 'beginner'
                          ? 'success'
                          : workout.difficulty === 'intermediate'
                          ? 'warning'
                          : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {formatDuration(workout.estimatedDuration)}
                  </TableCell>
                  <TableCell>{workout.exercises.length}</TableCell>
                  <TableCell>
                    <WorkoutStatusChip status={workout.status} />
                  </TableCell>
                  <TableCell>{formatDate(workout.createdAt)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton
                      size='small'
                      onClick={(e) => handleMenuOpen(e, workout)}
                    >
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <WorkoutActionsMenu
        workout={selectedWorkout}
        anchorEl={menuAnchor}
        onClose={handleMenuClose}
        onStart={startWorkout}
        onDuplicate={duplicateWorkout}
        onDelete={deleteWorkout}
      />
    </Box>
  );
});

WorkoutList.displayName = 'WorkoutList';

export default WorkoutList;
