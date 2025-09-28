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
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FreeBreakfast as FreeBreakfastIcon,
  LunchDining as LunchIcon,
  DinnerDining as DinnerDiningIcon,
  Coffee as SnackIcon,
  LocalDrink as WaterIcon,
  MedicalServices as SupplementIcon,
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
  const [showMealDetails, setShowMealDetails] = useState(false);
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

  const toggleMealDetails = (event) => {
    event.stopPropagation();
    setShowMealDetails(!showMealDetails);
  };

  // Helper function to get meal type icon
  const getMealTypeIcon = (mealType) => {
    switch (mealType?.toLowerCase()) {
      case 'breakfast':
        return <FreeBreakfastIcon fontSize='small' />;
      case 'lunch':
        return <LunchIcon fontSize='small' />;
      case 'dinner':
        return <DinnerDiningIcon fontSize='small' />;
      case 'snack':
        return <SnackIcon fontSize='small' />;
      default:
        return <RestaurantIcon fontSize='small' />;
    }
  };

  const totalCalories = (plan.meals || []).reduce(
    (sum, meal) => sum + (meal.calories || 0),
    0
  );

  const totalMacros = (plan.meals || []).reduce(
    (acc, meal) => {
      // Calculate macros from foods within each meal
      const mealMacros = (meal.foods || []).reduce(
        (mealAcc, food) => ({
          protein: mealAcc.protein + (food.protein || 0),
          carbs: mealAcc.carbs + (food.carbs || 0),
          fats: mealAcc.fats + (food.fats || 0),
        }),
        { protein: 0, carbs: 0, fats: 0 }
      );

      return {
        protein: acc.protein + mealMacros.protein,
        carbs: acc.carbs + mealMacros.carbs,
        fats: acc.fats + mealMacros.fats,
      };
    },
    { protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: 400,
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
              {plan.name || 'Untitled Plan'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              {plan.type && (
                <Chip
                  label={DIET_PLAN_TYPE_LABELS[plan.type] || plan.type}
                  color={DIET_PLAN_TYPE_COLORS[plan.type] || 'default'}
                  size='small'
                />
              )}
              {plan.goals && plan.goals.length > 0 && (
                <Chip
                  label={DIET_GOAL_LABELS[plan.goals[0]] || plan.goals[0]}
                  variant='outlined'
                  size='small'
                />
              )}
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
          {plan.description || 'No description available'}
        </Typography>

        {/* Enhanced Nutrition Summary */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalorieIcon fontSize='small' color='primary' />
              <Typography variant='body2' fontWeight='medium'>
                {totalCalories} / {plan.targetCalories || 0} cal
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RestaurantIcon fontSize='small' color='secondary' />
              <Typography variant='body2'>
                {(plan.meals || []).length} meals
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize='small' color='info' />
              <Typography variant='body2'>{plan.duration || 0} days</Typography>
            </Box>
          </Box>

          {/* Target vs Actual Calories Progress */}
          {plan.targetCalories && (
            <Box sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Typography variant='caption' color='text.secondary'>
                  Calorie Target
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {Math.round((totalCalories / plan.targetCalories) * 100)}%
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 4,
                  backgroundColor: 'grey.200',
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    width: `${Math.min(
                      (totalCalories / plan.targetCalories) * 100,
                      100
                    )}%`,
                    height: '100%',
                    backgroundColor:
                      totalCalories <= plan.targetCalories
                        ? 'success.main'
                        : 'warning.main',
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Macro breakdown */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={`P: ${Math.round(totalMacros.protein)}g`}
              size='small'
              variant='outlined'
              color='success'
            />
            <Chip
              label={`C: ${Math.round(totalMacros.carbs)}g`}
              size='small'
              variant='outlined'
              color='warning'
            />
            <Chip
              label={`F: ${Math.round(totalMacros.fats)}g`}
              size='small'
              variant='outlined'
              color='error'
            />
            {plan.difficulty && (
              <Chip
                label={plan.difficulty}
                size='small'
                color='info'
                variant='filled'
                sx={{ textTransform: 'capitalize' }}
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Comprehensive Meal Details */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              cursor: 'pointer',
            }}
            onClick={toggleMealDetails}
          >
            <Typography variant='subtitle2' color='text.secondary'>
              Meal Plan Details ({(plan.meals || []).length} meals)
            </Typography>
            <IconButton size='small'>
              {showMealDetails ? (
                <ExpandLessIcon fontSize='small' />
              ) : (
                <ExpandMoreIcon fontSize='small' />
              )}
            </IconButton>
          </Box>

          <Collapse in={showMealDetails}>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
              {(plan.meals || []).map((meal, mealIndex) => (
                <Box key={meal.id || mealIndex} sx={{ mb: 2 }}>
                  {/* Meal Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {getMealTypeIcon(meal.type)}
                    <Typography
                      variant='body2'
                      fontWeight='medium'
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {meal.name || `${meal.type || 'Meal'} ${mealIndex + 1}`}
                    </Typography>
                    <Chip
                      size='small'
                      label={`${meal.calories || 0} cal`}
                      color='primary'
                      variant='outlined'
                    />
                    {meal.time && (
                      <Typography variant='caption' color='text.secondary'>
                        @ {meal.time}
                      </Typography>
                    )}
                  </Box>

                  {/* Foods in Meal */}
                  <List dense sx={{ py: 0 }}>
                    {(meal.foods || []).map((food, foodIndex) => (
                      <ListItem key={foodIndex} sx={{ py: 0.5, pl: 2 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography
                                variant='caption'
                                sx={{ fontWeight: 'medium' }}
                              >
                                {food.name}
                              </Typography>
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                {food.quantity}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box
                              sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
                            >
                              <Typography
                                variant='caption'
                                color='text.secondary'
                              >
                                {food.calories}cal
                              </Typography>
                              {food.protein > 0 && (
                                <Typography
                                  variant='caption'
                                  color='success.main'
                                >
                                  P:{food.protein}g
                                </Typography>
                              )}
                              {food.carbs > 0 && (
                                <Typography
                                  variant='caption'
                                  color='warning.main'
                                >
                                  C:{food.carbs}g
                                </Typography>
                              )}
                              {food.fats > 0 && (
                                <Typography
                                  variant='caption'
                                  color='error.main'
                                >
                                  F:{food.fats}g
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}

              {/* Additional Plan Details */}
              {(plan.waterIntake || plan.supplements?.length > 0) && (
                <Divider sx={{ my: 2 }} />
              )}

              {plan.waterIntake && (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <WaterIcon fontSize='small' color='info' />
                  <Typography variant='caption' color='text.secondary'>
                    Daily Water Intake: {plan.waterIntake}ml
                  </Typography>
                </Box>
              )}

              {plan.supplements && plan.supplements.length > 0 && (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <SupplementIcon fontSize='small' color='secondary' />
                    <Typography
                      variant='caption'
                      color='text.secondary'
                      fontWeight='medium'
                    >
                      Supplements:
                    </Typography>
                  </Box>
                  {plan.supplements.map((supplement, index) => (
                    <Box key={index} sx={{ pl: 3, mb: 0.5 }}>
                      <Typography variant='caption' color='text.secondary'>
                        • {supplement.name} ({supplement.dosage}) -{' '}
                        {supplement.timing}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>

          {!showMealDetails && (plan.meals || []).length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {(plan.meals || []).slice(0, 2).map((meal, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getMealTypeIcon(meal.type)}
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 'medium', textTransform: 'capitalize' }}
                    >
                      {meal.type || 'Meal'} - {(meal.foods || []).length} items
                    </Typography>
                  </Box>
                  <Typography variant='caption' color='text.secondary'>
                    {meal.calories || 0} cal
                  </Typography>
                </Box>
              ))}
              {(plan.meals || []).length > 2 && (
                <Typography
                  variant='caption'
                  color='primary.main'
                  sx={{ fontStyle: 'italic', cursor: 'pointer' }}
                  onClick={toggleMealDetails}
                >
                  +{(plan.meals || []).length - 2} more meals... (click to
                  expand)
                </Typography>
              )}
            </Box>
          )}
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
              Created:{' '}
              {plan.createdAt
                ? new Date(plan.createdAt).toLocaleDateString()
                : 'Unknown'}
            </Typography>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
              {(plan.createdBy || 'U').charAt(0).toUpperCase()}
            </Avatar>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

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
