/**
 * ExercisesContext
 * Centralized state management for the Exercises feature
 * Manages filters, selected exercise, details modal, and image navigation
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import exercisesData from '../constants/exercises.json';

// Create the context
const ExercisesContext = createContext(undefined);

// Initial filter state
const INITIAL_FILTERS = {
  searchQuery: '',
  muscle: 'All',
  equipment: 'All',
  category: 'All',
  force: 'All',
  difficulty: 'All',
};

/**
 * ExercisesProvider component
 * Provides exercise state management to child components
 */
export const ExercisesProvider = ({ children }) => {
  // Filter state
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Exercise details state
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Mobile UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // User interaction state
  const [favorites, setFavorites] = useState(new Set());
  const [bookmarks, setBookmarks] = useState(new Set());

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
      filtered = filtered.filter(
        (exercise) =>
          exercise.name?.toLowerCase().includes(query) ||
          exercise.primaryMuscles.some((muscle) =>
            muscle?.toLowerCase().includes(query)
          ) ||
          exercise.equipment?.toLowerCase().includes(query) ||
          exercise.category?.toLowerCase().includes(query)
      );
    }

    // Sanitize exercises before returning
    return filtered;
  }, [filters]);

  // Filter management functions
  const handleFilterChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSearch = useCallback((event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      searchQuery: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleClearSpecificFilter = useCallback((filterKey) => {
    if (filterKey === 'searchQuery') {
      setFilters((prev) => ({ ...prev, searchQuery: '' }));
    } else {
      setFilters((prev) => ({ ...prev, [filterKey]: 'All' }));
    }
  }, []);

  // Exercise details management
  const openExerciseDetails = useCallback((exercise) => {
    setSelectedExercise(exercise);
    setDetailsOpen(true);
    setActiveStep(0);
  }, []);

  const closeExerciseDetails = useCallback(() => {
    setDetailsOpen(false);
    setSelectedExercise(null);
    setActiveStep(0);
  }, []);

  // Image navigation
  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  // Mobile filters management
  const openMobileFilters = useCallback(() => {
    setMobileFiltersOpen(true);
  }, []);

  const closeMobileFilters = useCallback(() => {
    setMobileFiltersOpen(false);
  }, []);

  // User interaction functions
  const toggleFavorite = useCallback((exercise) => {
    const exerciseId = exercise.name || exercise.id;
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(exerciseId)) {
        newFavorites.delete(exerciseId);
      } else {
        newFavorites.add(exerciseId);
      }
      return newFavorites;
    });
  }, []);

  const toggleBookmark = useCallback((exercise) => {
    const exerciseId = exercise.name || exercise.id;
    setBookmarks((prev) => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(exerciseId)) {
        newBookmarks.delete(exerciseId);
      } else {
        newBookmarks.add(exerciseId);
      }
      return newBookmarks;
    });
  }, []);

  // Add to workout function (placeholder for future implementation)
  const addToWorkout = useCallback((exercise) => {
    console.log('Adding to workout:', exercise.name);
    // TODO: Implement workout functionality
  }, []);

  // Share exercise function (placeholder for future implementation)
  const shareExercise = useCallback((exercise, shareType = 'link') => {
    console.log('Sharing exercise:', exercise.name, 'via', shareType);
    // TODO: Implement sharing functionality
  }, []);

  // Schedule exercise function (placeholder for future implementation)
  const scheduleExercise = useCallback((exercise) => {
    console.log('Scheduling exercise:', exercise.name);
    // TODO: Implement scheduling functionality
  }, []);

  // Report exercise function (placeholder for future implementation)
  const reportExercise = useCallback((exercise) => {
    console.log('Reporting exercise:', exercise.name);
    // TODO: Implement reporting functionality
  }, []);

  // Edit exercise function (placeholder for future implementation)
  const editExercise = useCallback((exercise) => {
    console.log('Editing exercise:', exercise.name);
    // TODO: Implement editing functionality
  }, []);

  // Helper functions for checking state
  const isFavorite = useCallback(
    (exercise) => {
      const exerciseId = exercise?.name || exercise?.id;
      return favorites.has(exerciseId);
    },
    [favorites]
  );

  const isBookmarked = useCallback(
    (exercise) => {
      const exerciseId = exercise?.name || exercise?.id;
      return bookmarks.has(exerciseId);
    },
    [bookmarks]
  );

  // Context value
  const contextValue = {
    // State
    filters,
    filteredExercises,
    selectedExercise,
    detailsOpen,
    activeStep,
    mobileFiltersOpen,
    favorites,
    bookmarks,

    // Filter functions
    handleFilterChange,
    handleSearch,
    clearFilters,
    handleClearSpecificFilter,

    // Exercise details functions
    openExerciseDetails,
    closeExerciseDetails,

    // Image navigation functions
    handleNext,
    handleBack,

    // Mobile UI functions
    openMobileFilters,
    closeMobileFilters,

    // User interaction functions
    toggleFavorite,
    toggleBookmark,
    isFavorite,
    isBookmarked,

    // Action functions
    addToWorkout,
    shareExercise,
    scheduleExercise,
    reportExercise,
    editExercise,

    // Data
    totalExercises: exercisesData.length,
    filteredCount: filteredExercises.length,
  };

  return (
    <ExercisesContext.Provider value={contextValue}>
      {children}
    </ExercisesContext.Provider>
  );
};

/**
 * Custom hook to use the ExercisesContext
 * Provides type safety and helpful error messages
 */
export const useExercises = () => {
  const context = useContext(ExercisesContext);

  if (context === undefined) {
    throw new Error('useExercises must be used within an ExercisesProvider');
  }

  return context;
};

/**
 * HOC to wrap components with ExercisesProvider
 */
export const withExercisesProvider = (Component) => {
  const WrappedComponent = (props) => (
    <ExercisesProvider>
      <Component {...props} />
    </ExercisesProvider>
  );

  WrappedComponent.displayName = `withExercisesProvider(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

export default ExercisesContext;
