/**
 * Food Database Filters Component
 * Provides search, category, subcategory, and sorting filters for the food database
 */

import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import {
  FOOD_CATEGORY_LABELS,
  FOOD_SUBCATEGORY_LABELS,
  SORT_OPTION_LABELS,
} from '../constants';

const FoodDatabaseFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  sortBy,
  setSortBy,
  availableSubcategories,
  clearFilters,
}) => {
  return (
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
  );
};

export default FoodDatabaseFilters;
