/**
 * Exercise data structure and validation constants
 */

/**
 * Required fields for exercise validation
 */
export const REQUIRED_EXERCISE_FIELDS = [
  'name',
  'primaryMuscles',
  'equipment',
  'level',
  'category',
  'images',
  'instructions',
];

/**
 * Optional exercise fields
 */
export const OPTIONAL_EXERCISE_FIELDS = [
  'secondaryMuscles',
  'force',
  'mechanic',
  'description',
];

/**
 * Exercise difficulty levels mapping
 */
export const DIFFICULTY_MAPPING = {
  beginner: { label: 'Beginner', order: 1 },
  intermediate: { label: 'Intermediate', order: 2 },
  expert: { label: 'Expert', order: 3 },
};

/**
 * Exercise categories with descriptions
 */
export const CATEGORY_DESCRIPTIONS = {
  strength:
    'Resistance training exercises focusing on building muscle strength',
  stretching: 'Flexibility and mobility exercises',
  plyometrics: 'Explosive movement exercises for power development',
  strongman: 'Functional strength exercises with heavy implements',
  powerlifting:
    'Competition-focused strength exercises (squat, bench, deadlift)',
  cardio: 'Cardiovascular endurance exercises',
  'olympic weightlifting': 'Technical barbell lifts (snatch, clean & jerk)',
};

/**
 * Equipment categories
 */
export const EQUIPMENT_CATEGORIES = {
  FREE_WEIGHTS: ['barbell', 'dumbbell', 'kettlebells'],
  MACHINES: ['machine', 'cable'],
  BODYWEIGHT: ['body only'],
  ACCESSORIES: ['bands', 'medicine ball', 'exercise ball', 'foam roll'],
  SPECIALTY: ['e-z curl bar', 'other'],
};
