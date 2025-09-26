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
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  TRAINER_SPECIALIZATIONS,
  TRAINER_STATUS,
  EXPERIENCE_LEVELS,
  AVAILABILITY_SLOTS,
} from '../constants';
import { validateTrainerData } from '../utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TrainerForm = ({ open, onClose, trainer = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: trainer?.name || '',
    email: trainer?.email || '',
    phone: trainer?.phone || '',
    dateOfBirth: trainer?.dateOfBirth || '',
    address: trainer?.address || '',
    emergencyContact: {
      name: trainer?.emergencyContact?.name || '',
      phone: trainer?.emergencyContact?.phone || '',
      relationship: trainer?.emergencyContact?.relationship || '',
    },
    hireDate: trainer?.hireDate || new Date().toISOString().split('T')[0],
    experience: trainer?.experience || 'junior',
    specializations: trainer?.specializations || [],
    status: trainer?.status || 'active',
    hourlyRate: trainer?.hourlyRate || '',
    maxClients: trainer?.maxClients || '',
    maxClientsPerDay: trainer?.maxClientsPerDay || '',
    availability: trainer?.availability || [],
    bio: trainer?.bio || '',
    socialMedia: {
      instagram: trainer?.socialMedia?.instagram || '',
      facebook: trainer?.socialMedia?.facebook || '',
      youtube: trainer?.socialMedia?.youtube || '',
      linkedin: trainer?.socialMedia?.linkedin || '',
    },
    certifications: trainer?.certifications || [],
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

  const handleSpecializationChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      specializations: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      availability: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = () => {
    const validationErrors = validateTrainerData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const trainerData = {
      ...formData,
      id: trainer?.id || Date.now().toString(),
      currentClients: trainer?.currentClients || 0,
      totalSessions: trainer?.totalSessions || 0,
      averageRating: trainer?.averageRating || 4.0,
      clientRetentionRate: trainer?.clientRetentionRate || 80,
      yearsAtGym: trainer?.yearsAtGym || 0,
      workSchedule: trainer?.workSchedule || {
        monday: ['09:00-17:00'],
        tuesday: ['09:00-17:00'],
        wednesday: ['09:00-17:00'],
        thursday: ['09:00-17:00'],
        friday: ['09:00-17:00'],
        saturday: ['rest'],
        sunday: ['rest'],
      },
    };

    onSave(trainerData);
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
      hireDate: new Date().toISOString().split('T')[0],
      experience: 'junior',
      specializations: [],
      status: 'active',
      hourlyRate: '',
      maxClients: '',
      maxClientsPerDay: '',
      availability: [],
      bio: '',
      socialMedia: { instagram: '', facebook: '', youtube: '', linkedin: '' },
      certifications: [],
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
      <DialogTitle>{trainer ? 'Edit Trainer' : 'Add New Trainer'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' color='primary' gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
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

            <Grid size={{ xs: 12, sm: 6 }}>
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

            <Grid size={{ xs: 12, sm: 6 }}>
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

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Date of Birth'
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
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
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Emergency Contact
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Contact Name'
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  handleChange('emergencyContact', e.target.value, 'name')
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Contact Phone'
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  handleChange('emergencyContact', e.target.value, 'phone')
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
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

            {/* Professional Information */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Professional Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Hire Date'
                type='date'
                value={formData.hireDate}
                onChange={(e) => handleChange('hireDate', e.target.value)}
                error={!!errors.hireDate}
                helperText={errors.hireDate}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Experience Level</InputLabel>
                <Select
                  value={formData.experience}
                  label='Experience Level'
                  onChange={(e) => handleChange('experience', e.target.value)}
                >
                  {Object.entries(EXPERIENCE_LEVELS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Specializations</InputLabel>
                <Select
                  multiple
                  value={formData.specializations}
                  onChange={handleSpecializationChange}
                  input={<OutlinedInput label='Specializations' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={TRAINER_SPECIALIZATIONS[value]}
                          size='small'
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  error={!!errors.specializations}
                >
                  {Object.entries(TRAINER_SPECIALIZATIONS).map(
                    ([key, value]) => (
                      <MenuItem key={key} value={key}>
                        <Checkbox
                          checked={formData.specializations.indexOf(key) > -1}
                        />
                        <ListItemText primary={value} />
                      </MenuItem>
                    )
                  )}
                </Select>
                {errors.specializations && (
                  <Typography variant='caption' color='error'>
                    {errors.specializations}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label='Status'
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  {Object.entries(TRAINER_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Capacity & Rates */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Capacity & Rates
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Hourly Rate ($)'
                type='number'
                value={formData.hourlyRate}
                onChange={(e) => handleChange('hourlyRate', e.target.value)}
                error={!!errors.hourlyRate}
                helperText={errors.hourlyRate}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Max Clients Total'
                type='number'
                value={formData.maxClients}
                onChange={(e) => handleChange('maxClients', e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Max Clients Per Day'
                type='number'
                value={formData.maxClientsPerDay}
                onChange={(e) =>
                  handleChange('maxClientsPerDay', e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Availability</InputLabel>
                <Select
                  multiple
                  value={formData.availability}
                  onChange={handleAvailabilityChange}
                  input={<OutlinedInput label='Availability' />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={AVAILABILITY_SLOTS[value]}
                          size='small'
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {Object.entries(AVAILABILITY_SLOTS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      <Checkbox
                        checked={formData.availability.indexOf(key) > -1}
                      />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Bio */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                color='primary'
                gutterBottom
                sx={{ mt: 2 }}
              >
                Bio & Social Media
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Bio'
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                placeholder='Tell us about your fitness journey and approach...'
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Instagram Handle'
                value={formData.socialMedia.instagram}
                onChange={(e) =>
                  handleChange('socialMedia', e.target.value, 'instagram')
                }
                placeholder='@username'
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Facebook Profile'
                value={formData.socialMedia.facebook}
                onChange={(e) =>
                  handleChange('socialMedia', e.target.value, 'facebook')
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='YouTube Channel'
                value={formData.socialMedia.youtube}
                onChange={(e) =>
                  handleChange('socialMedia', e.target.value, 'youtube')
                }
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='LinkedIn Profile'
                value={formData.socialMedia.linkedin}
                onChange={(e) =>
                  handleChange('socialMedia', e.target.value, 'linkedin')
                }
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          {trainer ? 'Update' : 'Create'} Trainer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrainerForm;
