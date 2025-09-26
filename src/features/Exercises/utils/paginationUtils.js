/**
 * Pagination utilities
 * Provides functions for handling pagination logic
 */

import { PAGINATION_CONFIG } from '../constants/ui.constants';

/**
 * Calculates pagination information
 * @param {number} totalItems - Total number of items
 * @param {number} currentPage - Current page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Object} Pagination information object
 */
export const calculatePagination = (totalItems, currentPage, pageSize) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    totalPages,
    startIndex,
    endIndex,
    currentPage,
    pageSize,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

/**
 * Gets paginated items from an array
 * @param {Array} items - Array of items to paginate
 * @param {number} currentPage - Current page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Array} Paginated items array
 */
export const getPaginatedItems = (items, currentPage, pageSize) => {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return items.slice(startIndex, endIndex);
};

/**
 * Validates pagination parameters
 * @param {number} currentPage - Current page number
 * @param {number} pageSize - Number of items per page
 * @param {number} totalItems - Total number of items
 * @returns {Object} Validation result with corrected values
 */
export const validatePaginationParams = (currentPage, pageSize, totalItems) => {
  // Ensure pageSize is valid
  const validPageSize = PAGINATION_CONFIG.AVAILABLE_PAGE_SIZES.includes(
    pageSize
  )
    ? pageSize
    : PAGINATION_CONFIG.DEFAULT_PAGE_SIZE;

  // Calculate max page
  const maxPage = Math.max(1, Math.ceil(totalItems / validPageSize));

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.max(1, Math.min(currentPage, maxPage));

  return {
    currentPage: validCurrentPage,
    pageSize: validPageSize,
    isValid: currentPage === validCurrentPage && pageSize === validPageSize,
  };
};

/**
 * Generates pagination display text
 * @param {Object} paginationInfo - Pagination information object
 * @param {boolean} isFiltered - Whether the items are filtered
 * @param {number} totalUnfilteredItems - Total unfiltered items count
 * @returns {string} Pagination display text
 */
export const getPaginationDisplayText = (
  paginationInfo,
  isFiltered = false,
  totalUnfilteredItems = 0
) => {
  const { startIndex, endIndex, totalItems } = paginationInfo;

  if (isFiltered && totalUnfilteredItems > 0) {
    return `Showing ${
      startIndex + 1
    }-${endIndex} of ${totalItems} filtered exercises (out of ${totalUnfilteredItems} total)`;
  }

  return `Showing ${startIndex + 1}-${endIndex} of ${totalItems} exercises`;
};

/**
 * Generates page navigation options
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} maxVisible - Maximum number of visible page options
 * @returns {Array} Array of page numbers to display
 */
export const getPageNavigation = (currentPage, totalPages, maxVisible = 5) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Calculates optimal page size based on viewport and content
 * @param {number} viewportHeight - Viewport height in pixels
 * @param {number} itemHeight - Estimated item height in pixels
 * @param {number} headerHeight - Header height in pixels
 * @returns {number} Recommended page size
 */
export const calculateOptimalPageSize = (
  viewportHeight = 800,
  itemHeight = 300,
  headerHeight = 200
) => {
  const availableHeight = viewportHeight - headerHeight;
  const itemsPerRow = 3; // Based on responsive grid
  const rowHeight = itemHeight + 32; // Including margins

  const visibleRows = Math.floor(availableHeight / rowHeight);
  const optimalPageSize = Math.max(itemsPerRow, visibleRows * itemsPerRow);

  // Find closest available page size
  return PAGINATION_CONFIG.AVAILABLE_PAGE_SIZES.reduce((closest, size) => {
    return Math.abs(size - optimalPageSize) <
      Math.abs(closest - optimalPageSize)
      ? size
      : closest;
  });
};
