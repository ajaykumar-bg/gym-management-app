import React, { useMemo } from 'react';
import {
	Grid,
	Typography,
	Stack,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Paper,
	Chip,
	Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
	difficultyLevels,
	equipmentTypes,
	categoryTypes,
	forceTypes,
	muscleTypes,
} from '../constants/exercises.constant';

function SearchFilters(props) {
	const {
		filters,
		handleSearch,
		handleFilterChange,
		clearFilters,
	} = props;

	// Count active filters
	const activeFiltersCount = useMemo(() => {
		let count = 0;
		if (filters.searchQuery) count++;
		if (filters.muscle !== 'All') count++;
		if (filters.equipment !== 'All') count++;
		if (filters.category !== 'All') count++;
		if (filters.force !== 'All') count++;
		if (filters.difficulty !== 'All') count++;
		return count;
	}, [filters]);

	// Get active filter labels
	const getActiveFilters = useMemo(() => {
		const active = [];
		if (filters.searchQuery) active.push({ key: 'search', label: `"${filters.searchQuery}"` });
		if (filters.muscle !== 'All') {
			const muscle = muscleTypes.find(m => m.value === filters.muscle);
			active.push({ key: 'muscle', label: muscle?.label || filters.muscle });
		}
		if (filters.equipment !== 'All') {
			const equipment = equipmentTypes.find(e => e.value === filters.equipment);
			active.push({ key: 'equipment', label: equipment?.label || filters.equipment });
		}
		if (filters.category !== 'All') {
			const category = categoryTypes.find(c => c.value === filters.category);
			active.push({ key: 'category', label: category?.label || filters.category });
		}
		if (filters.force !== 'All') {
			const force = forceTypes.find(f => f.value === filters.force);
			active.push({ key: 'force', label: force?.label || filters.force });
		}
		if (filters.difficulty !== 'All') {
			const difficulty = difficultyLevels.find(d => d.value === filters.difficulty);
			active.push({ key: 'difficulty', label: difficulty?.label || filters.difficulty });
		}
		return active;
	}, [filters]);

	const handleClearSpecificFilter = (filterKey) => {
		const event = {
			target: {
				name: filterKey,
				value: filterKey === 'searchQuery' ? '' : 'All'
			}
		};
		if (filterKey === 'searchQuery') {
			handleSearch(event);
		} else {
			handleFilterChange(event);
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 3, mb: 4 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<Typography variant='h5' component='h2'>
					Filters
				</Typography>
				{activeFiltersCount > 0 && (
					<Chip 
						label={`${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}`} 
						color="primary" 
						size="small"
					/>
				)}
			</Box>

			{/* Active Filters Display */}
			{activeFiltersCount > 0 && (
				<Box sx={{ mb: 2 }}>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
						Active filters:
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						{getActiveFilters.map((filter) => (
							<Chip
								key={filter.key}
								label={filter.label}
								onDelete={() => handleClearSpecificFilter(filter.key === 'search' ? 'searchQuery' : filter.key)}
								size="small"
								variant="outlined"
								color="primary"
							/>
						))}
					</Box>
				</Box>
			)}

			<Grid container spacing={3}>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<TextField
						fullWidth
						label='Search Exercises'
						variant='outlined'
						name='searchQuery'
						value={filters.searchQuery}
						onChange={handleSearch}
						placeholder="Search by name, muscle, equipment..."
						InputProps={{
							endAdornment: <SearchIcon position='end' />,
						}}
					/>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='muscle-label'>Muscle Group</InputLabel>
						<Select
							labelId='muscle-label'
							id='muscle-select'
							name='muscle'
							value={filters.muscle}
							label='Muscle Group'
							onChange={handleFilterChange}
						>
							{muscleTypes.map((muscle) => (
								<MenuItem key={muscle.value} value={muscle.value}>
									{muscle.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='equipment-label'>Equipment</InputLabel>
						<Select
							labelId='equipment-label'
							id='equipment-select'
							name='equipment'
							value={filters.equipment}
							label='Equipment'
							onChange={handleFilterChange}
						>
							{equipmentTypes.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='category-label'>Category</InputLabel>
						<Select
							labelId='category-label'
							id='category-select'
							name='category'
							value={filters.category}
							label='Category'
							onChange={handleFilterChange}
						>
							{categoryTypes.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='force-label'>Force</InputLabel>
						<Select
							labelId='force-label'
							id='force-select'
							name='force'
							value={filters.force}
							label='Force'
							onChange={handleFilterChange}
						>
							{forceTypes.map((item) => (
								<MenuItem key={item.value} value={item.value}>
									{item.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<FormControl fullWidth>
						<InputLabel id='difficulty-label'>Difficulty</InputLabel>
						<Select
							labelId='difficulty-label'
							id='difficulty-select'
							name='difficulty'
							value={filters.difficulty}
							label='Difficulty'
							onChange={handleFilterChange}
						>
							{difficultyLevels.map((difficulty) => (
								<MenuItem key={difficulty.value} value={difficulty.value}>
									{difficulty.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<Stack spacing={2} direction='row' sx={{ height: '56px', alignItems: 'center' }}>
						<Button 
							variant='outlined' 
							onClick={clearFilters}
							sx={{ height: 'fit-content' }}
							disabled={activeFiltersCount === 0}
						>
							Clear All Filters
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default React.memo(SearchFilters);
