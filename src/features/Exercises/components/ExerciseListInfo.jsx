import { Box, Chip, Typography } from '@mui/material';
import React from 'react';

function ExerciseListInfo(props) {
  const { totalExercises, page, pageSize, totalUnfilteredCount } = props;
  const totalPages = Math.ceil(totalExercises / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalExercises);

  const isFiltered =
    totalUnfilteredCount && totalExercises !== totalUnfilteredCount;

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
    >
      <Typography variant='body1' color='text.secondary'>
        {isFiltered ? (
          <>
            Showing {startIndex + 1}-{endIndex} of {totalExercises} filtered
            exercises
            <Typography
              component='span'
              variant='caption'
              sx={{ ml: 1, opacity: 0.7 }}
            >
              (out of {totalUnfilteredCount} total)
            </Typography>
          </>
        ) : (
          `Showing ${startIndex + 1}-${endIndex} of ${totalExercises} exercises`
        )}
      </Typography>

      <Chip
        label={`Page ${page} of ${totalPages}`}
        variant='outlined'
        size='small'
        color='primary'
      />
    </Box>
  );
}

export default ExerciseListInfo;
