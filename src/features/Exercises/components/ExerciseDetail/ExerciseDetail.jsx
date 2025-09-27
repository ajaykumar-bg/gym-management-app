/**
 * Exercise Detail Component (Refactored)
 * Main detail view for exercises using modular sub-components
 */

import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Import sub-components
import ExerciseImageSlider from './ExerciseImageSlider';
import ExerciseDetailContent from './ExerciseDetailContent';
import ExerciseDetailChips from './ExerciseDetailChips';
import ExerciseInstructions from './ExerciseInstructions';
import ExerciseDetailActions from './ExerciseDetailActions';

/**
 * ExerciseDetail component
 * @param {Object} props - Component props
 * @param {Object} props.selectedExercise - Selected exercise object
 * @param {boolean} props.open - Whether drawer is open
 * @param {Function} props.onClose - Handler for closing drawer
 * @param {Function} props.onAddToWorkout - Handler for adding exercise to workout
 * @param {Function} props.onToggleFavorite - Handler for toggling favorite status
 * @param {Function} props.onShare - Handler for sharing exercise
 * @param {Function} props.onSchedule - Handler for scheduling exercise
 * @param {Function} props.onBookmark - Handler for bookmarking exercise
 * @param {Function} props.onEdit - Handler for editing exercise
 * @param {Function} props.onReport - Handler for reporting exercise
 * @param {boolean} props.isFavorite - Whether exercise is favorited
 * @param {boolean} props.isBookmarked - Whether exercise is bookmarked
 * @param {boolean} props.canEdit - Whether user can edit exercise
 * @returns {JSX.Element} ExerciseDetail component
 */
function ExerciseDetail({
  selectedExercise,
  open,
  onClose,
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
}) {
  if (!selectedExercise) {
    return null;
  }

  const handleAddToWorkout = (exercise) => {
    onAddToWorkout?.(exercise);
    // Could show success message here
  };

  const handleToggleFavorite = (exercise, newState) => {
    onToggleFavorite?.(exercise, newState);
  };

  const handleShare = (exercise, shareType) => {
    onShare?.(exercise, shareType);
  };

  const handleSchedule = (exercise) => {
    onSchedule?.(exercise);
  };

  const handleBookmark = (exercise, newState) => {
    onBookmark?.(exercise, newState);
  };

  const handleEdit = (exercise) => {
    onEdit?.(exercise);
  };

  const handleReport = (exercise) => {
    onReport?.(exercise);
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 600, md: 700 },
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Header */}
      <AppBar
        position='sticky'
        color='default'
        elevation={1}
        sx={{ zIndex: 1201 }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Exercise Details
          </Typography>
          <IconButton
            edge='end'
            color='inherit'
            onClick={onClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          px: 3,
          pb: 3,
        }}
      >
        {/* Image Slider */}
        <ExerciseImageSlider
          exercise={selectedExercise}
          showImageCounter={true}
          showNavigation={true}
          autoplay={false}
          height={300}
        />

        {/* Main Content */}
        <ExerciseDetailContent
          exercise={selectedExercise}
          showExpandableDescription={true}
          maxDescriptionLength={300}
          showMetadata={true}
        />

        {/* Exercise Attribute Chips */}
        <ExerciseDetailChips
          exercise={selectedExercise}
          showTooltips={true}
          maxChipsToShow={10}
          layout='wrap'
        />

        {/* Instructions */}
        <ExerciseInstructions
          exercise={selectedExercise}
          showCheckboxes={false}
          collapsible={true}
          defaultExpanded={true}
        />

        {/* Actions */}
        <ExerciseDetailActions
          exercise={selectedExercise}
          onAddToWorkout={handleAddToWorkout}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShare}
          onSchedule={handleSchedule}
          onBookmark={handleBookmark}
          onEdit={handleEdit}
          onReport={handleReport}
          isFavorite={isFavorite}
          isBookmarked={isBookmarked}
          canEdit={canEdit}
          showSecondaryActions={true}
          size='medium'
          variant='contained'
        />
      </Box>
    </Drawer>
  );
}

export default React.memo(ExerciseDetail);
