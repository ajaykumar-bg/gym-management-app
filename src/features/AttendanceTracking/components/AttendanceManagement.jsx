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
import { useAttendance } from '../context/AttendanceContext';
import AttendanceOverview from './AttendanceOverview';
import AttendanceRecords from './AttendanceRecords';
import CheckInDialog from './CheckInDialog';
import CheckOutDialog from './CheckOutDialog';
import AttendanceDetailsDialog from './AttendanceDetailsDialog';

const AttendanceManagement = () => {
  const { error, setError } = useAttendance();
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const tabContent = [
    { label: 'Overview', component: <AttendanceOverview /> },
    { label: 'Records', component: <AttendanceRecords /> },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Attendance Tracking
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Monitor member check-ins, track session durations, and analyze
          attendance patterns
        </Typography>
      </Box>

      {/* Main Content */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label='attendance tabs'
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
      <CheckInDialog />
      <CheckOutDialog />
      <AttendanceDetailsDialog />

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

export default AttendanceManagement;
