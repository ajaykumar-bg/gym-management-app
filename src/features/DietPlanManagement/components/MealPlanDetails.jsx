/**
 * Meal Plan Details Component
 * Displays comprehensive meal details for a diet plan
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FreeBreakfast as FreeBreakfastIcon,
  LunchDining as LunchIcon,
  DinnerDining as DinnerDiningIcon,
  Coffee as SnackIcon,
  Restaurant as RestaurantIcon,
  LocalDrink as WaterIcon,
  MedicalServices as SupplementIcon,
} from '@mui/icons-material';

const MealPlanDetails = ({ plan }) => {
  const [showMealDetails, setShowMealDetails] = useState(false);

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

  return (
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
                          <Typography variant='caption' color='text.secondary'>
                            {food.quantity}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant='caption' color='text.secondary'>
                            {food.calories}cal
                          </Typography>
                          {food.protein > 0 && (
                            <Typography variant='caption' color='success.main'>
                              P:{food.protein}g
                            </Typography>
                          )}
                          {food.carbs > 0 && (
                            <Typography variant='caption' color='warning.main'>
                              C:{food.carbs}g
                            </Typography>
                          )}
                          {food.fats > 0 && (
                            <Typography variant='caption' color='error.main'>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
              +{(plan.meals || []).length - 2} more meals... (click to expand)
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MealPlanDetails;
