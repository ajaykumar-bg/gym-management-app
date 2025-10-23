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
  Autocomplete,
  Avatar,
  Chip,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAttendance } from '../context/AttendanceContext';
import { searchMembers } from '../utils/attendanceUtils';

const CheckInDialog = () => {
  const {
    dialogs,
    closeDialog,
    members,
    checkInMember,
    loading,
    selectedMember,
  } = useAttendance();

  const [formData, setFormData] = useState({
    memberId: selectedMember?.id || '',
    checkInTime: new Date(),
    notes: '',
  });
  const [memberSearch, setMemberSearch] = useState('');
  const [formErrors, setFormErrors] = useState({});

  React.useEffect(() => {
    if (selectedMember) {
      setFormData((prev) => ({ ...prev, memberId: selectedMember.id }));
    }
  }, [selectedMember]);

  const handleClose = () => {
    setFormData({
      memberId: '',
      checkInTime: new Date(),
      notes: '',
    });
    setMemberSearch('');
    setFormErrors({});
    closeDialog('checkIn');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    try {
      await checkInMember(formData);
      handleClose();
    } catch (error) {
      // Error handling is done in context
    }
  };

  const filteredMembers = searchMembers(members, memberSearch);
  const selectedMemberData = members.find((m) => m.id === formData.memberId);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={dialogs.checkIn}
        onClose={handleClose}
        maxWidth='sm'
        fullWidth
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Member Check-In</DialogTitle>

          <DialogContent>
            <Box sx={{ pt: 1 }}>
              {/* Member Selection */}
              <Autocomplete
                options={filteredMembers}
                getOptionLabel={(option) =>
                  `${option.name} (${option.membershipId})`
                }
                value={selectedMemberData || null}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    memberId: newValue?.id || '',
                  }));
                }}
                inputValue={memberSearch}
                onInputChange={(event, newInputValue) => {
                  setMemberSearch(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Select Member *'
                    placeholder='Search by name or ID...'
                    error={Boolean(formErrors.memberId)}
                    helperText={formErrors.memberId}
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <Box component='li' {...props}>
                    <Avatar
                      sx={{
                        mr: 2,
                        bgcolor: 'primary.light',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <PersonIcon fontSize='small' />
                    </Avatar>
                    <Box>
                      <Typography variant='subtitle2'>{option.name}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {option.membershipId} • {option.membershipType}
                      </Typography>
                    </Box>
                  </Box>
                )}
                sx={{ mb: 3 }}
              />

              {/* Selected Member Info */}
              {selectedMemberData && (
                <Box sx={{ mb: 3, p: 2, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant='h6'>
                        {selectedMemberData.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip
                          label={selectedMemberData.membershipId}
                          size='small'
                          variant='outlined'
                        />
                        <Chip
                          label={selectedMemberData.membershipType}
                          size='small'
                          color='primary'
                          variant='outlined'
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {selectedMemberData.email}
                  </Typography>
                </Box>
              )}

              {/* Check-in Time */}
              <DateTimePicker
                label='Check-In Time *'
                value={formData.checkInTime}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, checkInTime: date }))
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(formErrors.checkInTime),
                    helperText: formErrors.checkInTime,
                    sx: { mb: 3 },
                  },
                }}
              />

              {/* Notes */}
              <TextField
                label='Notes (Optional)'
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder='Any additional notes about the check-in...'
                fullWidth
              />
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={loading || !formData.memberId}
            >
              {loading ? 'Checking In...' : 'Check In'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CheckInDialog;
