/**
 * Exercise Actions Component
 * Displays action buttons for the exercise card
 */

import React from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { 
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon 
} from '@mui/icons-material';

/**
 * ExerciseActions component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {Function} props.onViewDetails - Handler for view details action
 * @param {Function} props.onToggleFavorite - Handler for favorite toggle action
 * @param {Function} props.onShare - Handler for share action
 * @param {boolean} props.isFavorite - Whether exercise is favorited
 * @param {boolean} props.showFavorite - Whether to show favorite button
 * @param {boolean} props.showShare - Whether to show share button
 * @param {string} props.variant - Button variant ('contained', 'outlined', 'text')
 * @returns {JSX.Element} ExerciseActions component
 */
const ExerciseActions = ({ 
  exercise,
  onViewDetails,
  onToggleFavorite,
  onShare,
  isFavorite = false,
  showFavorite = false,
  showShare = false,
  variant = 'contained'
}) => {
  if (!exercise) {
    return null;
  }

  const handleViewDetails = () => {
    if (onViewDetails && typeof onViewDetails === 'function') {
      onViewDetails(exercise);
    }
  };

  const handleToggleFavorite = (event) => {
    event.stopPropagation();
    if (onToggleFavorite && typeof onToggleFavorite === 'function') {
      onToggleFavorite(exercise);
    }
  };

  const handleShare = (event) => {
    event.stopPropagation();
    if (onShare && typeof onShare === 'function') {
      onShare(exercise);
    }
  };

  return (
    <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* Main Action Button */}
      <Button
        variant={variant}
        fullWidth
        onClick={handleViewDetails}
        startIcon={<ViewIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        View Details
      </Button>

      {/* Additional Action Buttons */}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {/* Favorite Button */}
        {showFavorite && (
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              size="small"
              onClick={handleToggleFavorite}
              color={isFavorite ? 'error' : 'default'}
              sx={{
                '&:hover': {
                  backgroundColor: isFavorite ? 'error.light' : 'action.hover',
                  opacity: 0.1,
                }
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        )}

        {/* Share Button */}
        {showShare && (
          <Tooltip title="Share exercise">
            <IconButton
              size="small"
              onClick={handleShare}
              color="default"
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(ExerciseActions);
