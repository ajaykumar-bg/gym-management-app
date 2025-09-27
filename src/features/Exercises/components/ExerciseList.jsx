import React from 'react';
import {
  Grid,
  Typography,
  Button,
  Paper,
  Pagination,
  Box,
} from '@mui/material';
import Exercise from './Exercise';

function ExerciseList(props) {
  const {
    exercises,
    totalPages,
    page,
    onPageChange,
    openExerciseDetails,
    clearFilters,
  } = props;

  return (
    <Box>
      {/* Exercise Grid */}
      <Grid container spacing={3}>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <Exercise
              key={exercise.name}
              exercise={exercise}
              onOpenDetails={openExerciseDetails}
            />
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant='h6'>
                No exercises found matching your filters.
              </Typography>
              <Button variant='outlined' sx={{ mt: 2 }} onClick={clearFilters}>
                Clear Filters
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Bottom Pagination */}
      {exercises.length > 0 && totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            mb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color='primary'
            size='large'
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPagination-ul': {
                flexWrap: 'wrap',
                justifyContent: 'center',
              },
            }}
          />
        </Box>
      )}

      {/* Quick Jump Options for Large Datasets */}
      {totalPages > 10 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mr: 1, alignSelf: 'center' }}
            >
              Quick jump:
            </Typography>
            {[
              1,
              Math.floor(totalPages * 0.25),
              Math.floor(totalPages * 0.5),
              Math.floor(totalPages * 0.75),
              totalPages,
            ]
              .filter(
                (pageNum, index, arr) =>
                  pageNum > 0 &&
                  pageNum <= totalPages &&
                  arr.indexOf(pageNum) === index
              )
              .map((pageNum) => (
                <Button
                  key={pageNum}
                  size='small'
                  variant={page === pageNum ? 'contained' : 'outlined'}
                  onClick={() => onPageChange(null, pageNum)}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  {pageNum}
                </Button>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default React.memo(ExerciseList);
