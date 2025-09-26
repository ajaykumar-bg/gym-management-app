/**
 * Exercise Card Image Component
 * Displays the exercise image with lazy loading and error handling
 */

import React, { useState } from 'react';
import { CardMedia, Box, CircularProgress } from '@mui/material';
import { CARD_CONFIG } from '../../constants/ui.constants';
import { getPrimaryImage } from '../../utils/exerciseUtils';

/**
 * ExerciseImage component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {string} props.alt - Alt text for image
 * @param {number|string} props.height - Image height (default: 200)
 * @returns {JSX.Element} ExerciseImage component
 */
const ExerciseImage = ({ exercise, alt, height = CARD_CONFIG.IMAGE_HEIGHT }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imageUrl = getPrimaryImage(exercise);
  const altText = alt || exercise?.name || 'Exercise image';

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <Box
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.100',
          color: 'text.secondary',
        }}
      >
        No image available
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.50',
            zIndex: 1,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      
      <CardMedia
        component="img"
        height={height}
        image={imageUrl}
        alt={altText}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        sx={{
          objectFit: 'cover',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </Box>
  );
};

export default React.memo(ExerciseImage);
