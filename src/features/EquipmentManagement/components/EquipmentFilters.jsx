/**
 * Equipment Filters Component
 * Filter controls for equipment list
 */

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { EQUIPMENT_CATEGORIES, EQUIPMENT_STATUS } from '../equipment.constants';

const EquipmentFilters = ({
  filterCategory,
  filterStatus,
  onCategoryChange,
  onStatusChange,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <FormControl size='small' sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={filterCategory}
          label='Filter by Category'
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value='all'>All Categories</MenuItem>
          {Object.entries(EQUIPMENT_CATEGORIES).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ minWidth: 200 }}>
        <InputLabel>Filter by Status</InputLabel>
        <Select
          value={filterStatus}
          label='Filter by Status'
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value='all'>All Status</MenuItem>
          {Object.entries(EQUIPMENT_STATUS).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default React.memo(EquipmentFilters);
