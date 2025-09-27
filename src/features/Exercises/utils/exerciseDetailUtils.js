/**
 * Exercise Detail Utility Functions
 * Contains helper functions for ExerciseDetail components
 */

/**
 * Validates and processes exercise image array
 * @param {Array|string} images - Images array or single image
 * @returns {Array} Validated images array
 */
export const validateImageArray = (images) => {
  if (!images) return [];

  if (typeof images === 'string') {
    return [images];
  }

  if (Array.isArray(images)) {
    return images.filter((img) => img && typeof img === 'string' && img.trim());
  }

  return [];
};

/**
 * Gets the full image source path with PUBLIC_URL
 * @param {string} imagePath - Relative image path
 * @param {string} exerciseName - Exercise name for fallback
 * @returns {string} Full image source path
 */
export const getImageSrc = (imagePath, exerciseName = '') => {
  if (!imagePath || typeof imagePath !== 'string') return '';

  // If already a full URL, return as is
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  // Add PUBLIC_URL prefix for local images
  const publicUrl = process.env.PUBLIC_URL || '';
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  return `${publicUrl}${cleanPath}`;
};

/**
 * Formats muscle groups for display
 * @param {Array|string} muscles - Primary muscles array or string
 * @param {Array|string} secondaryMuscles - Secondary muscles array or string
 * @returns {Object} Formatted muscle groups with primary and secondary arrays
 */
export const formatMuscleGroups = (muscles = [], secondaryMuscles = []) => {
  const formatMuscleArray = (muscleData) => {
    if (!muscleData) return [];

    if (typeof muscleData === 'string') {
      return muscleData
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);
    }

    if (Array.isArray(muscleData)) {
      return muscleData
        .filter((m) => m && typeof m === 'string')
        .map((m) => m.trim());
    }

    return [];
  };

  return {
    primary: formatMuscleArray(muscles),
    secondary: formatMuscleArray(secondaryMuscles),
  };
};

/**
 * Gets appropriate chip color based on attribute type and value
 * @param {string} attribute - Attribute name (difficulty, force, mechanic, etc.)
 * @param {string} value - Attribute value
 * @returns {string} Material-UI chip color
 */
export const getChipColor = (attribute, value) => {
  if (!attribute || !value) return 'default';

  const attr = attribute.toLowerCase();
  const val = value.toLowerCase();

  switch (attr) {
    case 'difficulty':
      switch (val) {
        case 'beginner':
          return 'success';
        case 'intermediate':
          return 'warning';
        case 'advanced':
          return 'error';
        case 'expert':
          return 'error';
        default:
          return 'default';
      }

    case 'force':
      switch (val) {
        case 'push':
          return 'primary';
        case 'pull':
          return 'secondary';
        case 'static':
          return 'info';
        default:
          return 'default';
      }

    case 'mechanic':
      switch (val) {
        case 'compound':
          return 'primary';
        case 'isolation':
          return 'secondary';
        default:
          return 'default';
      }

    case 'category':
      return 'info';

    case 'equipment':
      if (val === 'none' || val === 'bodyweight') {
        return 'success';
      }
      return 'default';

    default:
      return 'default';
  }
};

/**
 * Gets formatted display label for chip attributes
 * @param {string} attribute - Attribute name
 * @param {string} value - Attribute value
 * @returns {string} Formatted display label
 */
export const getChipLabel = (attribute, value) => {
  if (!attribute || !value) return '';

  const attr = attribute.toLowerCase();
  const val = value.toString();

  switch (attr) {
    case 'primarymuscles':
    case 'primary_muscles':
      return `Primary: ${val}`;

    case 'secondarymuscles':
    case 'secondary_muscles':
      return `Secondary: ${val}`;

    case 'difficulty':
      return `${val.charAt(0).toUpperCase() + val.slice(1)} Level`;

    case 'equipment':
      if (val.toLowerCase() === 'none') {
        return 'Bodyweight';
      }
      return val;

    case 'force':
      return `${val.charAt(0).toUpperCase() + val.slice(1)} Movement`;

    case 'mechanic':
      return `${val.charAt(0).toUpperCase() + val.slice(1)} Exercise`;

    default:
      return val.charAt(0).toUpperCase() + val.slice(1);
  }
};

/**
 * Gets tooltip text for exercise attributes
 * @param {string} attribute - Attribute name
 * @param {string} value - Attribute value
 * @returns {string} Tooltip text
 */
