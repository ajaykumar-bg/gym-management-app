/**
 * Diet Plan Utility Functions
 * Helper functions for diet plan calculations and formatting
 */

import { ACTIVITY_MULTIPLIERS, MACRO_COLORS } from '../constants';

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - Gender ('male' or 'female')
 * @returns {number} BMR in calories
 */
export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age || !gender) return 0;

  const baseMetabolism = 10 * weight + 6.25 * height - 5 * age;

  if (gender.toLowerCase() === 'male') {
    return Math.round(baseMetabolism + 5);
  } else {
    return Math.round(baseMetabolism - 161);
  }
};

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level key
 * @returns {number} TDEE in calories
 */
export const calculateTDEE = (bmr, activityLevel) => {
  if (!bmr || !activityLevel) return 0;

  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate daily macro targets based on calories and ratios
 * @param {number} calories - Target daily calories
 * @param {Object} macroRatios - Object with protein, carbs, fats percentages
 * @returns {Object} Macro targets in grams
 */
export const calculateMacroTargets = (calories, macroRatios) => {
  if (!calories || !macroRatios) return { protein: 0, carbs: 0, fats: 0 };

  const { protein, carbs, fats } = macroRatios;

  return {
    protein: Math.round((calories * (protein / 100)) / 4), // 4 calories per gram
    carbs: Math.round((calories * (carbs / 100)) / 4), // 4 calories per gram
    fats: Math.round((calories * (fats / 100)) / 9), // 9 calories per gram
  };
};

/**
 * Calculate total calories from macro grams
 * @param {number} protein - Protein in grams
 * @param {number} carbs - Carbohydrates in grams
 * @param {number} fats - Fats in grams
 * @returns {number} Total calories
 */
export const calculateCaloriesFromMacros = (protein, carbs, fats) => {
  return protein * 4 + carbs * 4 + fats * 9;
};

/**
 * Calculate adherence percentage
 * @param {number} completedDays - Number of completed days
 * @param {number} totalDays - Total planned days
 * @returns {number} Adherence percentage
 */
export const calculateAdherence = (completedDays, totalDays) => {
  if (!totalDays || totalDays === 0) return 0;
  return Math.round((completedDays / totalDays) * 100);
};

/**
 * Calculate progress percentage
 * @param {Date} startDate - Plan start date
 * @param {Date} endDate - Plan end date
 * @param {Date} currentDate - Current date (optional, defaults to now)
 * @returns {number} Progress percentage
 */
export const calculateProgress = (
  startDate,
  endDate,
  currentDate = new Date()
) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);
  const current = new Date(currentDate);

  if (current < start) return 0;
  if (current > end) return 100;

  const totalDuration = end - start;
  const elapsed = current - start;

  return Math.round((elapsed / totalDuration) * 100);
};

/**
 * Format calories with unit
 * @param {number} calories - Calorie value
 * @returns {string} Formatted calories
 */
export const formatCalories = (calories) => {
  if (!calories || calories === 0) return '0 cal';
  return `${calories.toLocaleString()} cal`;
};

/**
 * Format weight with unit
 * @param {number} weight - Weight value
 * @param {string} unit - Unit ('kg' or 'lbs')
 * @returns {string} Formatted weight
 */
export const formatWeight = (weight, unit = 'kg') => {
  if (weight === null || weight === undefined) return '0 kg';
  return `${weight.toFixed(1)} ${unit}`;
};

/**
 * Format measurement change with unit
 * @param {number} change - Change value
 * @param {string} unit - Unit (default 'cm')
 * @returns {string} Formatted change with direction indicator
 */
