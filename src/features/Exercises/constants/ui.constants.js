/**
 * UI-related constants for the Exercise module
 */

/**
 * Pagination configuration constants
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  AVAILABLE_PAGE_SIZES: [6, 12, 24, 48, 96],
  INITIAL_PAGE: 1,
};

/**
 * Card layout and styling constants
 */
export const CARD_CONFIG = {
  IMAGE_HEIGHT: '200px',
  HOVER_TRANSFORM: 'translateY(-5px)',
  HOVER_BOX_SHADOW: 6,
  TRANSITION_DURATION: '0.2s',
};

/**
 * Chip color mapping for different exercise attributes
 */
export const CHIP_COLORS = {
  PRIMARY_MUSCLE: 'primary',
  EQUIPMENT: 'secondary',
  LEVEL: 'default',
  CATEGORY: 'error',
  FORCE: 'info',
  MECHANIC: 'success',
};

/**
 * Tooltip configuration
 */
export const TOOLTIP_CONFIG = {
  MAX_WIDTH: 220,
  FONT_SIZE: 12,
  DESCRIPTION_MAX_LENGTH: 120,
};

/**
 * Search configuration
 */
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
  PLACEHOLDER_TEXT: 'Search by name, muscle, equipment...',
};

/**
 * Filter configuration
 */
export const FILTER_CONFIG = {
  DEFAULT_VALUE: 'All',
  ACTIVE_FILTER_THRESHOLD: 1,
};
