/**
 * Exercise Detail Content Component
 * Displays the main content section with description and basic exercise information
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

/**
 * ExerciseDetailContent component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object containing details
 * @param {boolean} props.showExpandableDescription - Whether description can be collapsed/expanded
 * @param {number} props.maxDescriptionLength - Max characters before truncation
 * @param {boolean} props.showMetadata - Whether to show exercise metadata section
 * @returns {JSX.Element} ExerciseDetailContent component
 */
const ExerciseDetailContent = ({
  exercise,
  showExpandableDescription = true,
  maxDescriptionLength = 300,
  showMetadata = true,
}) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  if (!exercise) {
    return null;
  }

  const hasDescription = exercise.description && exercise.description.trim();
  const description = exercise.description?.trim() || '';
  const shouldTruncate =
    showExpandableDescription && description.length > maxDescriptionLength;
  const truncatedDescription = shouldTruncate
    ? description.substring(0, maxDescriptionLength) + '...'
    : description;

  const displayDescription =
    descriptionExpanded || !shouldTruncate ? description : truncatedDescription;

  // Exercise basic info for metadata section
  const exerciseMetadata = [
    { label: 'Category', value: exercise.category },
    { label: 'Target', value: exercise.target },
    { label: 'Body Part', value: exercise.bodyPart },
    { label: 'Equipment', value: exercise.equipment },
    { label: 'Level', value: exercise.level || exercise.difficulty },
  ].filter((item) => item.value && item.value !== 'None');

  return (
    <Box sx={{ py: 2 }}>
      {/* Exercise Name */}
      <Typography
        variant='h4'
        component='h1'
        gutterBottom
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 2,
        }}
      >
        {exercise.name}
      </Typography>

      {/* Quick Info Chips */}
      {showMetadata && exerciseMetadata.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {exerciseMetadata.slice(0, 4).map((item, index) => (
            <Chip
              key={index}
              label={`${item.label}: ${item.value}`}
              variant='outlined'
              size='small'
              sx={{
                backgroundColor: 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            />
          ))}
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Description Section */}
      {hasDescription ? (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <InfoIcon color='action' fontSize='small' />
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              About This Exercise
            </Typography>
            {shouldTruncate && (
              <IconButton
                size='small'
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                sx={{ ml: 'auto' }}
              >
                {descriptionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </Box>

          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              whiteSpace: 'pre-line',
            }}
          >
            {displayDescription}
          </Typography>

          {shouldTruncate && !descriptionExpanded && (
            <Typography
              variant='body2'
              color='primary'
              sx={{
                mt: 1,
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': {
                  color: 'primary.dark',
                },
              }}
              onClick={() => setDescriptionExpanded(true)}
            >
              Read more
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
            About This Exercise
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ fontStyle: 'italic' }}
          >
            No description available for this exercise.
          </Typography>
        </Box>
      )}

      {/* Detailed Metadata Card */}
      {showMetadata && exerciseMetadata.length > 0 && (
        <Card
          variant='outlined'
          sx={{
            mb: 3,
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ pb: '16px !important' }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Exercise Details
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr',
                },
                gap: 2,
              }}
            >
              {exerciseMetadata.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      mt: 0.5,
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Additional Notes */}
      {exercise.notes && (
        <Box sx={{ mb: 3 }}>
          <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
            Notes
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              backgroundColor: 'warning.light',
              color: 'warning.contrastText',
              p: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.main',
              whiteSpace: 'pre-line',
            }}
          >
            {exercise.notes}
          </Typography>
        </Box>
      )}

      {/* Safety Tips */}
      {exercise.safety && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='h6'
            gutterBottom
            sx={{ fontWeight: 600, color: 'error.main' }}
          >
            Safety & Precautions
          </Typography>
          <Typography
            variant='body2'
            sx={{
              backgroundColor: 'error.light',
              color: 'error.contrastText',
              p: 2,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'error.main',
              whiteSpace: 'pre-line',
            }}
          >
            {exercise.safety}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ExerciseDetailContent);
