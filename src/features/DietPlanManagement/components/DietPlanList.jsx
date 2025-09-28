/**
 * Diet Plan List Component
 * Displays and manages the list of diet plans
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import { DIET_PLAN_TYPE_LABELS } from '../constants';
import DietPlanCard from './DietPlanCard';

const DietPlanList = () => {
  const { dietPlans, openCreatePlan, openAssignPlan, deleteDietPlan } =
    useDietPlan();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Handler functions
  const handleCreatePlan = () => {
    openCreatePlan();
  };

  const handleEditPlan = (plan) => {
    // Note: Edit functionality would need to be implemented in context
    console.log('Edit plan:', plan);
    // For now, just open create plan modal to demonstrate functionality
    openCreatePlan();
  };

  const handleAssignPlan = (plan) => {
    openAssignPlan(plan);
  };

  // Filter and search logic
  const filteredPlans = useMemo(() => {
    return dietPlans.filter((plan) => {
      const matchesSearch =
        (plan.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (plan.description || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || plan.type === filterType;
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && plan.isActive) ||
        (filterStatus === 'inactive' && !plan.isActive);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [dietPlans, searchTerm, filterType, filterStatus]);

  const handleDeletePlan = (plan) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${plan.name}"? This action cannot be undone.`
      )
    ) {
      deleteDietPlan(plan.id);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h5' component='h1'>
          Diet Plans ({filteredPlans.length})
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreatePlan}
          sx={{ minWidth: 140 }}
        >
          Create Plan
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              placeholder='Search plans...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label='Type'
                startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value='all'>All Types</MenuItem>
                {Object.entries(DIET_PLAN_TYPE_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label='Status'
              >
                <MenuItem value='all'>All Status</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <RestaurantIcon
            sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? 'No plans match your filters'
              : 'No diet plans found'}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search criteria or filters'
              : 'Create your first diet plan to get started'}
          </Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleCreatePlan}
          >
            Create Diet Plan
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPlans.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <DietPlanCard
                plan={plan}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
                onAssign={handleAssignPlan}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DietPlanList;