export const getAttributeTooltip = (attribute, value) => {
  if (!attribute || !value) return '';

  const attr = attribute.toLowerCase();
  const val = value.toLowerCase();

  switch (attr) {
    case 'difficulty':
      switch (val) {
        case 'beginner':
          return 'Suitable for those new to exercise or this movement pattern';
        case 'intermediate':
          return 'Requires some experience and basic strength/mobility';
        case 'advanced':
          return 'Requires significant strength, skill, and experience';
        case 'expert':
          return 'Only for highly experienced individuals with exceptional strength/skill';
        default:
          return `Difficulty level: ${value}`;
      }

    case 'force':
      switch (val) {
        case 'push':
          return 'Movement involves pushing weight away from the body';
        case 'pull':
          return 'Movement involves pulling weight toward the body';
        case 'static':
          return 'Isometric exercise with no joint movement';
        default:
          return `Force type: ${value}`;
      }

    case 'mechanic':
      switch (val) {
        case 'compound':
          return 'Multi-joint exercise working several muscle groups';
        case 'isolation':
          return 'Single-joint exercise targeting specific muscles';
        default:
          return `Exercise mechanic: ${value}`;
      }

    case 'equipment':
      if (val === 'none' || val === 'bodyweight') {
        return 'No equipment required - uses bodyweight only';
      }
      return `Required equipment: ${value}`;

    case 'category':
      return `Exercise category: ${value}`;

    case 'primarymuscles':
    case 'primary_muscles':
      return `Primary muscles targeted by this exercise: ${value}`;

    case 'secondarymuscles':
    case 'secondary_muscles':
      return `Secondary muscles assisted during this exercise: ${value}`;

    default:
      return `${attribute}: ${value}`;
  }
};

/**
 * Validates and processes exercise instructions
 * @param {Array|string} instructions - Instructions array or string
 * @returns {Array} Validated instructions array
 */
export const validateInstructions = (instructions) => {
  if (!instructions) return [];

  if (typeof instructions === 'string') {
    // Split by common delimiters and clean up
    return instructions
      .split(/\n|\r\n|\.(?=\s[A-Z])|\d+\.|•|-/)
      .map((step) => step.trim())
      .filter((step) => step && step.length > 3)
      .map((step) => step.replace(/^\d+\.?\s*/, '').trim());
  }

  if (Array.isArray(instructions)) {
    return instructions
      .filter((step) => step && typeof step === 'string')
      .map((step) => step.trim())
      .filter((step) => step.length > 3);
  }

  return [];
};

/**
 * Formats individual instruction step
 * @param {string} instruction - Raw instruction text
 * @returns {string} Formatted instruction
 */
export const formatInstruction = (instruction) => {
  if (!instruction || typeof instruction !== 'string') return '';

  let formatted = instruction.trim();

  // Remove leading numbers or bullets
  formatted = formatted.replace(/^\d+\.?\s*/, '');
  formatted = formatted.replace(/^[•-]\s*/, '');

  // Ensure proper capitalization
  if (formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  // Ensure proper punctuation
  if (formatted && !formatted.match(/[.!?]$/)) {
    formatted += '.';
  }

  return formatted;
};

/**
 * Calculates image loading priority based on position
 * @param {number} index - Image index in array
 * @param {number} total - Total number of images
 * @returns {string} Loading priority ('high', 'low', 'lazy')
 */
export const getImageLoadingPriority = (index, total) => {
  if (index === 0) return 'high'; // First image should load immediately
  if (index < 3) return 'low'; // Next few images with normal priority
  return 'lazy'; // Rest can be lazy loaded
};

/**
 * Generates exercise sharing data
 * @param {Object} exercise - Exercise object
 * @returns {Object} Share data with title, description, url
 */
export const generateShareData = (exercise) => {
  if (!exercise) return null;

  const title = `${exercise.name} - Exercise Guide`;
  const description =
    exercise.instructions && exercise.instructions.length > 0
      ? `Learn how to perform ${
          exercise.name
        }. ${exercise.instructions[0]?.substring(0, 100)}...`
      : `Complete guide for ${exercise.name} exercise including form, muscles worked, and variations.`;

  const url = window.location.href;

  return {
    title,
    text: description,
    url,
  };
};

/**
 * Formats exercise statistics for display
 * @param {Object} stats - Exercise statistics object
 * @returns {Object} Formatted statistics
 */
export const formatExerciseStats = (stats) => {
  if (!stats || typeof stats !== 'object') return null;

  return {
    timesUsed: stats.timesUsed
      ? parseInt(stats.timesUsed).toLocaleString()
      : null,
    avgRating: stats.avgRating ? parseFloat(stats.avgRating).toFixed(1) : null,
    lastUsed: stats.lastUsed ? new Date(stats.lastUsed) : null,
    popularity: stats.popularity || null,
    difficulty: stats.difficulty || null,
  };
};

/**
 * Debounce function for search and other frequent operations
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
