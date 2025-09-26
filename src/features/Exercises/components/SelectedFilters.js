import { Box, CircularProgress, Fade, Typography } from '@mui/material';
import React from 'react';

function SelectedFilters(props) {
  const { filteredExercises, exercisesData, isFiltering } = props;
  const hasActiveFilters = filteredExercises.length !== exercisesData.length;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 3,
        marginRight: 3,
      }}
    >
      <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
        {hasActiveFilters ? (
          <>
            <span>Filtered: {filteredExercises.length} exercises</span>
            <Typography variant='caption' sx={{ ml: 2, opacity: 0.7 }}>
              (out of {exercisesData.length} total)
            </Typography>
          </>
        ) : (
          `Total: ${exercisesData.length} exercises`
        )}
      </Typography>

      {isFiltering && (
        <Fade in={isFiltering}>
          <CircularProgress size={20} color='inherit' />
        </Fade>
      )}
    </Box>
  );
}

export default SelectedFilters;
