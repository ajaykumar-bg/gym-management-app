/**
 * Diet Food List Component
 * Displays and manages the list of foods with filtering and search
 */

import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { useDietFood } from '../context/DietFoodContext';
import {
  FOOD_CATEGORY_LABELS,
  FOOD_SUBCATEGORY_LABELS,
  SORT_OPTION_LABELS,
} from '../constants';
import FoodCard from './FoodCard';

const DietFoodList = () => {
  const {
    foods,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    sortBy,
    setSortBy,
    availableSubcategories,
    openCreateModal,
    openEditModal,
    deleteFood,
    toggleFoodStatus,
    clearFilters,
  } = useDietFood();

  const handleCreateFood = () => {
    openCreateModal();
  };

  const handleEditFood = (food) => {
    openEditModal(food);
  };

  const handleDeleteFood = async (foodId) => {
    await deleteFood(foodId);
  };

  const handleToggleStatus = async (foodId) => {
    await toggleFoodStatus(foodId);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading foods...</Typography>
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
        }}
      >
        <Typography variant='h5' component='h1'>
          Food Database ({foods.length})
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleCreateFood}
          sx={{ minWidth: 140 }}
        >
          Add Food
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              placeholder='Search foods...'
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
          <Grid size={{ xs: 6, sm: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label='Category'
              >
                <MenuItem value='all'>All Categories</MenuItem>
                {Object.entries(FOOD_CATEGORY_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                label='Subcategory'
                disabled={selectedCategory === 'all'}
              >
                <MenuItem value='all'>All Subcategories</MenuItem>
                {availableSubcategories.map((subcategory) => (
                  <MenuItem key={subcategory} value={subcategory}>
                    {FOOD_SUBCATEGORY_LABELS[subcategory] || subcategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label='Sort By'
              >
                {Object.entries(SORT_OPTION_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <Button
              variant='outlined'
              startIcon={<FilterListIcon />}
              onClick={clearFilters}
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Foods Grid */}
      {foods.length === 0 ? (
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
            {searchTerm || selectedCategory !== 'all'
              ? 'No foods match your filters'
              : 'No foods found'}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your search criteria or filters'
              : 'Add your first food to get started'}
          </Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleCreateFood}
          >
            Add Food
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {foods.map((food) => (
            <Grid key={food.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
              <FoodCard
                food={food}
                onEdit={handleEditFood}
                onDelete={handleDeleteFood}
                onToggleStatus={handleToggleStatus}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DietFoodList;
