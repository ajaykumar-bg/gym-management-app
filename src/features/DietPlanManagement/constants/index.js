/**
 * Diet Plan Management Constants
 * Centralized constants for the diet plan management feature
 */

// Diet Plan Types
export const DIET_PLAN_TYPES = [
  'weight-loss',
  'muscle-gain',
  'maintenance',
  'cutting',
  'bulking',
  'therapeutic',
];

export const DIET_PLAN_TYPE_LABELS = {
  'weight-loss': 'Weight Loss',
  'muscle-gain': 'Muscle Gain',
  maintenance: 'Maintenance',
  cutting: 'Cutting',
  bulking: 'Bulking',
  therapeutic: 'Therapeutic',
};

// Diet Goals
export const DIET_GOALS = [
  'weight-loss',
  'muscle-gain',
  'maintenance',
  'strength-building',
  'endurance',
  'flexibility',
  'general-health',
];

export const DIET_GOAL_LABELS = {
  'weight-loss': 'Weight Loss',
  'muscle-gain': 'Muscle Gain',
  maintenance: 'Maintenance',
  'strength-building': 'Strength Building',
  endurance: 'Endurance',
  flexibility: 'Flexibility',
  'general-health': 'General Health',
};

// Meal Types
export const MEAL_TYPES = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'pre-workout',
  'post-workout',
];

export const MEAL_TYPE_LABELS = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
  'pre-workout': 'Pre-Workout',
  'post-workout': 'Post-Workout',
};

// Assignment Status
export const ASSIGNMENT_STATUS = [
  'active',
  'paused',
  'completed',
  'cancelled',
  'pending',
];

export const ASSIGNMENT_STATUS_LABELS = {
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled',
  pending: 'Pending',
};

// Status Colors
export const STATUS_COLORS = {
  active: 'success',
  paused: 'warning',
  completed: 'info',
  cancelled: 'error',
  pending: 'default',
};

// Diet Plan Status Colors
export const DIET_PLAN_STATUS_COLORS = {
  active: 'success',
  inactive: 'default',
};

// Diet Plan Type Colors
export const DIET_PLAN_TYPE_COLORS = {
  'weight-loss': 'error',
  'muscle-gain': 'success',
  maintenance: 'info',
  cutting: 'warning',
  bulking: 'secondary',
  therapeutic: 'primary',
};

// Activity Levels
export const ACTIVITY_LEVELS = [
  'sedentary',
  'low',
  'moderate',
  'high',
  'very-high',
];

export const ACTIVITY_LEVEL_LABELS = {
  sedentary: 'Sedentary',
  low: 'Low Active',
  moderate: 'Moderately Active',
  high: 'Very Active',
  'very-high': 'Extremely Active',
};

// Activity Level Multipliers for calorie calculation
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  low: 1.375,
  moderate: 1.55,
  high: 1.725,
  'very-high': 1.9,
};

// Dietary Restrictions
export const DIETARY_RESTRICTIONS = [
  'none',
  'vegetarian',
  'vegan',
  'gluten-free',
  'dairy-free',
  'keto',
  'paleo',
  'low-carb',
  'low-fat',
  'diabetic',
];

export const DIETARY_RESTRICTION_LABELS = {
  none: 'No Restrictions',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-Free',
  'dairy-free': 'Dairy-Free',
  keto: 'Ketogenic',
  paleo: 'Paleo',
  'low-carb': 'Low Carb',
  'low-fat': 'Low Fat',
  diabetic: 'Diabetic',
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#dc004e',
  SUCCESS: '#2e7d32',
  WARNING: '#ed6c02',
  ERROR: '#d32f2f',
  INFO: '#0288d1',
  PROTEIN: '#ff6b6b',
  CARBS: '#4ecdc4',
  FATS: '#ffe66d',
};

// Macro Nutrition Colors
export const MACRO_COLORS = {
  protein: CHART_COLORS.PROTEIN,
  carbs: CHART_COLORS.CARBS,
  fats: CHART_COLORS.FATS,
};

// Default Macro Ratios
export const DEFAULT_MACRO_RATIOS = {
  'weight-loss': { protein: 30, carbs: 40, fats: 30 },
  'muscle-gain': { protein: 35, carbs: 40, fats: 25 },
  maintenance: { protein: 25, carbs: 45, fats: 30 },
  cutting: { protein: 40, carbs: 30, fats: 30 },
  bulking: { protein: 30, carbs: 50, fats: 20 },
};

// Pagination
export const PAGINATION_OPTIONS = [10, 25, 50, 100];
export const DEFAULT_PAGE_SIZE = 25;

// Form Validation
export const VALIDATION_RULES = {
  PLAN_NAME_MIN_LENGTH: 3,
  PLAN_NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MIN_CALORIES: 800,
  MAX_CALORIES: 5000,
  MIN_DURATION: 7,
  MAX_DURATION: 365,
  MIN_PROTEIN: 10,
  MAX_PROTEIN: 50,
  MIN_CARBS: 20,
  MAX_CARBS: 70,
  MIN_FATS: 15,
  MAX_FATS: 50,
};

// UI Constants
export const DRAWER_WIDTH = 320;
export const MOBILE_BREAKPOINT = 'md';
export const CARD_ELEVATION = 2;
export const MODAL_MAX_WIDTH = 'md';

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'MMM dd, yyyy HH:mm',
};

// Export all constants
const dietPlanConstants = {
  DIET_PLAN_TYPES,
  DIET_PLAN_TYPE_LABELS,
  DIET_GOALS,
  DIET_GOAL_LABELS,
  MEAL_TYPES,
  MEAL_TYPE_LABELS,
  ASSIGNMENT_STATUS,
  ASSIGNMENT_STATUS_LABELS,
  STATUS_COLORS,
  DIET_PLAN_STATUS_COLORS,
  DIET_PLAN_TYPE_COLORS,
  ACTIVITY_LEVELS,
  ACTIVITY_LEVEL_LABELS,
  ACTIVITY_MULTIPLIERS,
  DIETARY_RESTRICTIONS,
  DIETARY_RESTRICTION_LABELS,
  CHART_COLORS,
  MACRO_COLORS,
  DEFAULT_MACRO_RATIOS,
  PAGINATION_OPTIONS,
  DEFAULT_PAGE_SIZE,
  VALIDATION_RULES,
  DRAWER_WIDTH,
  MOBILE_BREAKPOINT,
  CARD_ELEVATION,
  MODAL_MAX_WIDTH,
  DATE_FORMATS,
};

export default dietPlanConstants;
