import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Clear as ClearIcon } from '@mui/icons-material';
import { useAttendance } from '../context/AttendanceContext';
import {
  TIME_PERIODS,
  ATTENDANCE_STATUS,
} from '../constants/attendanceConstants';

const AttendanceFilters = () => {
  const { filters, setFilters, resetFilters } = useAttendance();

  const handleFilterChange = (field, value) => {
    setFilters({ [field]: value });
  };

  const timePeriodOptions = [
    { value: TIME_PERIODS.TODAY, label: 'Today' },
    { value: TIME_PERIODS.YESTERDAY, label: 'Yesterday' },
    { value: TIME_PERIODS.THIS_WEEK, label: 'This Week' },
    { value: TIME_PERIODS.LAST_WEEK, label: 'Last Week' },
    { value: TIME_PERIODS.THIS_MONTH, label: 'This Month' },
    { value: TIME_PERIODS.LAST_MONTH, label: 'Last Month' },
    { value: TIME_PERIODS.CUSTOM, label: 'Custom Range' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: ATTENDANCE_STATUS.CHECKED_IN, label: 'Active' },
    { value: ATTENDANCE_STATUS.COMPLETED, label: 'Completed' },
  ];

  const activeFiltersCount = [
    filters.memberSearch,
    filters.status !== 'all',
    filters.timePeriod !== TIME_PERIODS.TODAY,
    filters.customStartDate,
    filters.customEndDate,
  ].filter(Boolean).length;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 2 }}>
        <Stack direction='row' spacing={2} alignItems='center' flexWrap='wrap'>
          {/* Member Search */}
          <TextField
            label='Search Member'
            placeholder='Name or ID...'
            value={filters.memberSearch}
            onChange={(e) => handleFilterChange('memberSearch', e.target.value)}
            size='small'
            sx={{ minWidth: 200 }}
          />

          {/* Time Period Filter */}
          <FormControl size='small' sx={{ minWidth: 150 }}>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={filters.timePeriod}
              label='Time Period'
              onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
            >
              {timePeriodOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Custom Date Range */}
          {filters.timePeriod === TIME_PERIODS.CUSTOM && (
            <>
              <DatePicker
                label='Start Date'
                value={filters.customStartDate}
                onChange={(date) => handleFilterChange('customStartDate', date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { minWidth: 150 },
                  },
                }}
              />
              <DatePicker
                label='End Date'
                value={filters.customEndDate}
                onChange={(date) => handleFilterChange('customEndDate', date)}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: { minWidth: 150 },
                  },
                }}
              />
            </>
          )}

          {/* Status Filter */}
          <FormControl size='small' sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label='Status'
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <Button
              variant='outlined'
              startIcon={<ClearIcon />}
              onClick={resetFilters}
              size='small'
            >
              Clear ({activeFiltersCount})
            </Button>
          )}
        </Stack>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <Box sx={{ mt: 2 }}>
            <Stack direction='row' spacing={1} flexWrap='wrap'>
              {filters.memberSearch && (
                <Chip
                  label={`Search: ${filters.memberSearch}`}
                  onDelete={() => handleFilterChange('memberSearch', '')}
                  size='small'
                />
              )}
              {filters.status !== 'all' && (
                <Chip
                  label={`Status: ${
                    statusOptions.find((o) => o.value === filters.status)?.label
                  }`}
                  onDelete={() => handleFilterChange('status', 'all')}
                  size='small'
                />
              )}
              {filters.timePeriod !== TIME_PERIODS.TODAY && (
                <Chip
                  label={`Period: ${
                    timePeriodOptions.find(
                      (o) => o.value === filters.timePeriod
                    )?.label
                  }`}
                  onDelete={() =>
                    handleFilterChange('timePeriod', TIME_PERIODS.TODAY)
                  }
                  size='small'
                />
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default AttendanceFilters;
