// Workout Plan Management Utility Functions

/**
 * Filter workout plans by type
 * @param {Array} plans - Array of workout plan objects
 * @param {string} type - Type to filter by
 * @returns {Array} - Filtered workout plans
 */
export const filterPlansByType = (plans, type) => {
  if (!type || type === 'all') return plans;
  return plans.filter((plan) => plan.type === type);
};

/**
 * Filter workout plans by difficulty
 * @param {Array} plans - Array of workout plan objects
 * @param {string} difficulty - Difficulty to filter by
 * @returns {Array} - Filtered workout plans
 */
export const filterPlansByDifficulty = (plans, difficulty) => {
  if (!difficulty || difficulty === 'all') return plans;
  return plans.filter((plan) => plan.difficulty === difficulty);
};

/**
 * Filter workout plans by status
 * @param {Array} plans - Array of workout plan objects
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered workout plans
 */
export const filterPlansByStatus = (plans, status) => {
  if (!status || status === 'all') return plans;
  return plans.filter((plan) => plan.status === status);
};

/**
 * Search workout plans by name, description, or tags
 * @param {Array} plans - Array of workout plan objects
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered workout plans
 */
export const searchWorkoutPlans = (plans, searchTerm) => {
  if (!searchTerm) return plans;

  const term = searchTerm.toLowerCase();

  return plans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(term) ||
      plan.description.toLowerCase().includes(term) ||
      plan.trainerName.toLowerCase().includes(term) ||
      plan.memberName.toLowerCase().includes(term) ||
      (plan.tags && plan.tags.some((tag) => tag.toLowerCase().includes(term)))
  );
};

/**
 * Sort workout plans by specified field
 * @param {Array} plans - Array of workout plan objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted workout plans
 */
export const sortWorkoutPlans = (plans, field, direction = 'asc') => {
  return [...plans].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];

    // Handle dates
    if (field.includes('Date')) {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    // Handle strings
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

/**
 * Calculate total exercises in a workout plan
 * @param {Object} plan - Workout plan object
 * @returns {number} - Total number of exercises
 */
export const getTotalExercises = (plan) => {
  return plan.exercises ? plan.exercises.length : 0;
};

/**
 * Calculate estimated calories burned
 * @param {Object} plan - Workout plan object
 * @returns {number} - Estimated calories
 */
export const getEstimatedCalories = (plan) => {
  if (plan.calories) return plan.calories;

  // Basic estimation based on type and duration
  const baseRates = {
    strength: 4, // calories per minute
    cardio: 8,
    hiit: 10,
    flexibility: 2,
    balance: 3,
    functional: 6,
    sports: 7,
    rehabilitation: 2,
  };

  const rate = baseRates[plan.type] || 5;
  return Math.round(plan.duration * rate);
};

/**
 * Get difficulty color for Material-UI components
 * @param {string} difficulty - Difficulty level
 * @returns {string} - Material-UI color variant
 */
export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
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
};

/**
 * Get status color for Material-UI components
 * @param {string} status - Plan status
 * @returns {string} - Material-UI color variant
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'draft':
      return 'default';
    case 'completed':
      return 'info';
    case 'archived':
      return 'default';
    default:
      return 'default';
  }
};

/**
 * Generate workout plan statistics
 * @param {Array} plans - Array of workout plan objects
 * @returns {Object} - Statistics object
 */
export const getWorkoutPlanStats = (plans) => {
  return {
    total: plans.length,
    active: plans.filter((p) => p.status === 'active').length,
    draft: plans.filter((p) => p.status === 'draft').length,
    completed: plans.filter((p) => p.status === 'completed').length,
    archived: plans.filter((p) => p.status === 'archived').length,
    byType: {
      strength: plans.filter((p) => p.type === 'strength').length,
      cardio: plans.filter((p) => p.type === 'cardio').length,
      hiit: plans.filter((p) => p.type === 'hiit').length,
      flexibility: plans.filter((p) => p.type === 'flexibility').length,
    },
    byDifficulty: {
      beginner: plans.filter((p) => p.difficulty === 'beginner').length,
      intermediate: plans.filter((p) => p.difficulty === 'intermediate').length,
      advanced: plans.filter((p) => p.difficulty === 'advanced').length,
    },
    averageDuration:
      plans.length > 0
        ? Math.round(
            plans.reduce((sum, p) => sum + p.duration, 0) / plans.length
          )
        : 0,
    totalCalories: plans.reduce((sum, p) => sum + getEstimatedCalories(p), 0),
  };
};

/**
 * Validate workout plan data
 * @param {Object} planData - Workout plan data to validate
 * @returns {Object} - Validation result { isValid: boolean, errors: Array }
 */
export const validateWorkoutPlan = (planData) => {
  const errors = [];

  if (!planData.name || planData.name.trim().length === 0) {
    errors.push('Plan name is required');
  }

  if (!planData.type) {
    errors.push('Workout type is required');
  }

  if (!planData.difficulty) {
    errors.push('Difficulty level is required');
  }

  if (!planData.duration || planData.duration <= 0) {
    errors.push('Duration must be greater than 0');
  }

  if (planData.duration && planData.duration > 180) {
    errors.push('Duration cannot exceed 180 minutes');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Generate unique workout plan ID
 * @returns {string} - Unique ID
 */
export const generatePlanId = () => {
  return `WP${Date.now().toString(36).toUpperCase()}${Math.random()
    .toString(36)
    .substr(2, 2)
    .toUpperCase()}`;
};

/**
 * Format workout plan for export
 * @param {Object} plan - Workout plan object
 * @returns {Object} - Formatted plan data
 */
export const formatPlanForExport = (plan) => {
  return {
    name: plan.name,
    description: plan.description,
    type: plan.type,
    difficulty: plan.difficulty,
    duration: plan.duration,
    exercises: plan.exercises.map((exercise) => ({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      duration: exercise.duration,
      rest: exercise.rest,
      notes: exercise.notes,
    })),
    estimatedCalories: getEstimatedCalories(plan),
  };
};
