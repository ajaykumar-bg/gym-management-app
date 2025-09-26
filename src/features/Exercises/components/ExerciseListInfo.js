import { Box, Chip, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import {
  muscleTypes,
  equipmentTypes,
  categoryTypes,
  forceTypes,
  difficultyLevels,
} from '../constants/exercisesApp.mock';

function ExerciseListInfo(props) {
  const {
    totalExercises,
    page,
    pageSize,
    filters,
    onClearFilter,
    totalUnfilteredCount,
  } = props;
  const totalPages = Math.ceil(totalExercises / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalExercises);

  // Get active filter labels and create chips
  const activeFilters = useMemo(() => {
    const active = [];

    if (filters?.searchQuery) {
      active.push({
        key: 'searchQuery',
        label: `Search: "${filters.searchQuery}"`,
        type: 'search',
      });
    }

    if (filters?.muscle && filters.muscle !== 'All') {
      const muscle = muscleTypes.find((m) => m.value === filters.muscle);
      active.push({
        key: 'muscle',
        label: muscle?.label || filters.muscle,
        type: 'muscle',
      });
    }

    if (filters?.equipment && filters.equipment !== 'All') {
      const equipment = equipmentTypes.find(
        (e) => e.value === filters.equipment
      );
      active.push({
        key: 'equipment',
        label: equipment?.label || filters.equipment,
        type: 'equipment',
      });
    }

    if (filters?.category && filters.category !== 'All') {
      const category = categoryTypes.find((c) => c.value === filters.category);
      active.push({
        key: 'category',
        label: category?.label || filters.category,
        type: 'category',
      });
    }

    if (filters?.force && filters.force !== 'All') {
      const force = forceTypes.find((f) => f.value === filters.force);
      active.push({
        key: 'force',
        label: force?.label || filters.force,
        type: 'force',
      });
    }

    if (filters?.difficulty && filters.difficulty !== 'All') {
      const difficulty = difficultyLevels.find(
        (d) => d.value === filters.difficulty
      );
      active.push({
        key: 'difficulty',
        label: difficulty?.label || filters.difficulty,
        type: 'difficulty',
      });
    }

    return active;
  }, [filters]);

  const handleClearSpecificFilter = (filterKey) => {
    if (onClearFilter) {
      onClearFilter(filterKey);
    }
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'search':
        return 'primary';
      case 'muscle':
        return 'secondary';
      case 'equipment':
        return 'info';
      case 'category':
        return 'success';
      case 'force':
        return 'warning';
      case 'difficulty':
        return 'error';
      default:
        return 'default';
    }
  };

  const hasFilters = activeFilters.length > 0;
  const isFiltered =
    totalUnfilteredCount && totalExercises !== totalUnfilteredCount;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Main Info Row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
          mb: hasFilters ? 2 : 0,
        }}
      >
        <Typography variant='body1' color='text.secondary'>
          {isFiltered ? (
            <>
              Showing {startIndex + 1}-{endIndex} of {totalExercises} filtered
              exercises
              <Typography
                component='span'
                variant='caption'
                sx={{ ml: 1, opacity: 0.7 }}
              >
                (out of {totalUnfilteredCount} total)
              </Typography>
            </>
          ) : (
            `Showing ${
              startIndex + 1
            }-${endIndex} of ${totalExercises} exercises`
          )}
        </Typography>

        <Chip
          label={`Page ${page} of ${totalPages}`}
          variant='outlined'
          size='small'
          color='primary'
        />

        {hasFilters && (
          <Chip
            label={`${activeFilters.length} filter${
              activeFilters.length > 1 ? 's' : ''
            } active`}
            variant='filled'
            size='small'
            color='primary'
          />
        )}
      </Box>

      {/* Active Filters Row */}
      {hasFilters && (
        <Box>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ mb: 1, display: 'block' }}
          >
            Active filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {activeFilters.map((filter) => (
              <Chip
                key={filter.key}
                label={filter.label}
                onDelete={() => handleClearSpecificFilter(filter.key)}
                size='small'
                variant='outlined'
                color={getChipColor(filter.type)}
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
    </Box>
  );
}

export default ExerciseListInfo;
