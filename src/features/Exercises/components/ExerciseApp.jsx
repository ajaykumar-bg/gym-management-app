/**
 * Exercise App Component (Refactored with Context)
 * Main container for the exercises feature using ExercisesContext for state management
 */

import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useExercises } from '../context';
import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';

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
            totalUnfilteredCount={totalExercises}
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
