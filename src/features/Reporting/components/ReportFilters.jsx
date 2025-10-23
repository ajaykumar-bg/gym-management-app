import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useReporting } from '../context/ReportingContext';
import { TIME_PERIODS, REPORT_TYPES } from '../constants/reportingConstants';

const ReportFilters = () => {
  const { dialogs, closeDialog, filters, setFilters, resetFilters } =
    useReporting();

  const handleClose = () => {
    closeDialog('filters');
  };

  const handleFilterChange = (field, value) => {
    if (field === 'additionalFilters') {
      setFilters({
        additionalFilters: { ...filters.additionalFilters, ...value },
      });
    } else {
      setFilters({ [field]: value });
    }
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handleApplyFilters = () => {
    handleClose();
  };

  const timePeriodOptions = [
    { value: TIME_PERIODS.TODAY, label: 'Today' },
    { value: TIME_PERIODS.YESTERDAY, label: 'Yesterday' },
    { value: TIME_PERIODS.THIS_WEEK, label: 'This Week' },
    { value: TIME_PERIODS.LAST_WEEK, label: 'Last Week' },
    { value: TIME_PERIODS.THIS_MONTH, label: 'This Month' },
    { value: TIME_PERIODS.LAST_MONTH, label: 'Last Month' },
    { value: TIME_PERIODS.THIS_QUARTER, label: 'This Quarter' },
    { value: TIME_PERIODS.LAST_QUARTER, label: 'Last Quarter' },
    { value: TIME_PERIODS.THIS_YEAR, label: 'This Year' },
    { value: TIME_PERIODS.LAST_YEAR, label: 'Last Year' },
    { value: TIME_PERIODS.CUSTOM, label: 'Custom Range' },
  ];

  const reportTypeOptions = [
    { value: REPORT_TYPES.REGISTRATION, label: 'Registration Report' },
    { value: REPORT_TYPES.ATTENDANCE, label: 'Attendance Report' },
    { value: REPORT_TYPES.PAYMENT, label: 'Payment Report' },
    { value: REPORT_TYPES.TRAINER_PERFORMANCE, label: 'Trainer Performance' },
  ];

  // Get filter options based on report type
  const getAdditionalFilters = () => {
    switch (filters.reportType) {
      case REPORT_TYPES.REGISTRATION:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.additionalFilters.status || 'all'}
                  label='Status'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Status</MenuItem>
                  <MenuItem value='active'>Active</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='inactive'>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Membership Type</InputLabel>
                <Select
                  value={filters.additionalFilters.membershipType || 'all'}
                  label='Membership Type'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      membershipType: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Types</MenuItem>
                  <MenuItem value='Basic'>Basic</MenuItem>
                  <MenuItem value='Premium'>Premium</MenuItem>
                  <MenuItem value='VIP'>VIP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Referral Source</InputLabel>
                <Select
                  value={filters.additionalFilters.referralSource || 'all'}
                  label='Referral Source'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      referralSource: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Sources</MenuItem>
                  <MenuItem value='Social Media'>Social Media</MenuItem>
                  <MenuItem value='Friend Referral'>Friend Referral</MenuItem>
                  <MenuItem value='Google Ads'>Google Ads</MenuItem>
                  <MenuItem value='Walk-in'>Walk-in</MenuItem>
                  <MenuItem value='Website'>Website</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={filters.additionalFilters.gender || 'all'}
                  label='Gender'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      gender: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All</MenuItem>
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case REPORT_TYPES.ATTENDANCE:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Session Type</InputLabel>
                <Select
                  value={filters.additionalFilters.sessionType || 'all'}
                  label='Session Type'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      sessionType: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Types</MenuItem>
                  <MenuItem value='Cardio'>Cardio</MenuItem>
                  <MenuItem value='Weight Training'>Weight Training</MenuItem>
                  <MenuItem value='Yoga'>Yoga</MenuItem>
                  <MenuItem value='Cross Training'>Cross Training</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case REPORT_TYPES.PAYMENT:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={filters.additionalFilters.status || 'all'}
                  label='Payment Status'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Status</MenuItem>
                  <MenuItem value='completed'>Completed</MenuItem>
                  <MenuItem value='pending'>Pending</MenuItem>
                  <MenuItem value='failed'>Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={filters.additionalFilters.paymentMethod || 'all'}
                  label='Payment Method'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      paymentMethod: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Methods</MenuItem>
                  <MenuItem value='Credit Card'>Credit Card</MenuItem>
                  <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                  <MenuItem value='Cash'>Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case REPORT_TYPES.TRAINER_PERFORMANCE:
        return (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size='small'>
                <InputLabel>Specialization</InputLabel>
                <Select
                  value={filters.additionalFilters.specialization || 'all'}
                  label='Specialization'
                  onChange={(e) =>
                    handleFilterChange('additionalFilters', {
                      specialization: e.target.value,
                    })
                  }
                >
                  <MenuItem value='all'>All Specializations</MenuItem>
                  <MenuItem value='Personal Training'>
                    Personal Training
                  </MenuItem>
                  <MenuItem value='Yoga'>Yoga</MenuItem>
                  <MenuItem value='Weight Training'>Weight Training</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.timePeriod !== TIME_PERIODS.THIS_MONTH) count++;
    if (filters.customStartDate) count++;
    if (filters.customEndDate) count++;

    Object.values(filters.additionalFilters || {}).forEach((value) => {
      if (value && value !== 'all') count++;
    });

    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={dialogs.filters}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>Advanced Filters</DialogTitle>

        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {/* Report Type */}
            <Typography variant='h6' gutterBottom>
              Report Configuration
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={filters.reportType}
                    label='Report Type'
                    onChange={(e) =>
                      handleFilterChange('reportType', e.target.value)
                    }
                  >
                    {reportTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth size='small'>
                  <InputLabel>Time Period</InputLabel>
                  <Select
                    value={filters.timePeriod}
                    label='Time Period'
                    onChange={(e) =>
                      handleFilterChange('timePeriod', e.target.value)
                    }
                  >
                    {timePeriodOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Custom Date Range */}
            {filters.timePeriod === TIME_PERIODS.CUSTOM && (
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label='Start Date'
                    value={filters.customStartDate}
                    onChange={(date) =>
                      handleFilterChange('customStartDate', date)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label='End Date'
                    value={filters.customEndDate}
                    onChange={(date) =>
                      handleFilterChange('customEndDate', date)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'small',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            )}

            {/* Search */}
            <TextField
              label='Search'
              placeholder='Search in report data...'
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              fullWidth
              size='small'
              sx={{ mb: 3 }}
            />

            {/* Report-specific filters */}
            <Typography variant='h6' gutterBottom>
              Report-Specific Filters
            </Typography>

            <Box sx={{ mb: 3 }}>{getAdditionalFilters()}</Box>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle2' gutterBottom>
                  Active Filters ({activeFiltersCount})
                </Typography>
                <Stack direction='row' spacing={1} flexWrap='wrap'>
                  {filters.searchTerm && (
                    <Chip
                      label={`Search: ${filters.searchTerm}`}
                      onDelete={() => handleFilterChange('searchTerm', '')}
                      size='small'
                    />
                  )}
                  {filters.timePeriod !== TIME_PERIODS.THIS_MONTH && (
                    <Chip
                      label={`Period: ${
                        timePeriodOptions.find(
                          (o) => o.value === filters.timePeriod
                        )?.label
                      }`}
                      onDelete={() =>
                        handleFilterChange(
                          'timePeriod',
                          TIME_PERIODS.THIS_MONTH
                        )
                      }
                      size='small'
                    />
                  )}
                  {Object.entries(filters.additionalFilters || {}).map(
                    ([key, value]) =>
                      value && value !== 'all' ? (
                        <Chip
                          key={key}
                          label={`${key}: ${value}`}
                          onDelete={() =>
                            handleFilterChange('additionalFilters', {
                              [key]: 'all',
                            })
                          }
                          size='small'
                        />
                      ) : null
                  )}
                </Stack>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleResetFilters} color='inherit'>
            Reset All
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default ReportFilters;
