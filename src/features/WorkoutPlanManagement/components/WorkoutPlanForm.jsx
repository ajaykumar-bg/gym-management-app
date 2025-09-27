import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  FormHelperText,
} from '@mui/material';
import {
  WORKOUT_TYPES,
  DIFFICULTY_LEVELS,
  PLAN_STATUS,
} from '../workoutPlan.constants';
import { validateWorkoutPlan, generatePlanId } from '../workoutPlan.utils';

const WorkoutPlanForm = ({
  open,
  onClose,
  onSave,
  plan = null,
  trainerId = '1',
  trainerName = 'Current Trainer',
}) => {
  const [formData, setFormData] = useState(() => {
    if (plan) {
      return {
        name: plan.name,
        description: plan.description,
        type: plan.type,
        difficulty: plan.difficulty,
        duration: plan.duration,
        status: plan.status || 'draft',
        memberId: plan.memberId || '',
        memberName: plan.memberName || '',
        tags: plan.tags ? plan.tags.join(', ') : '',
      };
    }
    return {
      name: '',
      description: '',
      type: 'strength',
      difficulty: 'beginner',
      duration: 30,
      status: 'draft',
      memberId: '',
      memberName: '',
      tags: '',
    };
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate form data
    const validation = validateWorkoutPlan(formData);
    if (!validation.isValid) {
      const fieldErrors = {};
      validation.errors.forEach((error) => {
        if (error.includes('name')) fieldErrors.name = error;
        if (error.includes('type')) fieldErrors.type = error;
        if (error.includes('difficulty')) fieldErrors.difficulty = error;
        if (error.includes('Duration')) fieldErrors.duration = error;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Prepare plan data
    const planData = {
      ...formData,
      id: plan?.id || generatePlanId(),
      trainerId,
      trainerName,
      duration: parseInt(formData.duration),
      exercises: plan?.exercises || [],
      tags: formData.tags
        ? formData.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      createdDate: plan?.createdDate || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    try {
      await onSave(planData);
      handleClose();
    } catch (error) {
      console.error('Error saving workout plan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        description: '',
        type: 'strength',
        difficulty: 'beginner',
        duration: 30,
        status: 'draft',
        memberId: '',
        memberName: '',
        tags: '',
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { minHeight: '70vh' },
      }}
    >
      <DialogTitle>
        {plan ? 'Edit Workout Plan' : 'Create New Workout Plan'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' gutterBottom color='primary'>
                Basic Information
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Plan Name *'
                value={formData.name}
                onChange={handleInputChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                placeholder='e.g., Beginner Full Body Workout'
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label='Description'
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange('description')}
                placeholder='Describe the workout plan, its goals, and target audience...'
              />
            </Grid>

            {/* Plan Details */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                gutterBottom
                color='primary'
                sx={{ mt: 2 }}
              >
                Plan Details
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Workout Type *</InputLabel>
                <Select
                  value={formData.type}
                  label='Workout Type *'
                  onChange={handleInputChange('type')}
                >
                  {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth error={!!errors.difficulty}>
                <InputLabel>Difficulty Level *</InputLabel>
                <Select
                  value={formData.difficulty}
                  label='Difficulty Level *'
                  onChange={handleInputChange('difficulty')}
                >
                  {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {errors.difficulty && (
                  <FormHelperText>{errors.difficulty}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                fullWidth
                label='Duration (minutes) *'
                type='number'
                value={formData.duration}
                onChange={handleInputChange('duration')}
                error={!!errors.duration}
                helperText={errors.duration}
                inputProps={{ min: 5, max: 180 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label='Status'
                  onChange={handleInputChange('status')}
                >
                  {Object.entries(PLAN_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Tags'
                value={formData.tags}
                onChange={handleInputChange('tags')}
                placeholder='strength, beginner, full-body'
                helperText='Separate tags with commas'
              />
            </Grid>

            {/* Member Assignment */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                gutterBottom
                color='primary'
                sx={{ mt: 2 }}
              >
                Member Assignment
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Member Name'
                value={formData.memberName}
                onChange={handleInputChange('memberName')}
                placeholder='Assign to member (optional)'
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label='Member ID'
                value={formData.memberId}
                onChange={handleInputChange('memberId')}
                placeholder='Member ID (optional)'
              />
            </Grid>

            {/* Exercise Preview */}
            <Grid size={{ xs: 12 }}>
              <Typography
                variant='h6'
                gutterBottom
                color='primary'
                sx={{ mt: 2 }}
              >
                Exercises
              </Typography>
              <Box
                sx={{
                  p: 2,
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  textAlign: 'center',
                  minHeight: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.50',
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  {plan?.exercises?.length > 0
                    ? `${plan.exercises.length} exercises configured`
                    : 'Exercise management will be available after creating the plan'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={isSubmitting}
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : plan ? 'Update Plan' : 'Create Plan'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkoutPlanForm;
