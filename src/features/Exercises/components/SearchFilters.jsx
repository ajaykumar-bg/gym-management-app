/**
 * SearchFilters Component
 * Provides comprehensive filtering interface for exercises with active filter display
 *
 * Features:
 * - Multi-criteria filtering (search, muscle, equipment, category, force, difficulty)
 * - Active filter chips with individual removal
 * - Filter count indicator
 * - Responsive grid layout
 */

import React, { useMemo } from 'react';
import {
  Typography,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  difficultyLevels,
  equipmentTypes,
  categoryTypes,
  forceTypes,
  muscleTypes,
} from '../constants/exercises.constant';
import {
  countActiveFilters,
  getActiveFilterDetails,
} from '../utils/filterUtils';
import { SEARCH_CONFIG, FILTER_CONFIG } from '../constants/ui.constants';

/**
 * SearchFilters Component
 * @param {Object} props - Component props
 * @param {Object} props.filters - Current filter state
 * @param {Function} props.handleSearch - Search query change handler
 * @param {Function} props.handleFilterChange - Filter dropdown change handler
 * @param {Function} props.clearFilters - Clear all filters handler
 * @param {Function} props.onClearSpecificFilter - Clear specific filter handler (optional)
 * @returns {JSX.Element} SearchFilters component
 */
function SearchFilters(props) {
  const {
    filters,
    handleSearch,
    handleFilterChange,
    clearFilters,
    onClearSpecificFilter,
  } = props;

  // Count active filters using utility function
  const activeFiltersCount = useMemo(() => {
    return countActiveFilters(filters);
  }, [filters]);

  // Get active filter details using utility function
  const activeFilterDetails = useMemo(() => {
    return getActiveFilterDetails(filters);
  }, [filters]);

  /**
   * Handles clearing a specific filter
   */
  const handleClearSpecificFilter = (filterKey) => {
    if (onClearSpecificFilter && typeof onClearSpecificFilter === 'function') {
      onClearSpecificFilter(filterKey);
      return;
    }

    // Fallback implementation
    const event = {
      target: {
        name: filterKey,
        value: filterKey === 'searchQuery' ? '' : FILTER_CONFIG.DEFAULT_VALUE,
      },
    };

    if (filterKey === 'searchQuery') {
      handleSearch(event);
    } else {
      handleFilterChange(event);
    }
  };

  /**
   * Renders filter dropdown component
   */
  const FilterDropdown = ({ name, label, options, value }) => (
    <FormControl fullWidth size='small'>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        label={label}
        onChange={handleFilterChange}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h6' component='h3' sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        {activeFiltersCount > 0 && (
          <Chip
            label={`${activeFiltersCount}`}
            color='primary'
            size='small'
            variant='filled'
            sx={{ minWidth: '32px' }}
          />
        )}
      </Box>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            Active filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {activeFilterDetails.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                onDelete={() => handleClearSpecificFilter(filter.key)}
                size='small'
                variant='outlined'
                color='primary'
                sx={{
                  '& .MuiChip-deleteIcon': {
                    fontSize: '16px',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Filter Controls - Vertical Stack */}
      <Stack spacing={3}>
        {/* Search Field */}
        <TextField
          fullWidth
          label='Search Exercises'
          variant='outlined'
          name='searchQuery'
          value={filters.searchQuery}
          onChange={handleSearch}
          placeholder={SEARCH_CONFIG.PLACEHOLDER_TEXT}
          size='small'
          InputProps={{
            endAdornment: <SearchIcon sx={{ color: 'action.active' }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />

        {/* Muscle Group Filter */}
        <FilterDropdown
          name='muscle'
          label='Muscle Group'
          options={muscleTypes}
          value={filters.muscle}
        />

        {/* Equipment Filter */}
        <FilterDropdown
          name='equipment'
          label='Equipment'
          options={equipmentTypes}
          value={filters.equipment}
        />

        {/* Category Filter */}
        <FilterDropdown
          name='category'
          label='Category'
          options={categoryTypes}
          value={filters.category}
        />

        {/* Force Filter */}
        <FilterDropdown
          name='force'
          label='Force'
          options={forceTypes}
          value={filters.force}
        />

        {/* Difficulty Filter */}
        <FilterDropdown
          name='difficulty'
          label='Difficulty'
          options={difficultyLevels}
          value={filters.difficulty}
        />

        {/* Clear Filters Button */}
        <Button
          variant='outlined'
          onClick={clearFilters}
          disabled={activeFiltersCount === 0}
          fullWidth
          sx={{
            mt: 2,
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Clear All Filters
        </Button>
      </Stack>
    </Box>
  );
}

export default React.memo(SearchFilters);
