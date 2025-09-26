/**
 * Exercise filtering utilities
 * Provides functions for filtering exercises based on various criteria
 */

import {
  muscleTypes,
  categoryTypes,
  equipmentTypes,
  forceTypes,
  difficultyLevels,
} from '../constants/exercises.constant';

/**
 * Filters exercises based on search query
 * @param {Array} exercises - Array of exercise objects
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered exercises array
 */
export const filterBySearchQuery = (exercises, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return exercises;
  }

  const query = searchQuery.toLowerCase().trim();

  return exercises.filter((exercise) => {
    const name = exercise.name?.toLowerCase() || '';
    const description = exercise.description?.toLowerCase() || '';
    const primaryMuscles =
      exercise.primaryMuscles?.join(' ').toLowerCase() || '';
    const secondaryMuscles =
      exercise.secondaryMuscles?.join(' ').toLowerCase() || '';
    const equipment = exercise.equipment?.toLowerCase() || '';
    const category = exercise.category?.toLowerCase() || '';

    return (
      name.includes(query) ||
      description.includes(query) ||
      primaryMuscles.includes(query) ||
      secondaryMuscles.includes(query) ||
      equipment.includes(query) ||
      category.includes(query)
    );
  });
};

/**
 * Filters exercises by muscle group
 * @param {Array} exercises - Array of exercise objects
 * @param {string} muscle - Muscle group filter
 * @returns {Array} Filtered exercises array
 */
export const filterByMuscle = (exercises, muscle) => {
  if (!muscle || muscle === 'All') {
    return exercises;
  }

  return exercises.filter((exercise) => {
    const primaryMuscles = exercise.primaryMuscles || [];
    const secondaryMuscles = exercise.secondaryMuscles || [];

    return [...primaryMuscles, ...secondaryMuscles].some(
      (m) => m.toLowerCase() === muscle.toLowerCase()
    );
  });
};

/**
 * Filters exercises by equipment type
 * @param {Array} exercises - Array of exercise objects
 * @param {string} equipment - Equipment filter
 * @returns {Array} Filtered exercises array
 */
export const filterByEquipment = (exercises, equipment) => {
  if (!equipment || equipment === 'All') {
    return exercises;
  }

  return exercises.filter(
    (exercise) => exercise.equipment?.toLowerCase() === equipment.toLowerCase()
  );
};

/**
 * Filters exercises by category
 * @param {Array} exercises - Array of exercise objects
 * @param {string} category - Category filter
 * @returns {Array} Filtered exercises array
 */
export const filterByCategory = (exercises, category) => {
  if (!category || category === 'All') {
    return exercises;
  }

  return exercises.filter(
    (exercise) => exercise.category?.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Filters exercises by force type
 * @param {Array} exercises - Array of exercise objects
 * @param {string} force - Force filter
 * @returns {Array} Filtered exercises array
 */
export const filterByForce = (exercises, force) => {
  if (!force || force === 'All') {
    return exercises;
  }

  return exercises.filter(
    (exercise) => exercise.force?.toLowerCase() === force.toLowerCase()
  );
};

/**
 * Filters exercises by difficulty level
 * @param {Array} exercises - Array of exercise objects
 * @param {string} difficulty - Difficulty filter
 * @returns {Array} Filtered exercises array
 */
export const filterByDifficulty = (exercises, difficulty) => {
  if (!difficulty || difficulty === 'All') {
    return exercises;
  }

  return exercises.filter(
    (exercise) => exercise.level?.toLowerCase() === difficulty.toLowerCase()
  );
};

/**
 * Applies all filters to exercise array
 * @param {Array} exercises - Array of exercise objects
 * @param {Object} filters - Filter object containing all filter values
 * @returns {Array} Filtered exercises array
 */
export const applyAllFilters = (exercises, filters) => {
  if (!exercises || !Array.isArray(exercises)) {
    return [];
  }

  let filteredExercises = exercises;

  // Apply search query filter
  filteredExercises = filterBySearchQuery(
    filteredExercises,
    filters.searchQuery
  );

  // Apply muscle filter
  filteredExercises = filterByMuscle(filteredExercises, filters.muscle);

  // Apply equipment filter
  filteredExercises = filterByEquipment(filteredExercises, filters.equipment);

  // Apply category filter
  filteredExercises = filterByCategory(filteredExercises, filters.category);

  // Apply force filter
  filteredExercises = filterByForce(filteredExercises, filters.force);

  // Apply difficulty filter
  filteredExercises = filterByDifficulty(filteredExercises, filters.difficulty);

  return filteredExercises;
};

/**
 * Gets the display label for a filter option
 * @param {string} filterType - Type of filter (muscle, equipment, etc.)
 * @param {string} value - Filter value
 * @returns {string} Display label
 */
export const getFilterLabel = (filterType, value) => {
  const filterMappings = {
    muscle: muscleTypes,
    equipment: equipmentTypes,
    category: categoryTypes,
    force: forceTypes,
    difficulty: difficultyLevels,
  };

  const options = filterMappings[filterType];
  if (!options) return value;

  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

/**
 * Counts active filters
 * @param {Object} filters - Filter object
 * @returns {number} Number of active filters
 */
export const countActiveFilters = (filters) => {
  let count = 0;

  if (filters.searchQuery) count++;
  if (filters.muscle !== 'All') count++;
  if (filters.equipment !== 'All') count++;
  if (filters.category !== 'All') count++;
  if (filters.force !== 'All') count++;
  if (filters.difficulty !== 'All') count++;

  return count;
};

/**
 * Gets active filter details for display
 * @param {Object} filters - Filter object
 * @returns {Array} Array of active filter objects with key and label
 */
export const getActiveFilterDetails = (filters) => {
  const activeFilters = [];

  if (filters.searchQuery) {
    activeFilters.push({
      key: 'searchQuery',
      type: 'search',
      label: `"${filters.searchQuery}"`,
    });
  }

  if (filters.muscle !== 'All') {
    activeFilters.push({
      key: 'muscle',
      type: 'filter',
      label: getFilterLabel('muscle', filters.muscle),
    });
  }

  if (filters.equipment !== 'All') {
    activeFilters.push({
      key: 'equipment',
      type: 'filter',
      label: getFilterLabel('equipment', filters.equipment),
    });
  }

  if (filters.category !== 'All') {
    activeFilters.push({
      key: 'category',
      type: 'filter',
      label: getFilterLabel('category', filters.category),
    });
  }

  if (filters.force !== 'All') {
    activeFilters.push({
      key: 'force',
      type: 'filter',
      label: getFilterLabel('force', filters.force),
    });
  }

  if (filters.difficulty !== 'All') {
    activeFilters.push({
      key: 'difficulty',
      type: 'filter',
      label: getFilterLabel('difficulty', filters.difficulty),
    });
  }

  return activeFilters;
};
