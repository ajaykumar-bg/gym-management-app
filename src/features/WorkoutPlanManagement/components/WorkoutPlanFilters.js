import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  InputAdornment,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { WORKOUT_TYPES, DIFFICULTY_LEVELS, PLAN_STATUS } from '../constants';

const WorkoutPlanFilters = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  difficultyFilter,
  onDifficultyFilterChange,
  statusFilter,
  onStatusFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    searchTerm ||
    typeFilter !== 'all' ||
    difficultyFilter !== 'all' ||
    statusFilter !== 'all';

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          size='small'
          placeholder='Search plans...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ minWidth: 250, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position='end'>
                <Clear
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onSearchChange('')}
                />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size='small' sx={{ minWidth: 160 }}>
          <InputLabel>Workout Type</InputLabel>
          <Select
            value={typeFilter}
            label='Workout Type'
            onChange={(e) => onTypeFilterChange(e.target.value)}
          >
            <MenuItem value='all'>All Types</MenuItem>
            {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 140 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficultyFilter}
            label='Difficulty'
            onChange={(e) => onDifficultyFilterChange(e.target.value)}
          >
            <MenuItem value='all'>All Levels</MenuItem>
            {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label='Status'
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <MenuItem value='all'>All Status</MenuItem>
            {Object.entries(PLAN_STATUS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {hasActiveFilters && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label='Clear all filters'
            variant='outlined'
            size='small'
            onClick={onClearFilters}
            onDelete={onClearFilters}
            deleteIcon={<Clear />}
          />
        </Box>
      )}
    </Box>
  );
};

export default WorkoutPlanFilters;
