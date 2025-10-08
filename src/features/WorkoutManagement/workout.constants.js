/**
 * Workout Management Constants
 * Defines workout templates, muscle groups, and exercise categories
 */

// Muscle group mappings
export const MUSCLE_GROUPS = {
  CHEST: 'chest',
  SHOULDERS: 'shoulders',
  TRICEPS: 'triceps',
  BACK: 'middle back',
  LATS: 'lats',
  BICEPS: 'biceps',
  FOREARMS: 'forearms',
  LEGS: 'quadriceps',
  QUADS: 'quadriceps',
  HAMSTRINGS: 'hamstrings',
  GLUTES: 'glutes',
  CALVES: 'calves',
  ABS: 'abdominals',
  CORE: 'abdominals',
};

// Workout template categories
export const WORKOUT_CATEGORIES = {
  PUSH_PULL_LEGS: 'Push/Pull/Legs',
  BODY_PARTS: 'Body Parts',
  FULL_BODY: 'Full Body',
  STRENGTH: 'Strength',
  CARDIO: 'Cardio',
  CUSTOM: 'Custom',
};

// Default workout templates
export const WORKOUT_TEMPLATES = [
  // Push/Pull/Legs Split
  {
    id: 'push-1',
    name: 'Push Day - Chest, Shoulders, Triceps',
    category: WORKOUT_CATEGORIES.PUSH_PULL_LEGS,
    description:
      'Focus on pushing movements targeting chest, shoulders, and triceps',
    targetMuscles: [
      MUSCLE_GROUPS.CHEST,
      MUSCLE_GROUPS.SHOULDERS,
      MUSCLE_GROUPS.TRICEPS,
    ],
    estimatedDuration: 60,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.SHOULDERS],
        count: 2,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.CHEST],
        count: 2,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.SHOULDERS],
        count: 2,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.TRICEPS],
        count: 2,
        priority: 'low',
      },
    ],
  },
  {
    id: 'pull-1',
    name: 'Pull Day - Back, Biceps',
    category: WORKOUT_CATEGORIES.PUSH_PULL_LEGS,
    description: 'Focus on pulling movements targeting back and biceps',
    targetMuscles: [
      MUSCLE_GROUPS.BACK,
      MUSCLE_GROUPS.LATS,
      MUSCLE_GROUPS.BICEPS,
    ],
    estimatedDuration: 60,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LATS],
        count: 3,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.BACK],
        count: 2,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.BICEPS],
        count: 3,
        priority: 'medium',
      },
    ],
  },
  {
    id: 'legs-1',
    name: 'Leg Day - Quads, Hamstrings, Glutes, Calves',
    category: WORKOUT_CATEGORIES.PUSH_PULL_LEGS,
    description: 'Comprehensive lower body workout',
    targetMuscles: [
      MUSCLE_GROUPS.QUADS,
      MUSCLE_GROUPS.HAMSTRINGS,
      MUSCLE_GROUPS.GLUTES,
      MUSCLE_GROUPS.CALVES,
    ],
    estimatedDuration: 75,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.QUADS, MUSCLE_GROUPS.GLUTES],
        count: 2,
        priority: 'high',
      },
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.HAMSTRINGS, MUSCLE_GROUPS.GLUTES],
        count: 2,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.QUADS],
        count: 2,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.HAMSTRINGS],
        count: 1,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.CALVES],
        count: 2,
        priority: 'low',
      },
    ],
  },

  // Body Part Split
  {
    id: 'chest-1',
    name: 'Chest Focus',
    category: WORKOUT_CATEGORIES.BODY_PARTS,
    description: 'Comprehensive chest development workout',
    targetMuscles: [MUSCLE_GROUPS.CHEST],
    estimatedDuration: 45,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.CHEST],
        count: 2,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.CHEST],
        count: 4,
        priority: 'medium',
      },
    ],
  },
  {
    id: 'back-1',
    name: 'Back Focus',
    category: WORKOUT_CATEGORIES.BODY_PARTS,
    description: 'Complete back development workout',
    targetMuscles: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LATS],
    estimatedDuration: 50,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.BACK, MUSCLE_GROUPS.LATS],
        count: 3,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.BACK],
        count: 3,
        priority: 'medium',
      },
    ],
  },
  {
    id: 'shoulders-1',
    name: 'Shoulder Focus',
    category: WORKOUT_CATEGORIES.BODY_PARTS,
    description: 'Complete shoulder development workout',
    targetMuscles: [MUSCLE_GROUPS.SHOULDERS],
    estimatedDuration: 45,
    difficulty: 'intermediate',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.SHOULDERS],
        count: 2,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.SHOULDERS],
        count: 4,
        priority: 'medium',
      },
    ],
  },
  {
    id: 'arms-1',
    name: 'Arms Focus - Biceps & Triceps',
    category: WORKOUT_CATEGORIES.BODY_PARTS,
    description: 'Dedicated arm workout for biceps and triceps',
    targetMuscles: [MUSCLE_GROUPS.BICEPS, MUSCLE_GROUPS.TRICEPS],
    estimatedDuration: 40,
    difficulty: 'beginner',
    exercises: [
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.BICEPS],
        count: 3,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.TRICEPS],
        count: 3,
        priority: 'high',
      },
    ],
  },
  {
    id: 'abs-1',
    name: 'Core & Abs Focus',
    category: WORKOUT_CATEGORIES.BODY_PARTS,
    description: 'Comprehensive core strengthening workout',
    targetMuscles: [MUSCLE_GROUPS.ABS],
    estimatedDuration: 30,
    difficulty: 'beginner',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.ABS],
        count: 2,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.ABS],
        count: 4,
        priority: 'medium',
      },
    ],
  },

  // Full Body
  {
    id: 'full-body-1',
    name: 'Full Body Beginner',
    category: WORKOUT_CATEGORIES.FULL_BODY,
    description: 'Complete full body workout for beginners',
    targetMuscles: [
      MUSCLE_GROUPS.CHEST,
      MUSCLE_GROUPS.BACK,
      MUSCLE_GROUPS.SHOULDERS,
      MUSCLE_GROUPS.LEGS,
    ],
    estimatedDuration: 60,
    difficulty: 'beginner',
    exercises: [
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.CHEST, MUSCLE_GROUPS.SHOULDERS],
        count: 1,
        priority: 'high',
      },
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.BACK],
        count: 1,
        priority: 'high',
      },
      {
        category: 'compound',
        muscleGroups: [MUSCLE_GROUPS.LEGS],
        count: 1,
        priority: 'high',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.BICEPS],
        count: 1,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.TRICEPS],
        count: 1,
        priority: 'medium',
      },
      {
        category: 'isolation',
        muscleGroups: [MUSCLE_GROUPS.ABS],
        count: 2,
        priority: 'low',
      },
    ],
  },
];

