import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAttendance } from '../context/AttendanceContext';
import {
  formatTime,
  calculateDuration,
  formatDuration,
} from '../utils/attendanceUtils';

const CheckOutDialog = () => {
  const { dialogs, closeDialog, selectedRecord, checkOutMember, loading } =
    useAttendance();

  const [formData, setFormData] = useState({
    checkOutTime: new Date(),
    notes: '',
  });
  const [formErrors, setFormErrors] = useState({});

  React.useEffect(() => {
    if (selectedRecord) {
      setFormData({
        checkOutTime: new Date(),
        notes: selectedRecord.notes || '',
      });
    }
  }, [selectedRecord]);

  const handleClose = () => {
    setFormData({
      checkOutTime: new Date(),
      notes: '',
    });
    setFormErrors({});
    closeDialog('checkOut');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    if (!selectedRecord) return;

    try {
      await checkOutMember(selectedRecord.id, formData);
      handleClose();
    } catch (error) {
      // Error handling is done in context
    }
  };

  if (!selectedRecord) return null;

  const currentDuration = calculateDuration(
    selectedRecord.checkInTime,
    formData.checkOutTime
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={dialogs.checkOut}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Member Check-Out</DialogTitle>

          <DialogContent>
            <Box sx={{ pt: 1 }}>
              {/* Member Info */}
              <Box sx={{ mb: 3, p: 2, borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant='h6'>
                      {selectedRecord.memberName}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip
                        label={selectedRecord.membershipId}
                        size='small'
                        variant='outlined'
                      />
                      <Chip
                        label='Active Session'
                        size='small'
                        color='success'
                        variant='filled'
                      />
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TimeIcon color='action' />
                  <Box>
                    <Typography variant='body2' color='text.secondary'>
                      Checked in at
                    </Typography>
                    <Typography variant='body1' fontWeight={500}>
                      {formatTime(selectedRecord.checkInTime)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Check-out Time */}
              <DateTimePicker
                label='Check-Out Time *'
                value={formData.checkOutTime}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, checkOutTime: date }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(formErrors.checkOutTime),
                    helperText: formErrors.checkOutTime,
                    sx: { mb: 2 },
                  },
                }}
              />

              {/* Session Duration Preview */}
              {currentDuration && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'info.light',
                    borderRadius: 1,
                    color: 'info.dark',
                  }}
                >
                  <Typography variant='body2' fontWeight={500}>
                    Session Duration: {formatDuration(currentDuration)}
                  </Typography>
                </Box>
              )}

              {/* Notes */}
              <TextField
                label='Notes (Optional)'
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder='Any additional notes about the session...'
                fullWidth
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type='submit' variant='contained' disabled={loading}>
              {loading ? 'Checking Out...' : 'Check Out'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CheckOutDialog;
