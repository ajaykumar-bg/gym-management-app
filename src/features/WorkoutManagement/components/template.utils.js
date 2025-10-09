/**
 * Template utilities
 * Helper functions for workout template operations
 */

/**
 * Filters templates by category
 */
export const filterTemplatesByCategory = (templates, categoryFilter) => {
  if (!categoryFilter) {
    return templates || [];
  }
  return (templates || []).filter(
    (template) => template.category === categoryFilter
  );
};

/**
 * Gets the total number of exercises in a template
 */
export const getTotalExercises = (exercises) => {
  return (exercises || []).reduce((total, req) => total + (req.count || 0), 0);
};

/**
 * Gets the appropriate color for difficulty level
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'expert':
      return 'error';
    default:
      return 'default';
  }
};
