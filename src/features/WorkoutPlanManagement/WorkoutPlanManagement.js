import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
  Fab,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import {
  WorkoutPlanCard,
  WorkoutPlanForm,
  WorkoutPlanFilters,
  WorkoutPlanStats,
} from './components';
import { MOCK_WORKOUT_PLANS } from './constants';
import {
  filterPlansByType,
  filterPlansByDifficulty,
  filterPlansByStatus,
  searchWorkoutPlans,
  sortWorkoutPlans,
} from './utils';

const WorkoutPlanManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, permissions } = useUser();

  // State management
  const [workoutPlans, setWorkoutPlans] = useState(MOCK_WORKOUT_PLANS);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  // Future sorting functionality
  // const [sortField, setSortField] = useState('lastModified');
  // const [sortDirection, setSortDirection] = useState('desc');
  const sortField = 'lastModified';
  const sortDirection = 'desc';

  // Computed filtered and sorted plans
  const filteredAndSortedPlans = useMemo(() => {
    let filtered = workoutPlans;

    // Apply search
    if (searchTerm) {
      filtered = searchWorkoutPlans(filtered, searchTerm);
    }

    // Apply filters
    filtered = filterPlansByType(filtered, typeFilter);
    filtered = filterPlansByDifficulty(filtered, difficultyFilter);
    filtered = filterPlansByStatus(filtered, statusFilter);

    // Apply sorting
    filtered = sortWorkoutPlans(filtered, sortField, sortDirection);

    return filtered;
  }, [
    workoutPlans,
    searchTerm,
    typeFilter,
    difficultyFilter,
    statusFilter,
    sortField,
    sortDirection,
  ]);

  // Check if user can manage plans
  const canManagePlans =
    permissions?.canManageTrainers ||
    user?.role === 'admin' ||
    user?.role === 'trainer';

  // Event handlers
  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setShowForm(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const handleViewPlan = (plan) => {
    // For now, just edit the plan. In future, this could open a detailed view
    if (canManagePlans) {
      handleEditPlan(plan);
    }
  };

  const handleSavePlan = async (planData) => {
    try {
      if (selectedPlan) {
        // Update existing plan
        setWorkoutPlans((prev) =>
          prev.map((plan) => (plan.id === selectedPlan.id ? planData : plan))
        );
        showSnackbar('Workout plan updated successfully', 'success');
      } else {
        // Add new plan
        setWorkoutPlans((prev) => [...prev, planData]);
        showSnackbar('Workout plan created successfully', 'success');
      }
    } catch (error) {
      showSnackbar('Error saving workout plan', 'error');
      throw error;
    }
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this workout plan?')) {
      setWorkoutPlans((prev) => prev.filter((plan) => plan.id !== planId));
      showSnackbar('Workout plan deleted successfully', 'success');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setDifficultyFilter('all');
    setStatusFilter('all');
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Permission check
  if (
    !permissions?.canViewTrainers &&
    user?.role !== 'admin' &&
    user?.role !== 'trainer'
  ) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='h5' color='error' gutterBottom>
          Access Denied
        </Typography>
        <Typography variant='body1'>
          You don't have permission to view workout plans.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0,
        }}
      >
        <Typography variant='h4' component='h1'>
          Workout Plans
        </Typography>
        {canManagePlans && !isMobile && (
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={handleCreatePlan}
            size='large'
          >
            Create Plan
          </Button>
        )}
      </Box>

      {/* Statistics */}
      <WorkoutPlanStats plans={workoutPlans} />

      {/* Filters */}
      <WorkoutPlanFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        difficultyFilter={difficultyFilter}
        onDifficultyFilterChange={setDifficultyFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Results Summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant='body2' color='text.secondary'>
          Showing {filteredAndSortedPlans.length} of {workoutPlans.length}{' '}
          workout plans
        </Typography>
      </Box>

      {/* Workout Plans Grid */}
      {filteredAndSortedPlans.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {searchTerm ||
            typeFilter !== 'all' ||
            difficultyFilter !== 'all' ||
            statusFilter !== 'all'
              ? 'No workout plans match your filters'
              : 'No workout plans found'}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            {canManagePlans &&
              workoutPlans.length === 0 &&
              'Create your first workout plan to get started'}
          </Typography>
          {canManagePlans && workoutPlans.length === 0 && (
            <Button
              variant='contained'
              startIcon={<Add />}
              onClick={handleCreatePlan}
              size='large'
            >
              Create Your First Plan
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredAndSortedPlans.map((plan) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={plan.id}>
              <WorkoutPlanCard
                plan={plan}
                onEdit={canManagePlans ? handleEditPlan : undefined}
                onDelete={canManagePlans ? handleDeletePlan : undefined}
                onView={handleViewPlan}
                canManage={canManagePlans}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Mobile FAB */}
      {canManagePlans && isMobile && (
        <Fab
          color='primary'
          aria-label='create workout plan'
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={handleCreatePlan}
        >
          <Add />
        </Fab>
      )}

      {/* Workout Plan Form Dialog */}
      <WorkoutPlanForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSavePlan}
        plan={selectedPlan}
        trainerId={user?.id || '1'}
        trainerName={user?.name || 'Current Trainer'}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WorkoutPlanManagement;
