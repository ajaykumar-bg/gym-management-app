import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Alert,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Add, Remove, AttachMoney } from '@mui/icons-material';
import {
  MEMBERSHIP_TYPES,
  MEMBERSHIP_DURATIONS,
  PACKAGE_STATUS,
} from '../constants';
import { validatePackageData, generatePackageId } from '../utils';

const PackageForm = ({
  open,
  onClose,
  package: existingPackage = null,
  onSubmit,
  mode = 'create', // 'create' or 'edit'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    duration: '',
    price: '',
    features: [],
    status: 'active',
    maxMembers: '',
    discountPercentage: 0,
    autoRenewal: true,
  });

  const [newFeature, setNewFeature] = useState('');
  const [errors, setErrors] = useState({});
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (existingPackage && mode === 'edit') {
      setFormData({
        name: existingPackage.name || '',
        description: existingPackage.description || '',
        type: existingPackage.type || '',
        duration: existingPackage.duration || '',
        price: existingPackage.price?.toString() || '',
        features: existingPackage.features || [],
        status: existingPackage.status || 'active',
        maxMembers: existingPackage.maxMembers?.toString() || '',
        discountPercentage: existingPackage.discountPercentage || 0,
        autoRenewal:
          existingPackage.autoRenewal !== undefined
            ? existingPackage.autoRenewal
            : true,
      });
    } else {
      // Reset form for create mode
      setFormData({
        name: '',
        description: '',
        type: '',
        duration: '',
        price: '',
        features: [],
        status: 'active',
        maxMembers: '',
        discountPercentage: 0,
        autoRenewal: true,
      });
    }
    setErrors({});
    setValidationError('');
  }, [existingPackage, mode, open]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
    setValidationError('');
  };

  const handleSwitchChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Package name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.type) {
      newErrors.type = 'Membership type is required';
    }

    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    }

    if (
      !formData.price ||
      isNaN(parseFloat(formData.price)) ||
      parseFloat(formData.price) <= 0
    ) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.features.length === 0) {
      newErrors.features = 'At least one feature is required';
    }

    if (
      formData.maxMembers &&
      (isNaN(parseInt(formData.maxMembers)) ||
        parseInt(formData.maxMembers) <= 0)
    ) {
      newErrors.maxMembers = 'Max members must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      maxMembers: formData.maxMembers ? parseInt(formData.maxMembers) : null,
      discountPercentage: parseFloat(formData.discountPercentage) || 0,
    };

    // Validate package data using utility function
    const validationResult = validatePackageData(packageData);
    if (!validationResult.isValid) {
      setValidationError(validationResult.errors.join(', '));
      return;
    }

    if (mode === 'create') {
      packageData.id = generatePackageId();
      packageData.createdDate = new Date().toISOString();
    } else {
      packageData.id = existingPackage.id;
      packageData.createdDate = existingPackage.createdDate;
      packageData.updatedDate = new Date().toISOString();
    }

    onSubmit(packageData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addFeature();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      scroll='paper'
    >
      <DialogTitle>
        {mode === 'create' ? 'Create New Package' : 'Edit Package'}
      </DialogTitle>

      <DialogContent dividers>
        {validationError && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{ xs: 12 }}>
            <Typography variant='h6' gutterBottom>
              Basic Information
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Package Name'
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={handleInputChange('status')}
                label='Status'
              >
                {Object.entries(PACKAGE_STATUS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label='Description'
              value={formData.description}
              onChange={handleInputChange('description')}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={3}
              required
            />
          </Grid>

          {/* Membership Details */}
          <Grid size={{ xs: 12 }}>
            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
              Membership Details
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={!!errors.type} required>
              <InputLabel>Membership Type</InputLabel>
              <Select
                value={formData.type}
                onChange={handleInputChange('type')}
                label='Membership Type'
              >
                {Object.entries(MEMBERSHIP_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {errors.type && (
                <Typography variant='caption' color='error'>
                  {errors.type}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth error={!!errors.duration} required>
              <InputLabel>Duration</InputLabel>
              <Select
                value={formData.duration}
                onChange={handleInputChange('duration')}
                label='Duration'
              >
                {Object.entries(MEMBERSHIP_DURATIONS).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {errors.duration && (
                <Typography variant='caption' color='error'>
                  {errors.duration}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Pricing */}
          <Grid size={{ xs: 12 }}>
            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
              Pricing & Limits
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Price'
              value={formData.price}
              onChange={handleInputChange('price')}
              error={!!errors.price}
              helperText={errors.price}
              type='number'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AttachMoney />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Discount Percentage'
              value={formData.discountPercentage}
              onChange={handleInputChange('discountPercentage')}
              type='number'
              inputProps={{ min: 0, max: 100 }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label='Max Members (Optional)'
              value={formData.maxMembers}
              onChange={handleInputChange('maxMembers')}
              error={!!errors.maxMembers}
              helperText={errors.maxMembers || 'Leave empty for unlimited'}
              type='number'
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.autoRenewal}
                  onChange={handleSwitchChange('autoRenewal')}
                />
              }
              label='Auto Renewal'
            />
          </Grid>

          {/* Features */}
          <Grid size={{ xs: 12 }}>
            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
              Features
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label='Add Feature'
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Type a feature and press Enter'
              />
              <IconButton
                onClick={addFeature}
                disabled={!newFeature.trim()}
                color='primary'
              >
                <Add />
              </IconButton>
            </Box>

            {errors.features && (
              <Typography
                variant='caption'
                color='error'
                sx={{ mb: 1, display: 'block' }}
              >
                {errors.features}
              </Typography>
            )}

            {formData.features.length > 0 && (
              <List dense>
                {formData.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText primary={feature} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        onClick={() => removeFeature(feature)}
                        size='small'
                      >
                        <Remove />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            <Box sx={{ mt: 1 }}>
              {formData.features.map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  onDelete={() => removeFeature(feature)}
                  size='small'
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant='contained'>
          {mode === 'create' ? 'Create Package' : 'Update Package'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PackageForm;
