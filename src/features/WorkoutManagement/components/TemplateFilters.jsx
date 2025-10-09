/**
 * TemplateFilters Component
 * Filter controls for workout templates
 */

import React, { memo } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { WORKOUT_CATEGORIES } from '../workout.constants';

const TemplateFilters = memo(({ categoryFilter, onCategoryChange }) => {
  const categories = Object.values(WORKOUT_CATEGORIES);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='body1' color='text.secondary' paragraph>
        Choose from pre-designed workout templates to quickly create effective
        training sessions. Each template includes carefully selected exercises
        targeting specific muscle groups.
      </Typography>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={categoryFilter}
          label='Filter by Category'
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value=''>All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

TemplateFilters.displayName = 'TemplateFilters';

export default TemplateFilters;
