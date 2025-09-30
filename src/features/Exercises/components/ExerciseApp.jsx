/**
 * Exercise App Component (Refactored with Context)
 * Main container for the exercises feature using ExercisesContext for state management
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import { useExercises } from '../context';
import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';
import ExerciseListInfo from './ExerciseListInfo';

// Main App Component
const ExerciseApp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get all state and functions from context
  const {
    // Filter state
    filters,
    filteredExercises,

    // Filter actions
    handleFilterChange,
    handleSearch,
    clearFilters,
    handleClearSpecificFilter,

    // Exercise detail state
    selectedExercise,
    detailsOpen,
    activeStep,

    // Exercise detail actions
    openExerciseDetails,
    closeExerciseDetails,
    handleNext,
    handleBack,

    // Mobile UI state
    mobileFiltersOpen,
    openMobileFilters,
    closeMobileFilters,

    // Data
    totalExercises,
  } = useExercises();

  // Pagination state (moved from ExerciseList)
  const [page, setPage] = useState(1);
  const [exercisesPerPage, setExercisesPerPage] = useState(12);

  // Calculate pagination values
  const totalFilteredExercises = filteredExercises.length;
  const totalPages = Math.ceil(totalFilteredExercises / exercisesPerPage);
  const startIndex = (page - 1) * exercisesPerPage;
  const endIndex = Math.min(
    startIndex + exercisesPerPage,
    totalFilteredExercises
  );

  // Get exercises for current page
  const paginatedExercises = useMemo(() => {
    return filteredExercises.slice(startIndex, endIndex);
  }, [filteredExercises, startIndex, endIndex]);

  // Handle pagination changes
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    // Scroll to top of exercise list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExercisesPerPageChange = (event) => {
    setExercisesPerPage(event.target.value);
    setPage(1); // Reset to first page when changing page size
  };

  // Reset page when exercises change (due to filters)
  React.useEffect(() => {
    setPage(1);
  }, [filteredExercises.length]);

  const exercisesPerPageOptions = [6, 12, 24, 48, 96];
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
        onClose={closeMobileFilters}
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
          width: { xs: '100%', md: 'calc(100% - 320px)' },
        }}
      >
        {/* Header with Exercise Info */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Typography component='h1' variant='h5' sx={{ fontWeight: 600 }}>
              Exercise Library
            </Typography>

            {/* Exercise List Info */}
            {totalFilteredExercises > 0 && (
              <ExerciseListInfo
                totalExercises={totalFilteredExercises}
                page={page}
                pageSize={exercisesPerPage}
                totalUnfilteredCount={totalExercises}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* Exercises Per Page Selector */}
            {totalFilteredExercises > 0 && (
              <FormControl size='small' sx={{ minWidth: 120 }}>
                <InputLabel>Per page</InputLabel>
                <Select
                  value={exercisesPerPage}
                  onChange={handleExercisesPerPageChange}
                  label='Per page'
                >
                  {exercisesPerPageOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Mobile Filter Toggle Button */}
            {isMobile && (
              <Box
                component='button'
                onClick={openMobileFilters}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
              >
                <Typography variant='body2'>Filters</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Exercise List Container */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          <ExerciseList
            exercises={paginatedExercises}
            totalExercises={totalFilteredExercises}
            totalPages={totalPages}
            page={page}
            exercisesPerPage={exercisesPerPage}
            onPageChange={handlePageChange}
            openExerciseDetails={openExerciseDetails}
            clearFilters={clearFilters}
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
