/**
 * Custom hook for managing exercise filters
 */

import { useState, useMemo, useCallback } from 'react';
import {
  applyAllFilters,
  countActiveFilters,
  getActiveFilterDetails,
} from '../utils/filterUtils';
import { FILTER_CONFIG } from '../constants/ui.constants';

/**
 * Initial filter state
 */
const INITIAL_FILTERS = {
  searchQuery: '',
  muscle: FILTER_CONFIG.DEFAULT_VALUE,
  equipment: FILTER_CONFIG.DEFAULT_VALUE,
  category: FILTER_CONFIG.DEFAULT_VALUE,
  force: FILTER_CONFIG.DEFAULT_VALUE,
  difficulty: FILTER_CONFIG.DEFAULT_VALUE,
};

/**
 * Hook for managing exercise filters
 * @param {Array} exercises - Array of all exercises
 * @returns {Object} Filter state and handlers
 */
export const useExerciseFilters = (exercises = []) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  /**
   * Updates a specific filter
   */
  const updateFilter = useCallback((name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Handles search query changes
   */
  const handleSearch = useCallback(
    (event) => {
      updateFilter('searchQuery', event.target.value);
    },
    [updateFilter]
  );

  /**
   * Handles filter dropdown changes
   */
  const handleFilterChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      updateFilter(name, value);
    },
    [updateFilter]
  );

  /**
   * Clears all filters
   */
  const clearAllFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  /**
   * Clears a specific filter
   */
  const clearSpecificFilter = useCallback(
    (filterKey) => {
      const value =
        filterKey === 'searchQuery' ? '' : FILTER_CONFIG.DEFAULT_VALUE;
      updateFilter(filterKey, value);
    },
    [updateFilter]
  );

  /**
   * Memoized filtered exercises
   */
  const filteredExercises = useMemo(() => {
    return applyAllFilters(exercises, filters);
  }, [exercises, filters]);

  /**
   * Memoized active filters count
   */
  const activeFiltersCount = useMemo(() => {
    return countActiveFilters(filters);
  }, [filters]);

  /**
   * Memoized active filter details
   */
  const activeFilterDetails = useMemo(() => {
    return getActiveFilterDetails(filters);
  }, [filters]);

  /**
   * Whether any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return activeFiltersCount > 0;
  }, [activeFiltersCount]);

  /**
   * Whether results are filtered (different from total)
   */
  const isFiltered = useMemo(() => {
    return hasActiveFilters && filteredExercises.length !== exercises.length;
  }, [hasActiveFilters, filteredExercises.length, exercises.length]);

  return {
    // Filter state
    filters,
    filteredExercises,
    activeFiltersCount,
    activeFilterDetails,
    hasActiveFilters,
    isFiltered,

    // Filter handlers
    handleSearch,
    handleFilterChange,
    clearAllFilters,
    clearSpecificFilter,
    updateFilter,

    // Helper functions
    resetFilters: () => setFilters(INITIAL_FILTERS),
    setFilters,
  };
};
