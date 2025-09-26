import React from 'react';
import { Grid, Typography, Button, Paper } from '@mui/material';
import Exercise from './Exercise';

function ExerciseList(props) {
	const { exercises, openExerciseDetails, clearFilters } = props;
	return (
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
	);
}

export default React.memo(ExerciseList);
