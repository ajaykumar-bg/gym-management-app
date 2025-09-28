/**
 * Diet Food Management Dashboard
 * Main dashboard component for managing food database
 */

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  LocalFireDepartment as CalorieIcon,
  FitnessCenter as ProteinIcon,
  Eco as VeganIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useDietFood } from '../context/DietFoodContext';
import {
  FOOD_CATEGORIES,
  FOOD_CATEGORY_LABELS,
  FOOD_CATEGORY_COLORS,
  DIETARY_TAGS,
} from '../constants';

const DietFoodDashboard = () => {
  const { allFoods, loading } = useDietFood();

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading food database...</Typography>
      </Box>
    );
  }

  // Calculate statistics
  const stats = {
    totalFoods: allFoods.length,
    activeRoods: allFoods.filter((food) => food.isActive).length,
    categories: Object.keys(FOOD_CATEGORIES).length,
    avgCalories: Math.round(
      allFoods.reduce((sum, food) => sum + food.nutritionPer100g.calories, 0) /
        allFoods.length
    ),
  };

  // Category distribution
  const categoryStats = Object.values(FOOD_CATEGORIES)
    .map((category) => {
      const count = allFoods.filter(
        (food) => food.category === category
      ).length;
      const avgCalories = Math.round(
        allFoods
          .filter((food) => food.category === category)
          .reduce((sum, food) => sum + food.nutritionPer100g.calories, 0) /
          count || 0
      );

      return {
        category,
        count,
        avgCalories,
        label: FOOD_CATEGORY_LABELS[category],
        color: FOOD_CATEGORY_COLORS[category],
      };
    })
    .filter((stat) => stat.count > 0);

  // Top dietary tags
  const dietaryTagStats = Object.values(DIETARY_TAGS)
    .map((tag) => {
      const count = allFoods.filter((food) =>
        food.dietaryTags.includes(tag)
      ).length;
      return { tag, count };
    })
    .filter((stat) => stat.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Food Database Dashboard
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Overview of your complete food database with nutritional information
        </Typography>
      </Box>

      {/* Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RestaurantIcon color='primary' sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant='h4' component='div'>
                    {stats.totalFoods}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Total Foods
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingIcon color='success' sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant='h4' component='div'>
                    {stats.activeRoods}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Active Foods
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VeganIcon color='secondary' sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant='h4' component='div'>
                    {stats.categories}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Categories
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CalorieIcon color='warning' sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant='h4' component='div'>
                    {stats.avgCalories}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Avg Calories/100g
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Category Breakdown */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Food Categories
              </Typography>
              <Grid container spacing={2}>
                {categoryStats.map((stat) => (
                  <Grid key={stat.category} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant='h6' component='div'>
                        {stat.count}
                      </Typography>
                      <Chip
                        label={stat.label}
                        color={stat.color}
                        size='small'
                        sx={{ mb: 1 }}
                      />
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                      >
                        Avg: {stat.avgCalories} cal/100g
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Popular Dietary Tags
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {dietaryTagStats.map((stat) => (
                  <Box
                    key={stat.tag}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant='body2'
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {stat.tag.replace('-', ' ')}
                    </Typography>
                    <Chip
                      label={stat.count}
                      size='small'
                      color='primary'
                      variant='outlined'
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Quick Stats
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <ProteinIcon color='error' sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant='h6'>
                  {
                    allFoods.filter(
                      (food) => food.nutritionPer100g.protein >= 15
                    ).length
                  }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  High Protein Foods (≥15g)
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <CalorieIcon color='success' sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant='h6'>
                  {
                    allFoods.filter(
                      (food) => food.nutritionPer100g.calories <= 50
                    ).length
                  }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Low Calorie Foods (≤50 cal)
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <VeganIcon color='success' sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant='h6'>
                  {
                    allFoods.filter((food) =>
                      food.dietaryTags.includes('vegan')
                    ).length
                  }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Vegan Options
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <RestaurantIcon color='primary' sx={{ fontSize: 32, mb: 1 }} />
                <Typography variant='h6'>
                  {
                    allFoods.filter((food) => food.allergens.length === 0)
                      .length
                  }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  Allergen-Free Foods
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DietFoodDashboard;
