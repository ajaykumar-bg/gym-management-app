/**
 * WorkoutTemplates Component
 * Displays available workout templates for quick workout creation
 */

import React, { memo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Schedule as DurationIcon,
  FitnessCenter as ExerciseIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useWorkout } from '../context';
import { WORKOUT_CATEGORIES } from '../workout.constants';

const TemplateDetailsDialog = memo(({ open, template, onClose }) => {
  if (!template) return null;

  const getTotalExercises = (exercises) => {
    return (exercises || []).reduce(
      (total, req) => total + (req.count || 0),
      0
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'expert':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='h2'>
            {template.name}
          </Typography>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant='body1' color='text.secondary' paragraph>
            {template.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label={template.category} size='small' variant='outlined' />
            <Chip
              label={template.difficulty}
              size='small'
              color={getDifficultyColor(template.difficulty)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DurationIcon fontSize='small' color='action' />
              <Typography variant='body2'>
                Duration: {template.estimatedDuration} minutes
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ExerciseIcon fontSize='small' color='action' />
              <Typography variant='body2'>
                Total Exercises: ~{getTotalExercises(template.exercises)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
              Target Muscles:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(template.targetMuscles || []).map((muscle, index) => (
                <Chip
                  key={index}
                  label={muscle}
                  size='small'
                  variant='outlined'
                  color='primary'
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 2 }}>
          Exercise Breakdown:
        </Typography>

        <TableContainer component={Paper} variant='outlined'>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Exercise Type</TableCell>
                <TableCell align='center'>Count</TableCell>
                <TableCell>Target Muscles</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(template.exercises || []).map((exercise, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {exercise.type || 'Unknown'}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Chip
                      label={exercise.count || 0}
                      size='small'
                      color='primary'
                      variant='outlined'
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(exercise.muscles || []).map((muscle, muscleIndex) => (
                        <Chip
                          key={muscleIndex}
                          label={muscle}
                          size='small'
                          variant='outlined'
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='text.secondary'>
                      {exercise.notes || 'Standard execution'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {template.notes && (
          <Box sx={{ mt: 3 }}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
              Additional Notes:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {template.notes}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

TemplateDetailsDialog.displayName = 'TemplateDetailsDialog';

const TemplateCustomizationDialog = memo(
  ({ open, template, onClose, onConfirm }) => {
    const [customization, setCustomization] = useState({
      name: template?.name || '',
      difficulty: template?.difficulty || 'intermediate',
      estimatedDuration: template?.estimatedDuration || 60,
    });

    const handleChange = (field, value) => {
      setCustomization((prev) => ({ ...prev, [field]: value }));
    };

    const handleConfirm = () => {
      onConfirm(customization);
      onClose();
    };

    if (!template) return null;

    return (
      <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
        <DialogTitle>Customize Workout Template</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label='Workout Name'
              value={customization.name}
              onChange={(e) => handleChange('name', e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={customization.difficulty}
                label='Difficulty'
                onChange={(e) => handleChange('difficulty', e.target.value)}
              >
                <MenuItem value='beginner'>Beginner</MenuItem>
                <MenuItem value='intermediate'>Intermediate</MenuItem>
                <MenuItem value='expert'>Expert</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label='Estimated Duration (minutes)'
              type='number'
              value={customization.estimatedDuration}
              onChange={(e) =>
                handleChange(
                  'estimatedDuration',
                  parseInt(e.target.value) || 60
                )
              }
              inputProps={{ min: 15, max: 180 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant='contained'>
            Create Workout
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

TemplateCustomizationDialog.displayName = 'TemplateCustomizationDialog';

const TemplateCard = memo(({ template, onUseTemplate, onViewDetails }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'expert':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTotalExercises = (exercises) => {
    return (exercises || []).reduce(
      (total, req) => total + (req.count || 0),
      0
    );
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant='h6' component='h3' gutterBottom>
          {template.name}
        </Typography>

        <Typography variant='body2' color='text.secondary' paragraph>
          {template.description}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label={template.category} size='small' variant='outlined' />
          <Chip
            label={template.difficulty}
            size='small'
            color={getDifficultyColor(template.difficulty)}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DurationIcon fontSize='small' color='action' />
            <Typography variant='body2' color='text.secondary'>
              {template.estimatedDuration} min
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ExerciseIcon fontSize='small' color='action' />
            <Typography variant='body2' color='text.secondary'>
              ~{getTotalExercises(template.exercises)} exercises
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
            Target Muscles:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(template.targetMuscles || []).slice(0, 3).map((muscle, index) => (
              <Chip
                key={index}
                label={muscle}
                size='small'
                variant='outlined'
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {(template.targetMuscles || []).length > 3 && (
              <Chip
                label={`+${(template.targetMuscles || []).length - 3}`}
                size='small'
                variant='outlined'
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ gap: 1 }}>
        <Button
          size='small'
          variant='outlined'
          startIcon={<ViewIcon />}
          onClick={() => onViewDetails(template)}
          sx={{ flex: 1 }}
        >
          View
        </Button>
        <Button
          size='small'
          variant='contained'
          onClick={() => onUseTemplate(template)}
          sx={{ flex: 1 }}
        >
          Use Template
        </Button>
      </CardActions>
    </Card>
  );
});

TemplateCard.displayName = 'TemplateCard';

const WorkoutTemplates = memo(() => {
  const { templates, navigateToList, createWorkoutFromTemplate } = useWorkout();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCustomizationDialog, setShowCustomizationDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [viewTemplate, setViewTemplate] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setShowCustomizationDialog(true);
  };

  const handleViewDetails = (template) => {
    setViewTemplate(template);
    setShowDetailsDialog(true);
  };

  const handleConfirmCustomization = (customization) => {
    if (selectedTemplate) {
      createWorkoutFromTemplate(selectedTemplate.id, customization);
    }
    setSelectedTemplate(null);
  };

  const handleCloseCustomization = () => {
    setShowCustomizationDialog(false);
    setSelectedTemplate(null);
  };

  const handleCloseDetails = () => {
    setShowDetailsDialog(false);
    setViewTemplate(null);
  };

  const filteredTemplates = categoryFilter
    ? (templates || []).filter(
        (template) => template.category === categoryFilter
      )
    : templates || [];

  const categories = Object.values(WORKOUT_CATEGORIES);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={navigateToList} sx={{ mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant='h4' component='h1'>
          Workout Templates
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant='body1' color='text.secondary' paragraph>
          Choose from pre-designed workout templates to quickly create effective
          training sessions. Each template includes carefully selected exercises
          targeting specific muscle groups.
        </Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={categoryFilter}
            label='Filter by Category'
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value=''>All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TemplateCard
              template={template}
              onUseTemplate={handleUseTemplate}
              onViewDetails={handleViewDetails}
            />
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant='h6' color='text.secondary'>
            No templates found
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Try selecting a different category or clear the filter.
          </Typography>
        </Box>
      )}

      <TemplateCustomizationDialog
        open={showCustomizationDialog}
        template={selectedTemplate}
        onClose={handleCloseCustomization}
        onConfirm={handleConfirmCustomization}
      />

      <TemplateDetailsDialog
        open={showDetailsDialog}
        template={viewTemplate}
        onClose={handleCloseDetails}
      />
    </Box>
  );
});

WorkoutTemplates.displayName = 'WorkoutTemplates';

export default WorkoutTemplates;
