import React, { useState, useCallback } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import exercisesData from '../constants/exercises.json';

import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';

// Main App Component
const ExerciseApp = () => {
	const [exercises, setExercises] = useState(exercisesData);
	const [filters, setFilters] = useState({
		searchQuery: '',
		muscle: 'All',
		equipment: 'All',
		category: 'All',
		force: 'All',
		difficulty: 'All',
	});

	const [selectedExercise, setSelectedExercise] = useState(null);
	const [detailsOpen, setDetailsOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

	// Handle filter changes

	const handleFilterChange = useCallback(
		(event) => {
			const { name, value } = event.target;
			setFilters({
				...filters,
				[name]: value,
			});
		},
		[filters]
	);

	// Handle search
	const handleSearch = useCallback(
		(event) => {
			setFilters({
				...filters,
				searchQuery: event.target.value,
			});
		},
		[filters]
	);

	const clearFilters = useCallback(() => {
		setFilters({
			searchQuery: '',
			muscle: 'All',
			equipment: 'All',
			category: 'All',
			force: 'All',
			difficulty: 'All',
		});
	}, []);

	const applyFilters = useCallback(() => {
		let filteredExercises = [...exercisesData];

		// Filter by muscle
		if (filters.muscle && filters.muscle !== 'All') {
			filteredExercises = filteredExercises.filter((exercise) =>
				exercise.primaryMuscles.includes(filters.muscle)
			);
		}

		// Filter by equipment
		if (filters.equipment && filters.equipment !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.equipment === filters.equipment
			);
		}

		// Filter by force
		if (filters.force && filters.force !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.force === filters.force
			);
		}

		// Filter by difficulty
		if (filters.difficulty && filters.difficulty !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.level === filters.difficulty
			);
		}

		// Filter by category
		if (filters.category && filters.category !== 'All') {
			filteredExercises = filteredExercises.filter(
				(exercise) => exercise.category === filters.category
			);
		}

		// Filter by search query
		if (filters.searchQuery) {
			filteredExercises = filteredExercises.filter((exercise) =>
				exercise.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
			);
		}

		setExercises([...filteredExercises]);
	}, [filters]);

	// Open exercise details
	const openExerciseDetails = useCallback((exercise) => {
		setSelectedExercise(exercise);
		setDetailsOpen(true);
		setActiveStep(0);
	}, []);

	// Close exercise details
	const closeExerciseDetails = useCallback(() => {
		setDetailsOpen(false);
		setSelectedExercise(null);
	}, []);

	// Handle image navigation
	const handleNext = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	}, []);

	const handleBack = useCallback(() => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	}, []);

	return (
		<Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Gym Exercise Library
			</Typography>

			<SearchFilters
				filters={filters}
				handleSearch={handleSearch}
				handleFilterChange={handleFilterChange}
				applyFilters={applyFilters}
				clearFilters={clearFilters}
			/>

			<Box sx={{ flexGrow: 1, marginBottom: 3 }}>
				<AppBar position='static' sx={{ py: 1 }}>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, marginLeft: 3 }}
					>
						Result count: {exercises.length}
					</Typography>
				</AppBar>
			</Box>

			<ExerciseList
				exercises={exercises}
				openExerciseDetails={openExerciseDetails}
				clearFilters={clearFilters}
			/>

			<ExerciseDetail
				selectedExercise={selectedExercise}
				open={detailsOpen}
				onClose={closeExerciseDetails}
				activeStep={activeStep}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		</Box>
	);
};

export default React.memo(ExerciseApp);
