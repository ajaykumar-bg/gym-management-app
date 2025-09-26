import React, { useState, useCallback, useMemo } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import exercisesData from '../constants/exercises.json';

import ExerciseDetail from './ExerciseDetail';
import SearchFilters from './SearchFilters';
import ExerciseList from './ExerciseList';
import SelectedFilters from './SelectedFilters';

// Main App Component
const ExerciseApp = () => {
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
	const [isFiltering, setIsFiltering] = useState(false);

	// Memoized filtered exercises to avoid recalculating on every render
	const filteredExercises = useMemo(() => {
		let filtered = [...exercisesData];

		// Filter by muscle
		if (filters.muscle && filters.muscle !== 'All') {
			filtered = filtered.filter((exercise) =>
				exercise.primaryMuscles.includes(filters.muscle)
			);
		}

		// Filter by equipment
		if (filters.equipment && filters.equipment !== 'All') {
			filtered = filtered.filter(
				(exercise) => exercise.equipment === filters.equipment
			);
		}

		// Filter by force
		if (filters.force && filters.force !== 'All') {
			filtered = filtered.filter(
				(exercise) => exercise.force === filters.force
			);
		}

		// Filter by difficulty
		if (filters.difficulty && filters.difficulty !== 'All') {
			filtered = filtered.filter(
				(exercise) => exercise.level === filters.difficulty
			);
		}

		// Filter by category
		if (filters.category && filters.category !== 'All') {
			filtered = filtered.filter(
				(exercise) => exercise.category === filters.category
			);
		}

		// Filter by search query
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			filtered = filtered.filter((exercise) =>
				exercise.name.toLowerCase().includes(query) ||
				exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(query)) ||
				exercise.equipment.toLowerCase().includes(query) ||
				exercise.category.toLowerCase().includes(query)
			);
		}

		return filtered;
	}, [filters]);

	// Handle filter changes
	const handleFilterChange = useCallback((event) => {
		const { name, value } = event.target;
		setIsFiltering(true);
		setFilters(prev => ({
			...prev,
			[name]: value,
		}));
		// Simulate brief filtering delay for UX feedback
		setTimeout(() => setIsFiltering(false), 300);
	}, []);

	// Handle search
	const handleSearch = useCallback((event) => {
		const value = event.target.value;
		setIsFiltering(value.length > 0);
		setFilters(prev => ({
			...prev,
			searchQuery: value,
		}));
		// Clear filtering state after search
		if (value.length > 0) {
			setTimeout(() => setIsFiltering(false), 500);
		}
	}, []);

	const clearFilters = useCallback(() => {
		setIsFiltering(true);
		setFilters({
			searchQuery: '',
			muscle: 'All',
			equipment: 'All',
			category: 'All',
			force: 'All',
			difficulty: 'All',
		});
		setTimeout(() => setIsFiltering(false), 200);
	}, []);

	// Clear specific filter
	const handleClearSpecificFilter = useCallback((filterKey) => {
		setIsFiltering(true);
		if (filterKey === 'searchQuery') {
			setFilters(prev => ({ ...prev, searchQuery: '' }));
		} else {
			setFilters(prev => ({ ...prev, [filterKey]: 'All' }));
		}
		setTimeout(() => setIsFiltering(false), 200);
	}, []);

	// Apply filters is now handled by useMemo, so we can remove this function
	// and just pass the memoized filteredExercises directly

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
				Exercise Library
			</Typography>

			<SearchFilters
				filters={filters}
				handleSearch={handleSearch}
				handleFilterChange={handleFilterChange}
				applyFilters={() => {}} // No longer needed with useMemo
				clearFilters={clearFilters}
			/>

			<Box sx={{ flexGrow: 1, marginBottom: 3 }}>
				<AppBar position='static' sx={{ py: 1 }}>
					<SelectedFilters
						filteredExercises={filteredExercises}
						exercisesData={exercisesData}
						isFiltering={isFiltering}
					/>
				</AppBar>
			</Box>

			<ExerciseList
				exercises={filteredExercises}
				openExerciseDetails={openExerciseDetails}
				clearFilters={clearFilters}
				filters={filters}
				onClearSpecificFilter={handleClearSpecificFilter}
				totalUnfilteredCount={exercisesData.length}
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
