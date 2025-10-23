import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Alert,
  Snackbar,
} from '@mui/material';
import { useReporting } from '../context/ReportingContext';
import ReportDashboard from './ReportDashboard';
import ReportList from './ReportList';
import ReportExport from './ReportExport';
import ReportFilters from './ReportFilters';

const ReportManagement = () => {
  const { error, setError } = useReporting();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const tabContent = [
    { label: 'Dashboard', component: <ReportDashboard /> },
    { label: 'Reports', component: <ReportList /> },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Reports & Analytics
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Generate comprehensive reports for registration, attendance, payments,
          and performance analysis
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label='reporting tabs'
          >
            {tabContent.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>{tabContent[currentTab]?.component}</Box>
      </Paper>

      {/* Dialogs */}
      <ReportExport />
      <ReportFilters />

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseError}
          severity='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReportManagement;
