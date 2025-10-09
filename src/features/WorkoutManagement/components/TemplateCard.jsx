/**
 * TemplateCard Component
 * Card component for displaying workout template information
 */

import React, { memo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import {
  Schedule as DurationIcon,
  FitnessCenter as ExerciseIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

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

export default TemplateCard;
