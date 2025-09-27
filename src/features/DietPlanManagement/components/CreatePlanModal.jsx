/**
 * Create Diet Plan Modal Component
 * Modal for creating new diet plans
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import {
  DIET_PLAN_TYPES,
  DIET_GOALS,
  MEAL_TYPES,
  DIET_PLAN_TYPE_LABELS,
  DIET_GOAL_LABELS,
} from '../constants';

const MealForm = ({ meal, index, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange(index, {
      ...meal,
      [field]: value,
    });
  };

  const handleMacroChange = (macro, value) => {
    onChange(index, {
      ...meal,
      macros: {
        ...meal.macros,
        [macro]: parseFloat(value) || 0,
      },
    });
  };

  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='subtitle1' fontWeight='medium'>
            Meal {index + 1}
          </Typography>
          <IconButton
            onClick={() => onRemove(index)}
            color='error'
            size='small'
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label='Meal Name'
              value={meal.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required>
              <InputLabel>Meal Type</InputLabel>
              <Select
                value={meal.type}
                onChange={(e) => handleChange('type', e.target.value)}
                label='Meal Type'
              >
                {MEAL_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label='Description'
              value={meal.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={2}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label='Calories'
              type='number'
              value={meal.calories}
              onChange={(e) =>
                handleChange('calories', parseInt(e.target.value) || 0)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>kcal</InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label='Protein'
              type='number'
              value={meal.macros.protein}
              onChange={(e) => handleMacroChange('protein', e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>g</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label='Carbs'
              type='number'
              value={meal.macros.carbs}
              onChange={(e) => handleMacroChange('carbs', e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>g</InputAdornment>,
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              fullWidth
              label='Fats'
              type='number'
              value={meal.macros.fats}
              onChange={(e) => handleMacroChange('fats', e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position='end'>g</InputAdornment>,
              }}
              required
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const CreatePlanModal = ({ open, onClose }) => {
  const { createDietPlan } = useDietPlan();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    goals: [],
    duration: 30,
    meals: [
      {
        name: '',
        type: 'breakfast',
        description: '',
        calories: 0,
        macros: { protein: 0, carbs: 0, fats: 0 },
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleMealChange = (index, meal) => {
    setFormData((prev) => ({
      ...prev,
      meals: prev.meals.map((m, i) => (i === index ? meal : m)),
    }));
  };

  const handleAddMeal = () => {
    setFormData((prev) => ({
      ...prev,
      meals: [
        ...prev.meals,
        {
          name: '',
          type: 'lunch',
          description: '',
          calories: 0,
          macros: { protein: 0, carbs: 0, fats: 0 },
        },
      ],
    }));
  };

  const handleRemoveMeal = (index) => {
    if (formData.meals.length > 1) {
      setFormData((prev) => ({
        ...prev,
        meals: prev.meals.filter((_, i) => i !== index),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Plan name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Plan type is required';
    }

    if (formData.goals.length === 0) {
      newErrors.goals = 'At least one goal is required';
    }

    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be positive';
    }

    // Validate meals
    formData.meals.forEach((meal, index) => {
      if (!meal.name.trim()) {
        newErrors[`meal_${index}_name`] = 'Meal name is required';
      }
      if (meal.calories <= 0) {
        newErrors[`meal_${index}_calories`] = 'Calories must be positive';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      createDietPlan(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      type: '',
      goals: [],
      duration: 30,
      meals: [
        {
          name: '',
          type: 'breakfast',
          description: '',
          calories: 0,
          macros: { protein: 0, carbs: 0, fats: 0 },
        },
      ],
    });
    setErrors({});
    onClose();
  };

  const totalCalories = formData.meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );
  const totalMacros = formData.meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.macros.protein,
      carbs: acc.carbs + meal.macros.carbs,
      fats: acc.fats + meal.macros.fats,
    }),
    { protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { height: '90vh' },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon />
            <Typography variant='h6' component='span'>
              Create New Diet Plan
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* Basic Information */}
        <Typography variant='h6' gutterBottom>
          Basic Information
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <TextField
              fullWidth
              label='Plan Name'
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              label='Duration'
              type='number'
              value={formData.duration}
              onChange={(e) =>
                handleChange('duration', parseInt(e.target.value) || 0)
              }
              error={!!errors.duration}
              helperText={errors.duration}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>days</InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label='Description'
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={3}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required error={!!errors.type}>
              <InputLabel>Plan Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                label='Plan Type'
              >
                {DIET_PLAN_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {DIET_PLAN_TYPE_LABELS[type]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                Goals {errors.goals && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {DIET_GOALS.map((goal) => (
                  <Chip
                    key={goal}
                    label={DIET_GOAL_LABELS[goal]}
                    color={
                      formData.goals.includes(goal) ? 'primary' : 'default'
                    }
                    onClick={() => handleGoalToggle(goal)}
                    variant={
                      formData.goals.includes(goal) ? 'filled' : 'outlined'
                    }
                  />
                ))}
              </Box>
              {errors.goals && (
                <Typography
                  variant='caption'
                  color='error'
                  sx={{ mt: 1, display: 'block' }}
                >
                  {errors.goals}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Meals Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h6'>Meals ({formData.meals.length})</Typography>
          <Button
            variant='outlined'
            startIcon={<AddIcon />}
            onClick={handleAddMeal}
            size='small'
          >
            Add Meal
          </Button>
        </Box>

        {formData.meals.map((meal, index) => (
          <MealForm
            key={index}
            meal={meal}
            index={index}
            onChange={handleMealChange}
            onRemove={handleRemoveMeal}
          />
        ))}

        {/* Nutrition Summary */}
        <Card variant='outlined' sx={{ mt: 2, bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant='subtitle1' fontWeight='medium' gutterBottom>
              Daily Nutrition Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='h5'
                    color='primary.main'
                    fontWeight='bold'
                  >
                    {totalCalories}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Total Calories
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='h6'
                    color='success.main'
                    fontWeight='bold'
                  >
                    {totalMacros.protein}g
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Protein
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='h6'
                    color='warning.main'
                    fontWeight='bold'
                  >
                    {totalMacros.carbs}g
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Carbs
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' color='error.main' fontWeight='bold'>
                    {totalMacros.fats}g
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Fats
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={formData.meals.length === 0}
        >
          Create Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePlanModal;
