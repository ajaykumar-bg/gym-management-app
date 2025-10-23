import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Schedule as DurationIcon,
  CalendarToday as CalendarIcon,
  Note as NoteIcon,
} from '@mui/icons-material';
import { useAttendance } from '../context/AttendanceContext';
import {
  formatTime,
  formatDuration,
  getRelativeDateLabel,
} from '../utils/attendanceUtils';
import { ATTENDANCE_STATUS } from '../constants/attendanceConstants';

const AttendanceDetailsDialog = () => {
  const { dialogs, closeDialog, selectedRecord } = useAttendance();

  const handleClose = () => {
    closeDialog('viewDetails');
  };

  if (!selectedRecord) return null;

  const getStatusChip = (status) => {
    const statusConfig = {
      [ATTENDANCE_STATUS.CHECKED_IN]: {
        label: 'Active Session',
        color: 'success',
        variant: 'filled',
      },
      [ATTENDANCE_STATUS.COMPLETED]: {
        label: 'Completed',
        color: 'primary',
        variant: 'outlined',
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: 'default',
      variant: 'outlined',
    };

    return (
      <Chip
        label={config.label}
        color={config.color}
        variant={config.variant}
        size='small'
      />
    );
  };

  const infoItems = [
    {
      icon: <CalendarIcon />,
      label: 'Date',
      value: getRelativeDateLabel(selectedRecord.date),
    },
    {
      icon: <TimeIcon />,
      label: 'Check-In Time',
      value: formatTime(selectedRecord.checkInTime),
    },
    {
      icon: <TimeIcon />,
      label: 'Check-Out Time',
      value: selectedRecord.checkOutTime
        ? formatTime(selectedRecord.checkOutTime)
        : 'Still active',
    },
    {
      icon: <DurationIcon />,
      label: 'Session Duration',
      value: formatDuration(selectedRecord.duration),
    },
  ];

  return (
    <Dialog
      open={dialogs.viewDetails}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
    >
      <DialogTitle>Attendance Details</DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Member Header */}
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ mr: 3, bgcolor: 'primary.light', width: 56, height: 56 }}
              >
                <PersonIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h5' gutterBottom>
                  {selectedRecord.memberName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip
                    label={selectedRecord.membershipId}
                    variant='outlined'
                    size='small'
                  />
                  {getStatusChip(selectedRecord.status)}
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Attendance Information */}
          <Grid container spacing={3}>
            {infoItems.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 2,
                      bgcolor: 'primary.light',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      {item.label}
                    </Typography>
                    <Typography variant='body1' fontWeight={500}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Notes Section */}
          {selectedRecord.notes && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NoteIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant='h6'>Notes</Typography>
                </Box>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant='body1'>
                    {selectedRecord.notes}
                  </Typography>
                </Paper>
              </Box>
            </>
          )}

          {/* Session Summary */}
          <Divider sx={{ my: 3 }} />
          <Box>
            <Typography variant='h6' gutterBottom>
              Session Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant='h4' color='primary.main'>
                    {formatTime(selectedRecord.checkInTime)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Check-In
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography
                    variant='h4'
                    color={
                      selectedRecord.checkOutTime
                        ? 'success.main'
                        : 'warning.main'
                    }
                  >
                    {selectedRecord.checkOutTime
                      ? formatTime(selectedRecord.checkOutTime)
                      : 'Active'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Check-Out
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant='h4' color='info.main'>
                    {formatDuration(selectedRecord.duration)}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Duration
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant='contained'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceDetailsDialog;
