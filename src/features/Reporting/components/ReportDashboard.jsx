import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Assessment as ReportIcon,
  PersonAdd as RegistrationIcon,
  AccessTime as AttendanceIcon,
  Payment as PaymentIcon,
  FitnessCenter as TrainerIcon,
  TrendingUp as TrendingIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useReporting } from '../context/ReportingContext';
import { REPORT_TYPES, TIME_PERIODS } from '../constants/reportingConstants';
import { formatCurrency, prepareChartData } from '../utils/reportingUtils';

const ReportDashboard = () => {
  const {
    filters,
    setFilters,
    reportSummary,
    reportData,
    currentReport,
    openDialog,
    reportTemplates,
    loading,
  } = useReporting();

  const handleReportTypeChange = (event) => {
    setFilters({ reportType: event.target.value });
  };

  const handleTimePeriodChange = (event) => {
    setFilters({ timePeriod: event.target.value });
  };

  const handleExportReport = () => {
    openDialog('export');
  };

  // Report type options
  const reportTypeOptions = [
    {
      value: REPORT_TYPES.REGISTRATION,
      label: 'Registration Report',
      icon: <RegistrationIcon />,
    },
    {
      value: REPORT_TYPES.ATTENDANCE,
      label: 'Attendance Report',
      icon: <AttendanceIcon />,
    },
    {
      value: REPORT_TYPES.PAYMENT,
      label: 'Payment Report',
      icon: <PaymentIcon />,
    },
    {
      value: REPORT_TYPES.TRAINER_PERFORMANCE,
      label: 'Trainer Performance',
      icon: <TrainerIcon />,
    },
  ];

  // Time period options
  const timePeriodOptions = [
    { value: TIME_PERIODS.TODAY, label: 'Today' },
    { value: TIME_PERIODS.THIS_WEEK, label: 'This Week' },
    { value: TIME_PERIODS.THIS_MONTH, label: 'This Month' },
    { value: TIME_PERIODS.THIS_QUARTER, label: 'This Quarter' },
    { value: TIME_PERIODS.THIS_YEAR, label: 'This Year' },
    { value: TIME_PERIODS.CUSTOM, label: 'Custom Range' },
  ];

  // Get current report config
  const currentReportConfig = reportTemplates[filters.reportType];

  // Prepare chart data
  const getChartData = (chartConfig) => {
    if (!reportData.length) return [];

    const { dataKey, type } = chartConfig;
    return prepareChartData(reportData, dataKey, null, type);
  };

  // Summary cards based on report type
  const getSummaryCards = () => {
    if (!reportSummary?.keyMetrics) return [];

    switch (filters.reportType) {
      case REPORT_TYPES.REGISTRATION:
        return [
          {
            title: 'Total Registrations',
            value: reportSummary.totalRecords,
            icon: <RegistrationIcon />,
            color: 'primary',
          },
          {
            title: 'Active Members',
            value: reportSummary.keyMetrics.activeMembers,
            icon: <TrendingIcon />,
            color: 'success',
          },
          {
            title: 'Pending Members',
            value: reportSummary.keyMetrics.pendingMembers,
            icon: <RegistrationIcon />,
            color: 'warning',
          },
          {
            title: 'Conversion Rate',
            value: `${reportSummary.keyMetrics.conversionRate}%`,
            icon: <TrendingIcon />,
            color: 'info',
          },
        ];

      case REPORT_TYPES.ATTENDANCE:
        return [
          {
            title: 'Total Sessions',
            value: reportSummary.keyMetrics.totalSessions,
            icon: <AttendanceIcon />,
            color: 'primary',
          },
          {
            title: 'Unique Members',
            value: reportSummary.keyMetrics.uniqueMembers,
            icon: <RegistrationIcon />,
            color: 'success',
          },
          {
            title: 'Avg Duration',
            value: `${reportSummary.keyMetrics.avgDuration}min`,
            icon: <AttendanceIcon />,
            color: 'info',
          },
          {
            title: 'Total Hours',
            value: reportSummary.keyMetrics.totalHours,
            icon: <TrendingIcon />,
            color: 'warning',
          },
        ];

      case REPORT_TYPES.PAYMENT:
        return [
          {
            title: 'Total Revenue',
            value: formatCurrency(reportSummary.keyMetrics.totalRevenue),
            icon: <PaymentIcon />,
            color: 'success',
          },
          {
            title: 'Pending Amount',
            value: formatCurrency(reportSummary.keyMetrics.pendingAmount),
            icon: <PaymentIcon />,
            color: 'warning',
          },
          {
            title: 'Completed Payments',
            value: reportSummary.keyMetrics.completedPayments,
            icon: <TrendingIcon />,
            color: 'primary',
          },
          {
            title: 'Pending Payments',
            value: reportSummary.keyMetrics.pendingPayments,
            icon: <PaymentIcon />,
            color: 'error',
          },
        ];

      default:
        return [];
    }
  };

  const summaryCards = getSummaryCards();

  return (
    <Box>
      {/* Report Controls */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={filters.reportType}
                label='Report Type'
                onChange={handleReportTypeChange}
              >
                {reportTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option.icon}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={filters.timePeriod}
                label='Time Period'
                onChange={handleTimePeriodChange}
              >
                {timePeriodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              variant='contained'
              startIcon={<DownloadIcon />}
              onClick={handleExportReport}
              disabled={!currentReport || loading}
              fullWidth
            >
              Export Report
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Report Header */}
      {currentReport && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <ReportIcon />
                </Avatar>
                <Box>
                  <Typography variant='h6'>
                    {currentReportConfig?.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {currentReportConfig?.description}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={`${reportData.length} Records`}
                color='primary'
                variant='outlined'
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      {summaryCards.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryCards.map((card, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: `${card.color}.light`,
                        color: `${card.color}.main`,
                      }}
                    >
                      {card.icon}
                    </Avatar>
                    <Box>
                      <Typography variant='h4' component='div'>
                        {card.value}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {card.title}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Charts */}
      {currentReportConfig?.charts && reportData.length > 0 && (
        <Grid container spacing={3}>
          {currentReportConfig.charts.map((chartConfig, index) => {
            const chartData = getChartData(chartConfig);

            if (!chartData.length) return null;

            return (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      {chartConfig.title}
                    </Typography>

                    <Box sx={{ height: 300 }}>
                      {chartConfig.type === 'bar' && (
                        <BarChart
                          dataset={chartData}
                          xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
                          series={[
                            { dataKey: 'value', label: chartConfig.title },
                          ]}
                          height={250}
                        />
                      )}

                      {chartConfig.type === 'pie' && (
                        <PieChart
                          series={[
                            {
                              data: chartData.map((item, idx) => ({
                                id: idx,
                                value: item.value,
                                label: item.label,
                              })),
                            },
                          ]}
                          height={250}
                        />
                      )}

                      {chartConfig.type === 'line' && (
                        <LineChart
                          dataset={chartData}
                          xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
                          series={[{ dataKey: 'y', label: chartConfig.title }]}
                          height={250}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* No Data State */}
      {reportData.length === 0 && !loading && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'grey.100' }}>
              <ReportIcon />
            </Avatar>
            <Typography variant='h6' gutterBottom>
              No Data Available
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              No data found for the selected report type and time period.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ReportDashboard;
