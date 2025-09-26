import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { MEMBER_STATUS, MEMBERSHIP_TYPES } from '../constants';

const MemberForm = ({ open, onClose, member = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    dateOfBirth: member?.dateOfBirth || '',
    address: member?.address || '',
    emergencyContact: {
      name: member?.emergencyContact?.name || '',
      phone: member?.emergencyContact?.phone || '',
      relationship: member?.emergencyContact?.relationship || '',
    },
    membershipType: member?.membershipType || 'basic',
    status: member?.status || 'active',
    medicalConditions: member?.medicalConditions || '',
    fitnessGoals: member?.fitnessGoals || '',
    preferredWorkoutTime: member?.preferredWorkoutTime || 'morning',
    hasPersonalTrainer: member?.hasPersonalTrainer || false,
    personalTrainerId: member?.personalTrainerId || '',
    weight: member?.physicalInfo?.weight || '',
    height: member?.physicalInfo?.height || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value, nestedField = null) => {
    if (nestedField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [nestedField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = 'Date of birth is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const memberData = {
      ...formData,
      physicalInfo: {
        weight: formData.weight ? parseFloat(formData.weight) : null,
        height: formData.height ? parseFloat(formData.height) : null,
      },
      id: member?.id || Date.now().toString(),
      joinDate: member?.joinDate || new Date().toISOString().split('T')[0],
      lastVisit: member?.lastVisit || null,
      totalVisits: member?.totalVisits || 0,
    };

    onSave(memberData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: { name: '', phone: '', relationship: '' },
      membershipType: 'basic',
      status: 'active',
      medicalConditions: '',
      fitnessGoals: '',
      preferredWorkoutTime: 'morning',
      hasPersonalTrainer: false,
      personalTrainerId: '',
      weight: '',
      height: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>{member ? 'Edit Member' : 'Add New Member'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid xs={12}>
              <Typography variant='h6' color='primary' gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Full Name'
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone'
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Date of Birth'
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label='Address'
                multiline
                rows={2}
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Grid>

            {/* Emergency Contact */}
            <Grid xs={12}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Emergency Contact
              </Typography>
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label='Contact Name'
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  handleChange('emergencyContact', e.target.value, 'name')
                }
              />
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label='Contact Phone'
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  handleChange('emergencyContact', e.target.value, 'phone')
                }
              />
            </Grid>

            <Grid xs={12} sm={4}>
              <TextField
                fullWidth
                label='Relationship'
                value={formData.emergencyContact.relationship}
                onChange={(e) =>
                  handleChange(
                    'emergencyContact',
                    e.target.value,
                    'relationship'
                  )
                }
              />
            </Grid>

            {/* Membership Information */}
            <Grid xs={12}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Membership Information
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Membership Type</InputLabel>
                <Select
                  value={formData.membershipType}
                  label='Membership Type'
                  onChange={(e) =>
                    handleChange('membershipType', e.target.value)
                  }
                >
                  {Object.entries(MEMBERSHIP_TYPES).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label='Status'
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {Object.entries(MEMBER_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Physical Information */}
            <Grid xs={12}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Physical Information
              </Typography>
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Weight (kg)'
                type='number'
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label='Height (cm)'
                type='number'
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
              />
            </Grid>

            {/* Additional Information */}
            <Grid xs={12}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Additional Information
              </Typography>
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label='Medical Conditions'
                multiline
                rows={2}
                value={formData.medicalConditions}
                onChange={(e) =>
                  handleChange('medicalConditions', e.target.value)
                }
                placeholder='Any medical conditions or injuries to be aware of...'
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                fullWidth
                label='Fitness Goals'
                multiline
                rows={2}
                value={formData.fitnessGoals}
                onChange={(e) => handleChange('fitnessGoals', e.target.value)}
                placeholder='Weight loss, muscle gain, general fitness, etc...'
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Preferred Workout Time</InputLabel>
                <Select
                  value={formData.preferredWorkoutTime}
                  label='Preferred Workout Time'
                  onChange={(e) =>
                    handleChange('preferredWorkoutTime', e.target.value)
                  }
                >
                  <MenuItem value='morning'>Morning (6AM - 12PM)</MenuItem>
                  <MenuItem value='afternoon'>Afternoon (12PM - 6PM)</MenuItem>
                  <MenuItem value='evening'>Evening (6PM - 10PM)</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.hasPersonalTrainer}
                    onChange={(e) =>
                      handleChange('hasPersonalTrainer', e.target.checked)
                    }
                  />
                }
                label='Has Personal Trainer'
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          {member ? 'Update' : 'Create'} Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberForm;
