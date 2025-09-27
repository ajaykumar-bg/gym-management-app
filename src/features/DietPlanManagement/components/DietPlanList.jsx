/**
 * Diet Plan List Component
 * Displays and manages the list of diet plans
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Restaurant as RestaurantIcon,
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as CalorieIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import {
  DIET_PLAN_TYPE_LABELS,
  DIET_GOAL_LABELS,
  DIET_PLAN_STATUS_COLORS,
  DIET_PLAN_TYPE_COLORS,
} from '../constants';

const DietPlanCard = ({ plan, onEdit, onDelete, onAssign }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(plan);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(plan);
  };

  const handleAssign = () => {
    handleMenuClose();
    onAssign(plan);
  };

  const totalCalories = plan.meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );
  const totalMacros = plan.meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.macros.protein,
      carbs: acc.carbs + meal.macros.carbs,
      fats: acc.fats + meal.macros.fats,
    }),
    { protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        {/* Header with menu */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='h6' component='h3' gutterBottom>
              {plan.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <Chip
                label={DIET_PLAN_TYPE_LABELS[plan.type]}
                color={DIET_PLAN_TYPE_COLORS[plan.type]}
                size='small'
              />
              <Chip
                label={DIET_GOAL_LABELS[plan.goals[0]] || plan.goals[0]}
                variant='outlined'
                size='small'
              />
              <Chip
                label={plan.isActive ? 'Active' : 'Inactive'}
                color={
                  DIET_PLAN_STATUS_COLORS[plan.isActive ? 'active' : 'inactive']
                }
                size='small'
              />
            </Box>
          </Box>

          <IconButton onClick={handleMenuClick} size='small' sx={{ ml: 1 }}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuItem onClick={handleEdit}>
              <EditIcon fontSize='small' sx={{ mr: 1 }} />
              Edit Plan
            </MenuItem>
            <MenuItem onClick={handleAssign}>
              <AssignmentIcon fontSize='small' sx={{ mr: 1 }} />
              Assign to Member
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize='small' sx={{ mr: 1 }} />
              Delete Plan
            </MenuItem>
          </Menu>
        </Box>

        {/* Description */}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {plan.description}
        </Typography>

        {/* Nutrition Summary */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalorieIcon fontSize='small' color='primary' />
              <Typography variant='body2' fontWeight='medium'>
                {totalCalories} cal
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RestaurantIcon fontSize='small' color='secondary' />
              <Typography variant='body2'>{plan.meals.length} meals</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize='small' color='info' />
              <Typography variant='body2'>{plan.duration} days</Typography>
            </Box>
          </Box>

          {/* Macro breakdown */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`P: ${totalMacros.protein}g`}
              size='small'
              variant='outlined'
              color='success'
            />
            <Chip
              label={`C: ${totalMacros.carbs}g`}
              size='small'
              variant='outlined'
              color='warning'
            />
            <Chip
              label={`F: ${totalMacros.fats}g`}
              size='small'
              variant='outlined'
              color='error'
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Sample meals preview */}
        <Box>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            Sample Meals:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {plan.meals.slice(0, 3).map((meal, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='caption' sx={{ fontWeight: 'medium' }}>
                  {meal.name}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {meal.calories} cal
                </Typography>
              </Box>
            ))}
            {plan.meals.length > 3 && (
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontStyle: 'italic' }}
              >
                +{plan.meals.length - 3} more meals...
              </Typography>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              Created: {new Date(plan.createdDate).toLocaleDateString()}
            </Typography>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {plan.createdBy.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const DietPlanList = () => {
  const {
    dietPlans,
    openCreatePlanModal,
    openEditPlanModal,
    openAssignPlanModal,
    deleteDietPlan,
  } = useDietPlan();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter and search logic
  const filteredPlans = useMemo(() => {
    return dietPlans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase());

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
          onClick={openCreatePlanModal}
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
            onClick={openCreatePlanModal}
          >
            Create Diet Plan
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredPlans.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <DietPlanCard
                plan={plan}
                onEdit={openEditPlanModal}
                onDelete={handleDeletePlan}
                onAssign={openAssignPlanModal}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DietPlanList;
