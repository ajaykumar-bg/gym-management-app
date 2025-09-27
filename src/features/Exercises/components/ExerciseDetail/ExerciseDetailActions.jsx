/**
 * Exercise Detail Actions Component
 * Contains action buttons and controls for the exercise detail view
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Chip,
  Divider,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Schedule as ScheduleIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Edit as EditIcon,
  Report as ReportIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

/**
 * ExerciseDetailActions component
 * @param {Object} props - Component props
 * @param {Object} props.exercise - Exercise object
 * @param {Function} props.onAddToWorkout - Handler for adding exercise to workout
 * @param {Function} props.onToggleFavorite - Handler for toggling favorite status
 * @param {Function} props.onShare - Handler for sharing exercise
 * @param {Function} props.onSchedule - Handler for scheduling exercise
 * @param {Function} props.onBookmark - Handler for bookmarking exercise
 * @param {Function} props.onEdit - Handler for editing exercise (admin only)
 * @param {Function} props.onReport - Handler for reporting exercise
 * @param {boolean} props.isFavorite - Whether exercise is favorited
 * @param {boolean} props.isBookmarked - Whether exercise is bookmarked
 * @param {boolean} props.canEdit - Whether user can edit this exercise
 * @param {boolean} props.showSecondaryActions - Whether to show secondary action menu
 * @param {string} props.size - Size of buttons ('small', 'medium', 'large')
 * @param {string} props.variant - Button variant ('contained', 'outlined', 'text')
 * @returns {JSX.Element} ExerciseDetailActions component
 */
const ExerciseDetailActions = ({
  exercise,
  onAddToWorkout,
  onToggleFavorite,
  onShare,
  onSchedule,
  onBookmark,
  onEdit,
  onReport,
  isFavorite = false,
  isBookmarked = false,
  canEdit = false,
  showSecondaryActions = true,
  size = 'medium',
  variant = 'contained',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  if (!exercise) {
    return null;
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleShareMenuOpen = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareMenuClose = () => {
    setShareAnchorEl(null);
  };

  const handleAddToWorkout = () => {
    onAddToWorkout?.(exercise);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(exercise, !isFavorite);
  };

  const handleShare = (shareType) => {
    onShare?.(exercise, shareType);
    handleShareMenuClose();
  };

  const handleSchedule = () => {
    onSchedule?.(exercise);
    handleMenuClose();
  };

  const handleBookmark = () => {
    onBookmark?.(exercise, !isBookmarked);
    handleMenuClose();
  };

  const handleEdit = () => {
    onEdit?.(exercise);
    handleMenuClose();
  };

  const handleReport = () => {
    onReport?.(exercise);
    handleMenuClose();
  };

  const primaryActions = (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* Add to Workout - Primary Action */}
      <Button
        variant={variant}
        size={size}
        startIcon={<AddIcon />}
        onClick={handleAddToWorkout}
        sx={{
          minWidth: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        Add to Workout
      </Button>

      {/* Favorite Toggle */}
      <Tooltip
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <IconButton
          onClick={handleToggleFavorite}
          color={isFavorite ? 'error' : 'default'}
          size={size}
        >
          {isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
        </IconButton>
      </Tooltip>

      {/* Share Menu */}
      <Tooltip title='Share exercise'>
        <IconButton onClick={handleShareMenuOpen} size={size}>
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={shareAnchorEl}
        open={Boolean(shareAnchorEl)}
        onClose={handleShareMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleShare('link')}>
          <ListItemText primary='Copy Link' />
        </MenuItem>
        <MenuItem onClick={() => handleShare('email')}>
          <ListItemText primary='Share via Email' />
        </MenuItem>
        <MenuItem onClick={() => handleShare('social')}>
          <ListItemText primary='Share on Social' />
        </MenuItem>
      </Menu>
    </Box>
  );

  const secondaryMenu = showSecondaryActions && (
    <>
      <Tooltip title='More actions'>
        <IconButton onClick={handleMenuOpen} size={size}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleSchedule}>
          <ListItemIcon>
            <ScheduleIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Schedule Workout' />
        </MenuItem>

        <MenuItem onClick={handleBookmark}>
          <ListItemIcon>
            {isBookmarked ? (
              <BookmarkIcon fontSize='small' />
            ) : (
              <BookmarkBorderIcon fontSize='small' />
            )}
          </ListItemIcon>
          <ListItemText
            primary={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          />
        </MenuItem>

        <Divider />

        {canEdit && (
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Edit Exercise' />
          </MenuItem>
        )}

        <MenuItem onClick={handleReport}>
          <ListItemIcon>
            <ReportIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Report Issue' />
        </MenuItem>
      </Menu>
    </>
  );

  // Exercise metadata chips
  const exerciseMetadata = (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
      {exercise.difficulty && (
        <Chip
          label={`${exercise.difficulty} difficulty`}
          size='small'
          variant='outlined'
          color={
            exercise.difficulty.toLowerCase() === 'beginner'
              ? 'success'
              : exercise.difficulty.toLowerCase() === 'intermediate'
              ? 'warning'
              : 'error'
          }
        />
      )}

      {exercise.equipment && exercise.equipment !== 'None' && (
        <Chip
          label={exercise.equipment}
          size='small'
          variant='outlined'
          icon={<InfoIcon />}
        />
      )}

      {exercise.force && (
        <Chip label={exercise.force} size='small' variant='outlined' />
      )}

      {exercise.mechanic && (
        <Chip label={exercise.mechanic} size='small' variant='outlined' />
      )}
    </Box>
  );

  return (
    <Box sx={{ py: 2 }}>
      <Divider sx={{ mb: 3 }} />

      {/* Header */}
      <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
        Actions
      </Typography>

      {/* Primary Actions Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {primaryActions}
        {secondaryMenu}
      </Box>

      {/* Exercise Metadata */}
      {exerciseMetadata}

      {/* Usage Statistics (if available) */}
      {exercise.stats && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
          <Typography variant='body2' color='text.secondary' gutterBottom>
            Exercise Statistics
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {exercise.stats.timesUsed && (
              <Typography variant='caption'>
                Used {exercise.stats.timesUsed} times
              </Typography>
            )}
            {exercise.stats.avgRating && (
              <Typography variant='caption'>
                {exercise.stats.avgRating}/5 rating
              </Typography>
            )}
            {exercise.stats.lastUsed && (
              <Typography variant='caption'>
                Last used{' '}
                {new Date(exercise.stats.lastUsed).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ExerciseDetailActions);
