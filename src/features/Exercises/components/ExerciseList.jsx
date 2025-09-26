import React, { useState, useMemo } from 'react';
import { 
	Grid, 
	Typography, 
	Button, 
	Paper, 
	Pagination, 
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';
import Exercise from './Exercise';
import ExerciseListInfo from './ExerciseListInfo';

function ExerciseList(props) {
	const { exercises, openExerciseDetails, clearFilters, filters, onClearSpecificFilter, totalUnfilteredCount } = props;
	
	// Pagination state
	const [page, setPage] = useState(1);
	const [exercisesPerPage, setExercisesPerPage] = useState(12);
	
	// Calculate pagination values
	const totalExercises = exercises.length;
	const totalPages = Math.ceil(totalExercises / exercisesPerPage);
	const startIndex = (page - 1) * exercisesPerPage;
	const endIndex = Math.min(startIndex + exercisesPerPage, totalExercises);
	
	// Get exercises for current page
	const paginatedExercises = useMemo(() => {
		return exercises.slice(startIndex, endIndex);
	}, [exercises, startIndex, endIndex]);
	
	// Handle pagination changes
	const handlePageChange = (event, newPage) => {
		setPage(newPage);
		// Scroll to top of exercise list
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	
	const handleExercisesPerPageChange = (event) => {
		setExercisesPerPage(event.target.value);
		setPage(1); // Reset to first page when changing page size
	};
	
	// Reset page when exercises change (due to filters)
	React.useEffect(() => {
		setPage(1);
	}, [exercises.length]);
	
	const exercisesPerPageOptions = [6, 12, 24, 48, 96];
	
	return (
		<Box>
			{/* Pagination Info and Controls */}
			{exercises.length > 0 && (
				<Box 
					sx={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						mb: 3,
						flexWrap: 'wrap',
						gap: 2
					}}
				>
					<ExerciseListInfo 
						totalExercises={totalExercises} 
						page={page} 
						pageSize={exercisesPerPage}
						filters={filters}
						onClearFilter={onClearSpecificFilter}
						totalUnfilteredCount={totalUnfilteredCount}
					/>

					<FormControl size="small" sx={{ minWidth: 120 }}>
						<InputLabel>Per page</InputLabel>
						<Select
							value={exercisesPerPage}
							onChange={handleExercisesPerPageChange}
							label="Per page"
						>
							{exercisesPerPageOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			)}
			
			{/* Exercise Grid */}
			<Grid container spacing={3}>
				{paginatedExercises.length > 0 ? (
					paginatedExercises.map((exercise) => (
						<Exercise
							key={exercise.name}
							exercise={exercise}
							onOpenDetails={openExerciseDetails}
						/>
					))
				) : exercises.length === 0 ? (
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
				) : null}
			</Grid>
			
			{/* Bottom Pagination */}
			{exercises.length > 0 && totalPages > 1 && (
				<Box 
					sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						mt: 4,
						mb: 2
					}}
				>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
						size="large"
						showFirstButton
						showLastButton
						sx={{
							'& .MuiPagination-ul': {
								flexWrap: 'wrap',
								justifyContent: 'center'
							}
						}}
					/>
				</Box>
			)}
			
			{/* Quick Jump Options for Large Datasets */}
			{totalPages > 10 && (
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
						<Typography variant="caption" color="text.secondary" sx={{ mr: 1, alignSelf: 'center' }}>
							Quick jump:
						</Typography>
						{[1, Math.floor(totalPages * 0.25), Math.floor(totalPages * 0.5), Math.floor(totalPages * 0.75), totalPages]
							.filter((pageNum, index, arr) => pageNum > 0 && pageNum <= totalPages && arr.indexOf(pageNum) === index)
							.map((pageNum) => (
								<Button
									key={pageNum}
									size="small"
									variant={page === pageNum ? "contained" : "outlined"}
									onClick={() => handlePageChange(null, pageNum)}
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
