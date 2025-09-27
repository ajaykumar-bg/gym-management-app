import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import exercisesData from '../constants/exercises.json';

import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';

// Main App Component
const ExerciseApp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: '',
    muscle: 'All',
    equipment: 'All',
    category: 'All',
    force: 'All',
    difficulty: 'All',
  });

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Memoized filtered exercises to avoid recalculating on every render
  const filteredExercises = useMemo(() => {
    let filtered = [...exercisesData];

    // Filter by muscle
    if (filters.muscle && filters.muscle !== 'All') {
      filtered = filtered.filter((exercise) =>
        exercise.primaryMuscles.includes(filters.muscle)
      );
    }

    // Filter by equipment
    if (filters.equipment && filters.equipment !== 'All') {
      filtered = filtered.filter(
        (exercise) => exercise.equipment === filters.equipment
      );
    }

    // Filter by force
    if (filters.force && filters.force !== 'All') {
      filtered = filtered.filter(
        (exercise) => exercise.force === filters.force
      );
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'All') {
      filtered = filtered.filter(
        (exercise) => exercise.level === filters.difficulty
      );
    }

    // Filter by category
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(
        (exercise) => exercise.category === filters.category
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(query) ||
          exercise.primaryMuscles.some((muscle) =>
            muscle.toLowerCase().includes(query)
          ) ||
          exercise.equipment.toLowerCase().includes(query) ||
          exercise.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle search
  const handleSearch = useCallback((event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      searchQuery: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      muscle: 'All',
      equipment: 'All',
      category: 'All',
      force: 'All',
      difficulty: 'All',
    });
  }, []);

  // Clear specific filter
  const handleClearSpecificFilter = useCallback((filterKey) => {
    if (filterKey === 'searchQuery') {
      setFilters((prev) => ({ ...prev, searchQuery: '' }));
    } else {
      setFilters((prev) => ({ ...prev, [filterKey]: 'All' }));
    }
  }, []);

  // Apply filters is now handled by useMemo, so we can remove this function
  // and just pass the memoized filteredExercises directly

  // Open exercise details
  const openExerciseDetails = useCallback((exercise) => {
    setSelectedExercise(exercise);
    setDetailsOpen(true);
    setActiveStep(0);
  }, []);

  // Close exercise details
  const closeExerciseDetails = useCallback(() => {
    setDetailsOpen(false);
    setSelectedExercise(null);
  }, []);

  // Handle image navigation
  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Left Sidebar - Search Filters */}
      <Box
        sx={{
          width: { xs: '100%', md: '320px' },
          minWidth: { md: '320px' },
          borderRight: { md: 1 },
          borderColor: { md: 'divider' },
          display: { xs: 'none', md: 'block' },
          overflow: 'auto',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Filter Exercises
          </Typography>
          <SearchFilters
            filters={filters}
            handleSearch={handleSearch}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            onClearSpecificFilter={handleClearSpecificFilter}
          />
        </Box>
      </Box>

      {/* Mobile Drawer for Filters */}
      <Drawer
        variant='temporary'
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: '280px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography component='h2' variant='h6' sx={{ mb: 2 }}>
            Filter Exercises
          </Typography>
          <SearchFilters
            filters={filters}
            handleSearch={handleSearch}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            onClearSpecificFilter={handleClearSpecificFilter}
          />
        </Box>
      </Drawer>

      {/* Main Content Area - Exercise List */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: { xs: '100%', md: 'calc(100% - 320px)' },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography component='h1' variant='h5' sx={{ fontWeight: 600 }}>
            Exercise Library
          </Typography>

          {/* Mobile Filter Toggle Button */}
          {isMobile && (
            <Box
              component='button'
              onClick={() => setMobileFiltersOpen(true)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography variant='body2'>Filters</Typography>
            </Box>
          )}
        </Box>

        {/* Exercise List Container */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          <ExerciseList
            exercises={filteredExercises}
            openExerciseDetails={openExerciseDetails}
            clearFilters={clearFilters}
            totalUnfilteredCount={exercisesData.length}
          />
        </Box>
      </Box>

      {/* Exercise Detail Modal */}
      <ExerciseDetail
        selectedExercise={selectedExercise}
        open={detailsOpen}
        onClose={closeExerciseDetails}
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Box>
  );
};

export default React.memo(ExerciseApp);
