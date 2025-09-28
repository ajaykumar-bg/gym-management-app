/**
 * Diet Plan Card Component
 * Individual card component for displaying diet plan details
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Restaurant as RestaurantIcon,
  AccessTime as AccessTimeIcon,
  LocalFireDepartment as CalorieIcon,
} from '@mui/icons-material';
import {
  DIET_PLAN_TYPE_LABELS,
  DIET_GOAL_LABELS,
  DIET_PLAN_STATUS_COLORS,
  DIET_PLAN_TYPE_COLORS,
} from '../constants';
import MealPlanDetails from './MealPlanDetails';

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
        <MealPlanDetails plan={plan} />

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

export default DietPlanCard;
