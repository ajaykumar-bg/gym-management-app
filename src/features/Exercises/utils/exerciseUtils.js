/**
 * Exercise data validation and formatting utilities
 */

import {
  REQUIRED_EXERCISE_FIELDS,
  DIFFICULTY_MAPPING,
  EQUIPMENT_CATEGORIES,
} from '../constants/exercise.constants';

/**
 * Validates an exercise object against required fields
 * @param {Object} exercise - Exercise object to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateExercise = (exercise) => {
  const errors = [];

  if (!exercise || typeof exercise !== 'object') {
    return { isValid: false, errors: ['Exercise must be an object'] };
  }

  // Check required fields
  REQUIRED_EXERCISE_FIELDS.forEach((field) => {
    if (!exercise[field]) {
      errors.push(`Missing required field: ${field}`);
    } else if (Array.isArray(exercise[field]) && exercise[field].length === 0) {
      errors.push(`Field ${field} cannot be empty array`);
    }
  });

  // Validate specific field formats
  if (exercise.primaryMuscles && !Array.isArray(exercise.primaryMuscles)) {
    errors.push('primaryMuscles must be an array');
  }

  if (exercise.secondaryMuscles && !Array.isArray(exercise.secondaryMuscles)) {
    errors.push('secondaryMuscles must be an array');
  }

  if (exercise.images && !Array.isArray(exercise.images)) {
    errors.push('images must be an array');
  }

  if (exercise.instructions && !Array.isArray(exercise.instructions)) {
    errors.push('instructions must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Formats exercise name for display
 * @param {string} name - Raw exercise name
 * @returns {string} Formatted exercise name
 */
export const formatExerciseName = (name) => {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncates exercise description to specified length
 * @param {string} description - Exercise description
 * @param {number} maxLength - Maximum length (default: 120)
 * @returns {string} Truncated description
 */
export const truncateDescription = (description, maxLength = 120) => {
  if (!description) return '';

  if (description.length <= maxLength) return description;

  const truncated = description.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

/**
 * Gets exercise difficulty order for sorting
 * @param {string} difficulty - Difficulty level
 * @returns {number} Difficulty order
 */
export const getDifficultyOrder = (difficulty) => {
  if (!difficulty) return 999;

  const mapping = DIFFICULTY_MAPPING[difficulty.toLowerCase()];
  return mapping ? mapping.order : 999;
};

/**
 * Gets equipment category for an exercise
 * @param {string} equipment - Equipment name
 * @returns {string} Equipment category
 */
export const getEquipmentCategory = (equipment) => {
  if (!equipment) return 'unknown';

  const equipmentLower = equipment.toLowerCase();

  for (const [category, equipmentList] of Object.entries(
    EQUIPMENT_CATEGORIES
  )) {
    if (equipmentList.includes(equipmentLower)) {
      return category.toLowerCase().replace('_', ' ');
    }
  }

  return 'other';
};

/**
 * Formats muscle groups for display
 * @param {Array} muscles - Array of muscle names
 * @param {number} maxDisplay - Maximum muscles to display (default: 2)
 * @returns {string} Formatted muscle groups string
 */
export const formatMuscleGroups = (muscles, maxDisplay = 2) => {
  if (!muscles || !Array.isArray(muscles)) return '';

  const formatted = muscles.map(
    (muscle) => muscle.charAt(0).toUpperCase() + muscle.slice(1).toLowerCase()
  );

  if (formatted.length <= maxDisplay) {
    return formatted.join(', ');
  }

  const displayed = formatted.slice(0, maxDisplay);
  const remaining = formatted.length - maxDisplay;

  return `${displayed.join(', ')} +${remaining} more`;
};

/**
 * Gets primary image for an exercise
 * @param {Object} exercise - Exercise object
 * @returns {string} Primary image URL or placeholder
 */
export const getPrimaryImage = (exercise) => {
  if (
    !exercise ||
    !exercise.images ||
    !Array.isArray(exercise.images) ||
    exercise.images.length === 0
  ) {
    return '/api/placeholder/500/300';
  }

  return exercise.images[0] || '/api/placeholder/500/300';
};

export const getPrepopulatedImage = (exercise) => {
  // Process images to include PUBLIC_URL
  const processedImages = Array.isArray(exercise.images)
    ? exercise.images.map((image) => {
        if (!image) return image;
        // Only prepend PUBLIC_URL if the image doesn't already have a protocol (http/https)
        if (
          image.startsWith('http://') ||
          image.startsWith('https://') ||
          image.startsWith('/api/')
        ) {
          return image;
        }
        return `${process.env.PUBLIC_URL || ''}${
          image.startsWith('/') ? image : `/${image}`
        }`;
      })
    : [];
  return processedImages;
};

/**
 * Sanitizes exercise data for safe display
 * @param {Object} exercise - Exercise object
 * @returns {Object} Sanitized exercise object
 */
export const sanitizeExercise = (exercise) => {
  if (!exercise) return null;

  return {
    ...exercise,
    name: formatExerciseName(exercise.name),
    description: exercise.description ? exercise.description.trim() : '',
    primaryMuscles: Array.isArray(exercise.primaryMuscles)
      ? exercise.primaryMuscles
      : [],
    secondaryMuscles: Array.isArray(exercise.secondaryMuscles)
      ? exercise.secondaryMuscles
      : [],
    images: getPrepopulatedImage(exercise),
    instructions: Array.isArray(exercise.instructions)
      ? exercise.instructions
      : [],
    equipment: exercise.equipment || 'body only',
    level: exercise.level || 'beginner',
    category: exercise.category || 'strength',
    force: exercise.force || null,
    mechanic: exercise.mechanic || null,
  };
};

/**
 * Sorts exercises by specified criteria
 * @param {Array} exercises - Array of exercises
 * @param {string} sortBy - Sort criteria ('name', 'difficulty', 'muscle', etc.)
 * @param {string} sortOrder - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted exercises array
 */
export const sortExercises = (
  exercises,
  sortBy = 'name',
  sortOrder = 'asc'
) => {
  if (!exercises || !Array.isArray(exercises)) return [];

  const sortedExercises = [...exercises].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name || '';
        bValue = b.name || '';
        break;
      case 'difficulty':
        aValue = getDifficultyOrder(a.level);
        bValue = getDifficultyOrder(b.level);
        break;
      case 'muscle':
        aValue = a.primaryMuscles?.[0] || '';
        bValue = b.primaryMuscles?.[0] || '';
        break;
      case 'equipment':
        aValue = a.equipment || '';
        bValue = b.equipment || '';
        break;
      default:
        aValue = a[sortBy] || '';
        bValue = b[sortBy] || '';
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return sortedExercises;
};