// Workout status constants
export const WORKOUT_STATUS = {
  DRAFT: 'draft',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  PAUSED: 'paused',
};

// Set status constants
export const SET_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

// Exercise difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert',
};

// Default set configurations
export const DEFAULT_SET_CONFIG = {
  sets: 3,
  reps: [8, 10, 12],
  weight: 0,
  restTime: 60, // seconds
};

// Exercise equipment mapping for filtering
export const EQUIPMENT_CATEGORIES = {
  'body only': 'Bodyweight',
  machine: 'Machine',
  dumbbell: 'Dumbbell',
  barbell: 'Barbell',
  cable: 'Cable',
  kettlebell: 'Kettlebell',
  bands: 'Resistance Bands',
  'medicine ball': 'Medicine Ball',
  'foam roll': 'Foam Roller',
  other: 'Other',
};

// Muscle group display names
export const MUSCLE_GROUP_LABELS = {
  [MUSCLE_GROUPS.CHEST]: 'Chest',
  [MUSCLE_GROUPS.SHOULDERS]: 'Shoulders',
  [MUSCLE_GROUPS.TRICEPS]: 'Triceps',
  [MUSCLE_GROUPS.BACK]: 'Back',
  [MUSCLE_GROUPS.LATS]: 'Lats',
  [MUSCLE_GROUPS.BICEPS]: 'Biceps',
  [MUSCLE_GROUPS.FOREARMS]: 'Forearms',
  [MUSCLE_GROUPS.QUADS]: 'Quadriceps',
  [MUSCLE_GROUPS.HAMSTRINGS]: 'Hamstrings',
  [MUSCLE_GROUPS.GLUTES]: 'Glutes',
  [MUSCLE_GROUPS.CALVES]: 'Calves',
  [MUSCLE_GROUPS.ABS]: 'Abdominals',
  adductors: 'Adductors',
  traps: 'Traps',
  neck: 'Neck',
};
