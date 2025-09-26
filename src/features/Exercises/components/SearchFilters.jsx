import React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
	difficultyLevels,
	equipmentTypes,
	categoryTypes,
	forceTypes,
	muscleTypes,
} from '../constants/exercisesApp.mock';

function SearchFilters(props) {
	const {
		filters,
		handleSearch,
		handleFilterChange,
		applyFilters,
		clearFilters,
	} = props;
	return (
		<Paper elevation={3} sx={{ p: 3, mb: 4 }}>
			<Typography variant='h5' component='h2' gutterBottom>
				Filters
			</Typography>

			<Grid container spacing={3}>
				<Grid size={{ xs: 12, sm: 6, md: 3 }}>
					<TextField
						fullWidth
						label='Search Exercises'
						variant='outlined'
						name='searchQuery'
						value={filters.searchQuery}
						onChange={handleSearch}
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
					<Stack spacing={2} direction='row'>
						<Button variant='contained' onClick={applyFilters}>
							Search
						</Button>
						<Button variant='outlined' onClick={clearFilters}>
							Clear
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default React.memo(SearchFilters);
