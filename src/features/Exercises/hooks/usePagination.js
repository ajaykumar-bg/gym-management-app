/**
 * Custom hook for managing pagination
 */

import { useState, useMemo, useCallback } from 'react';
import {
  calculatePagination,
  getPaginatedItems,
  validatePaginationParams,
  getPaginationDisplayText,
} from '../utils/paginationUtils';
import { PAGINATION_CONFIG } from '../constants/ui.constants';

/**
 * Hook for managing pagination state and logic
 * @param {Array} items - Array of items to paginate
 * @param {Object} options - Pagination options
 * @returns {Object} Pagination state and handlers
 */
export const usePagination = (items = [], options = {}) => {
  const {
    initialPage = PAGINATION_CONFIG.INITIAL_PAGE,
    initialPageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
    totalUnfilteredCount = 0,
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  /**
   * Validates and corrects pagination parameters
   */
  const validatedParams = useMemo(() => {
    return validatePaginationParams(currentPage, pageSize, items.length);
  }, [currentPage, pageSize, items.length]);

  /**
   * Calculates pagination information
   */
  const paginationInfo = useMemo(() => {
    return calculatePagination(
      items.length,
      validatedParams.currentPage,
      validatedParams.pageSize
    );
  }, [items.length, validatedParams.currentPage, validatedParams.pageSize]);

  /**
   * Gets current page items
   */
  const currentPageItems = useMemo(() => {
    return getPaginatedItems(
      items,
      validatedParams.currentPage,
      validatedParams.pageSize
    );
  }, [items, validatedParams.currentPage, validatedParams.pageSize]);

  /**
   * Whether items are filtered
   */
  const isFiltered = useMemo(() => {
    return totalUnfilteredCount > 0 && items.length !== totalUnfilteredCount;
  }, [totalUnfilteredCount, items.length]);

  /**
   * Pagination display text
   */
  const displayText = useMemo(() => {
    return getPaginationDisplayText(
      paginationInfo,
      isFiltered,
      totalUnfilteredCount
    );
  }, [paginationInfo, isFiltered, totalUnfilteredCount]);

  /**
   * Goes to specific page
   */
  const goToPage = useCallback(
    (page) => {
      const maxPage = Math.max(1, Math.ceil(items.length / pageSize));
      const targetPage = Math.max(1, Math.min(page, maxPage));
      setCurrentPage(targetPage);
    },
    [items.length, pageSize]
  );

  /**
   * Goes to next page
   */
  const goToNextPage = useCallback(() => {
    if (paginationInfo.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [paginationInfo.hasNextPage]);

  /**
   * Goes to previous page
   */
  const goToPrevPage = useCallback(() => {
    if (paginationInfo.hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [paginationInfo.hasPrevPage]);

  /**
   * Goes to first page
   */
  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  /**
   * Goes to last page
   */
  const goToLastPage = useCallback(() => {
    const maxPage = Math.max(1, Math.ceil(items.length / pageSize));
    setCurrentPage(maxPage);
  }, [items.length, pageSize]);

  /**
   * Changes page size
   */
  const changePageSize = useCallback(
    (newPageSize) => {
      if (!PAGINATION_CONFIG.AVAILABLE_PAGE_SIZES.includes(newPageSize)) {
        console.warn(`Invalid page size: ${newPageSize}. Using default.`);
        newPageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;
      }

      // Calculate what the current page should be with new page size
      const currentItemIndex = (currentPage - 1) * pageSize;
      const newPage = Math.floor(currentItemIndex / newPageSize) + 1;

      setPageSize(newPageSize);
      setCurrentPage(newPage);
    },
    [currentPage, pageSize]
  );

  /**
   * Resets pagination to initial state
   */
  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  /**
   * Auto-adjusts page if current page becomes invalid
   */
  const adjustPageIfNeeded = useCallback(() => {
    const maxPage = Math.max(1, Math.ceil(items.length / pageSize));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPage, items.length, pageSize]);

  // Auto-adjust page when items change
  useMemo(() => {
    adjustPageIfNeeded();
  }, [adjustPageIfNeeded]);

  return {
    // Current state
    currentPage: validatedParams.currentPage,
    pageSize: validatedParams.pageSize,
    currentPageItems,

    // Pagination info
    ...paginationInfo,
    isFiltered,
    displayText,
    totalUnfilteredCount,

    // Navigation handlers
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    changePageSize,

    // Utility functions
    resetPagination,
    adjustPageIfNeeded,

    // Available options
    availablePageSizes: PAGINATION_CONFIG.AVAILABLE_PAGE_SIZES,
  };
};