export const formatMeasurementChange = (change, unit = 'cm') => {
  if (change === null || change === undefined || change === 0) return '0 cm';

  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)} ${unit}`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === null || value === undefined) return '0%';
  return `${value.toFixed(decimals)}%`;
};

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'input')
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) return '';

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    case 'long':
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'input':
      return dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format for input fields
    case 'time':
      return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    case 'full':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return dateObj.toLocaleDateString();
  }
};

/**
 * Get status color based on adherence percentage
 * @param {number} adherence - Adherence percentage
 * @returns {string} MUI color name
 */
export const getAdherenceColor = (adherence) => {
  if (adherence >= 90) return 'success';
  if (adherence >= 70) return 'warning';
  return 'error';
};

/**
 * Get macro color for charts
 * @param {string} macroType - Macro type (protein, carbs, fats)
 * @returns {string} Color hex code
 */
export const getMacroColor = (macroType) => {
  return MACRO_COLORS[macroType.toLowerCase()] || '#cccccc';
};

/**
 * Calculate days remaining in diet plan
 * @param {Date} endDate - Plan end date
 * @param {Date} currentDate - Current date (optional, defaults to now)
 * @returns {number} Days remaining
 */
export const getDaysRemaining = (endDate, currentDate = new Date()) => {
  if (!endDate) return 0;

  const end = new Date(endDate);
  const current = new Date(currentDate);

  if (current > end) return 0;

  const diffTime = end - current;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};

/**
 * Validate macro ratios (should sum to 100%)
 * @param {Object} macroRatios - Object with protein, carbs, fats percentages
 * @returns {boolean} True if valid
 */
export const validateMacroRatios = (macroRatios) => {
  if (!macroRatios) return false;

  const { protein, carbs, fats } = macroRatios;
  const total = (protein || 0) + (carbs || 0) + (fats || 0);

  return Math.abs(total - 100) < 0.1; // Allow small floating point discrepancies
};

/**
 * Generate meal time suggestions based on meal type
 * @param {string} mealType - Meal type
 * @returns {string} Suggested time
 */
export const getMealTimesSuggestion = (mealType) => {
  const suggestions = {
    breakfast: '07:00',
    'mid-morning': '10:00',
    lunch: '12:30',
    'afternoon-snack': '15:30',
    'pre-workout': '16:00',
    'post-workout': '17:30',
    dinner: '19:00',
    'evening-snack': '21:00',
  };

  return suggestions[mealType] || '12:00';
};

/**
 * Sort assignments by priority (active first, then by date)
 * @param {Array} assignments - Array of diet plan assignments
 * @returns {Array} Sorted assignments
 */
export const sortAssignmentsByPriority = (assignments) => {
  if (!Array.isArray(assignments)) return [];

  return [...assignments].sort((a, b) => {
    // Status priority: active > pending > paused > completed > cancelled
    const statusPriority = {
      active: 1,
      pending: 2,
      paused: 3,
      completed: 4,
      cancelled: 5,
    };

    const aPriority = statusPriority[a.status] || 99;
    const bPriority = statusPriority[b.status] || 99;

    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }

    // If same status, sort by assigned date (most recent first)
    return new Date(b.assignedDate) - new Date(a.assignedDate);
  });
};

/**
 * Filter assignments by search term
 * @param {Array} assignments - Array of assignments
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered assignments
 */
export const filterAssignments = (assignments, searchTerm) => {
  if (!searchTerm || !Array.isArray(assignments)) return assignments;

  const term = searchTerm.toLowerCase();

  return assignments.filter((assignment) => {
    return (
      assignment.memberName?.toLowerCase().includes(term) ||
      assignment.memberEmail?.toLowerCase().includes(term) ||
      assignment.status?.toLowerCase().includes(term) ||
      assignment.notes?.toLowerCase().includes(term)
    );
  });
};

/**
 * Generate chart data for macro distribution
 * @param {Object} macros - Macro values in grams
 * @returns {Array} Chart data array
 */
export const generateMacroChartData = (macros) => {
  if (!macros) return [];

  return [
    {
      id: 'protein',
      label: 'Protein',
      value: macros.protein || 0,
      color: getMacroColor('protein'),
    },
    {
      id: 'carbs',
      label: 'Carbohydrates',
      value: macros.carbs || 0,
      color: getMacroColor('carbs'),
    },
    {
      id: 'fats',
      label: 'Fats',
      value: macros.fats || 0,
      color: getMacroColor('fats'),
    },
  ];
};

/**
 * Calculate recommended water intake based on weight and activity
 * @param {number} weight - Weight in kg
 * @param {string} activityLevel - Activity level
 * @returns {number} Recommended water intake in ml
 */
export const calculateWaterIntake = (weight, activityLevel) => {
  if (!weight) return 2000; // Default 2L

  // Base: 35ml per kg of body weight
  let baseIntake = weight * 35;

  // Activity multiplier
  const activityMultiplier = {
    sedentary: 1.0,
    low: 1.1,
    moderate: 1.2,
    high: 1.3,
    'very-high': 1.4,
  };

  const multiplier = activityMultiplier[activityLevel] || 1.0;

  return Math.round(baseIntake * multiplier);
};

const dietPlanUtils = {
  calculateBMR,
  calculateTDEE,
  calculateMacroTargets,
  calculateCaloriesFromMacros,
  calculateAdherence,
  calculateProgress,
  formatCalories,
  formatWeight,
  formatMeasurementChange,
  formatPercentage,
  formatDate,
  getAdherenceColor,
  getMacroColor,
  getDaysRemaining,
  validateMacroRatios,
  getMealTimesSuggestion,
  sortAssignmentsByPriority,
  filterAssignments,
  generateMacroChartData,
  calculateWaterIntake,
};

export default dietPlanUtils;
