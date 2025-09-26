/**
 * Exercise Content Component
 * Displays exercise name, description, and metadata
 */

import React from 'react';
import { CardContent, Typography, Box } from '@mui/material';
import { formatExerciseName, truncateDescription } from '../../utils/exerciseUtils';
import { TOOLTIP_CONFIG } from '../../constants/ui.constants';
import ExerciseChips from './ExerciseChips';

/**
 * ExerciseContent component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {number} props.descriptionLength - Max description length
 * @param {boolean} props.showChips - Whether to show attribute chips
 * @returns {JSX.Element} ExerciseContent component
 */
const ExerciseContent = ({ 
  exercise, 
  descriptionLength = TOOLTIP_CONFIG.DESCRIPTION_MAX_LENGTH,
  showChips = true 
}) => {
  if (!exercise) {
    return null;
  }

  const formattedName = formatExerciseName(exercise.name);
  const truncatedDescription = truncateDescription(exercise.description, descriptionLength);

  return (
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Exercise Name */}
      <Typography 
        gutterBottom 
        variant="h5" 
        component="h2"
        sx={{
          fontWeight: 600,
          lineHeight: 1.3,
          mb: showChips ? 2 : 1,
        }}
      >
        {formattedName}
      </Typography>

      {/* Exercise Attribute Chips */}
      {showChips && (
        <ExerciseChips exercise={exercise} />
      )}

      {/* Exercise Description */}
      {truncatedDescription && (
        <Box sx={{ mt: 'auto' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {truncatedDescription}
          </Typography>
        </Box>
      )}

      {/* Exercise Instructions Count */}
      {exercise.instructions && Array.isArray(exercise.instructions) && exercise.instructions.length > 0 && (
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ mt: 1, fontStyle: 'italic' }}
        >
          {exercise.instructions.length} step{exercise.instructions.length !== 1 ? 's' : ''} to complete
        </Typography>
      )}
    </CardContent>
  );
};

export default React.memo(ExerciseContent);
