/**
 * Workout Management Utilities
 * Helper functions for workout creation, exercise management, and progress tracking
 */

import exercisesData from '../Exercises/constants/exercises.json';
import {
  MUSCLE_GROUP_LABELS,
  WORKOUT_TEMPLATES,
  DEFAULT_SET_CONFIG,
  SET_STATUS,
  WORKOUT_STATUS,
  EQUIPMENT_CATEGORIES,
} from './workout.constants';

/**
 * Get all exercises from the exercises.json file
 */
export const getAllExercises = () => {
  return exercisesData || [];
};

/**
 * Search exercises by name, muscle group, or equipment
 */
export const searchExercises = (query, filters = {}) => {
  const exercises = getAllExercises();
  const searchTerm = (query || '').toLowerCase().trim();

  return exercises.filter((exercise) => {
    // Text search
    const matchesSearch =
      !searchTerm ||
      (exercise.name || '').toLowerCase().includes(searchTerm) ||
      (exercise.primaryMuscles || []).some((muscle) =>
        (muscle || '').toLowerCase().includes(searchTerm)
      ) ||
      (exercise.equipment || '').toLowerCase().includes(searchTerm);

    // Muscle group filter
    const matchesMuscleGroup =
      !filters.muscleGroup ||
      (exercise.primaryMuscles || []).includes(filters.muscleGroup) ||
      (exercise.secondaryMuscles || []).includes(filters.muscleGroup);

    // Equipment filter
    const matchesEquipment =
      !filters.equipment || exercise.equipment === filters.equipment;

    // Difficulty filter
    const matchesDifficulty =
      !filters.difficulty || exercise.level === filters.difficulty;

    // Category filter
    const matchesCategory =
      !filters.category || exercise.category === filters.category;

    return (
      matchesSearch &&
      matchesMuscleGroup &&
      matchesEquipment &&
      matchesDifficulty &&
      matchesCategory
    );
  });
};

/**
 * Get exercises by muscle group
 */
export const getExercisesByMuscleGroup = (muscleGroup, limit = null) => {
  const exercises = getAllExercises();
  const filtered = exercises.filter(
    (exercise) =>
      exercise.primaryMuscles.includes(muscleGroup) ||
      exercise.secondaryMuscles.includes(muscleGroup)
  );

  return limit ? filtered.slice(0, limit) : filtered;
};

/**
 * Get exercises by equipment type
 */
export const getExercisesByEquipment = (equipment) => {
  const exercises = getAllExercises();
  return exercises.filter((exercise) => exercise.equipment === equipment);
};

/**
 * Generate workout from template
 */
export const generateWorkoutFromTemplate = (templateId, customization = {}) => {
  const template = WORKOUT_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return null;

  const workout = {
    id: generateWorkoutId(),
    name: customization.name || template.name,
    description: template.description,
    category: template.category,
    targetMuscles: template.targetMuscles,
    estimatedDuration: template.estimatedDuration,
    difficulty: template.difficulty,
    exercises: [],
    status: WORKOUT_STATUS.DRAFT,
    createdAt: new Date().toISOString(),
    createdBy: customization.createdBy || null,
  };

  // Generate exercises based on template requirements
  template.exercises.forEach((requirement) => {
    const matchingExercises = findExercisesForRequirement(requirement);
    const selectedExercises = selectExercisesFromPool(
      matchingExercises,
      requirement.count
    );

    selectedExercises.forEach((exercise) => {
      workout.exercises.push(
        createWorkoutExercise(exercise, requirement.priority)
      );
    });
  });

  return workout;
};

/**
 * Find exercises that match template requirements
 */
const findExercisesForRequirement = (requirement) => {
  const allExercises = getAllExercises();

  return allExercises.filter((exercise) => {
    // Check if exercise targets required muscle groups
    const targetsRequiredMuscles = requirement.muscleGroups.some(
      (muscle) =>
        exercise.primaryMuscles.includes(muscle) ||
        exercise.secondaryMuscles.includes(muscle)
    );

    // Check category if specified
    const matchesCategory =
      !requirement.category ||
      (requirement.category === 'compound' &&
        exercise.mechanic === 'compound') ||
      (requirement.category === 'isolation' &&
        exercise.mechanic === 'isolation') ||
      (requirement.category === 'cardio' && exercise.category === 'cardio') ||
      (requirement.category === 'strength' && exercise.category === 'strength');

    return targetsRequiredMuscles && matchesCategory;
  });
};

/**
 * Select specific number of exercises from a pool
 */
const selectExercisesFromPool = (exercisePool, count) => {
  const shuffled = [...exercisePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Create workout exercise with sets configuration
 */
const createWorkoutExercise = (exercise, priority) => {
  const setsCount = getSetsCountByPriority(priority);
  const repsRange = getRepsRangeByPriority(priority);

  return {
    id: generateExerciseId(),
    exercise: exercise,
    sets: Array.from({ length: setsCount }, (_, index) => ({
      id: generateSetId(),
      setNumber: index + 1,
      targetReps: repsRange[Math.min(index, repsRange.length - 1)],
      actualReps: null,
      weight: 0,
      previousWeight: 0,
      status: SET_STATUS.PENDING,
      restTime: DEFAULT_SET_CONFIG.restTime,
      completedAt: null,
      notes: '',
    })),
    notes: '',
    priority: priority,
  };
};

/**
 * Get sets count based on exercise priority
 */
const getSetsCountByPriority = (priority) => {
  switch (priority) {
    case 'high':
      return 4;
    case 'medium':
      return 3;
    case 'low':
      return 2;
    default:
      return 3;
  }
};

/**
 * Get reps range based on exercise priority
 */
const getRepsRangeByPriority = (priority) => {
  switch (priority) {
    case 'high':
      return [6, 8, 10, 12];
    case 'medium':
      return [8, 10, 12];
    case 'low':
      return [12, 15];
    default:
      return [8, 10, 12];
  }
};

/**
 * Create custom workout
 */
export const createCustomWorkout = (workoutData) => {
  return {
    id: generateWorkoutId(),
    name: workoutData.name || 'Custom Workout',
    description: workoutData.description || '',
    category: 'custom',
    targetMuscles: workoutData.targetMuscles || [],
    estimatedDuration: workoutData.estimatedDuration || 60,
    difficulty: workoutData.difficulty || 'intermediate',
    exercises: [],
    status: WORKOUT_STATUS.DRAFT,
    createdAt: new Date().toISOString(),
    createdBy: workoutData.createdBy || null,
    isTemplate: workoutData.isTemplate || false,
  };
};

/**
 * Add exercise to workout
 */
export const addExerciseToWorkout = (workout, exercise, setsConfig = {}) => {
  const workoutExercise = {
    id: generateExerciseId(),
    exercise: exercise,
    sets: Array.from(
      { length: setsConfig.sets || DEFAULT_SET_CONFIG.sets },
      (_, index) => ({
        id: generateSetId(),
        setNumber: index + 1,
        targetReps:
          setsConfig.reps?.[index] ||
          DEFAULT_SET_CONFIG.reps[
            Math.min(index, DEFAULT_SET_CONFIG.reps.length - 1)
          ],
        actualReps: null,
        weight: setsConfig.weight || DEFAULT_SET_CONFIG.weight,
        previousWeight: 0,
        status: SET_STATUS.PENDING,
        restTime: setsConfig.restTime || DEFAULT_SET_CONFIG.restTime,
        completedAt: null,
        notes: '',
      })
    ),
    notes: '',
    priority: setsConfig.priority || 'medium',
  };

  return {
    ...workout,
    exercises: [...workout.exercises, workoutExercise],
    targetMuscles: updateTargetMuscles(
      workout.targetMuscles,
      exercise.primaryMuscles
    ),
  };
};

/**
 * Remove exercise from workout
 */
export const removeExerciseFromWorkout = (workout, exerciseId) => {
  return {
    ...workout,
    exercises: workout.exercises.filter((ex) => ex.id !== exerciseId),
  };
};

/**
 * Complete a set
 */
export const completeSet = (workout, exerciseId, setId, setData) => {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: exercise.sets.map((set) => {
            if (set.id === setId) {
              return {
                ...set,
                actualReps: setData.reps,
                weight: setData.weight,
                status: SET_STATUS.COMPLETED,
                completedAt: new Date().toISOString(),
                notes: setData.notes || '',
              };
            }
            return set;
          }),
        };
      }
      return exercise;
    }),
  };
};

/**
 * Mark set as failed/skipped
 */
export const failSet = (workout, exerciseId, setId, reason = '') => {
  return {
    ...workout,
    exercises: workout.exercises.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          sets: exercise.sets.map((set) => {
            if (set.id === setId) {
              return {
                ...set,
                status: SET_STATUS.FAILED,
                completedAt: new Date().toISOString(),
                notes: reason,
              };
            }
            return set;
          }),
        };
      }
      return exercise;
    }),
  };
};

/**
 * Get workout progress
 */
export const getWorkoutProgress = (workout) => {
  if (!workout.exercises.length)
    return { percentage: 0, completedSets: 0, totalSets: 0 };

  const totalSets = workout.exercises.reduce(
    (sum, exercise) => sum + exercise.sets.length,
    0
  );
  const completedSets = workout.exercises.reduce(
    (sum, exercise) =>
      sum +
      exercise.sets.filter((set) => set.status === SET_STATUS.COMPLETED).length,
    0
  );

  return {
    percentage:
      totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0,
    completedSets,
    totalSets,
    isCompleted: completedSets === totalSets && totalSets > 0,
  };
};

/**
 * Complete workout
 */
export const completeWorkout = (workout) => {
  return {
    ...workout,
    status: WORKOUT_STATUS.COMPLETED,
    completedAt: new Date().toISOString(),
    actualDuration: null, // This would be calculated based on start/end times
  };
};

/**
 * Get muscle groups from exercises
 */
export const getMuscleGroupsFromExercises = (exercises) => {
  const muscleGroups = new Set();

  exercises.forEach((exerciseData) => {
    const exercise = exerciseData.exercise;
    exercise.primaryMuscles.forEach((muscle) => muscleGroups.add(muscle));
    exercise.secondaryMuscles.forEach((muscle) => muscleGroups.add(muscle));
  });

  return Array.from(muscleGroups);
};

/**
 * Update target muscles when adding exercises
 */
const updateTargetMuscles = (currentMuscles, newMuscles) => {
  const muscleSet = new Set([...currentMuscles, ...newMuscles]);
  return Array.from(muscleSet);
};

/**
 * Get exercise statistics
 */
export const getExerciseStats = (exercises) => {
  const stats = {
    totalExercises: exercises.length,
    byMuscleGroup: {},
    byEquipment: {},
    byDifficulty: {},
    byCategory: {},
  };

  exercises.forEach((exerciseData) => {
    const exercise = exerciseData.exercise;

    // Count by muscle group
    exercise.primaryMuscles.forEach((muscle) => {
      stats.byMuscleGroup[muscle] = (stats.byMuscleGroup[muscle] || 0) + 1;
    });

    // Count by equipment
    stats.byEquipment[exercise.equipment] =
      (stats.byEquipment[exercise.equipment] || 0) + 1;

    // Count by difficulty
    stats.byDifficulty[exercise.level] =
      (stats.byDifficulty[exercise.level] || 0) + 1;

    // Count by category
    stats.byCategory[exercise.category] =
      (stats.byCategory[exercise.category] || 0) + 1;
  });

  return stats;
};

/**
 * Filter workouts based on criteria
 */
export const filterWorkouts = (workouts, filters = {}) => {
  return workouts.filter((workout) => {
    const matchesSearch =
      !filters.search ||
      (workout.name || '')
        .toLowerCase()
        .includes((filters.search || '').toLowerCase()) ||
      (workout.description || '')
        .toLowerCase()
        .includes((filters.search || '').toLowerCase());

    const matchesCategory =
      !filters.category || workout.category === filters.category;
    const matchesDifficulty =
      !filters.difficulty || workout.difficulty === filters.difficulty;
    const matchesStatus = !filters.status || workout.status === filters.status;

    return (
      matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
    );
  });
};

/**
 * Sort workouts by criteria
 */
export const sortWorkouts = (workouts, sortBy, sortOrder = 'asc') => {
  const sorted = [...workouts].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = (a.name || '').toLowerCase();
        bValue = (b.name || '').toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'duration':
        aValue = a.estimatedDuration;
        bValue = b.estimatedDuration;
        break;
      case 'difficulty':
        const difficultyOrder = { beginner: 1, intermediate: 2, expert: 3 };
        aValue = difficultyOrder[a.difficulty] || 2;
        bValue = difficultyOrder[b.difficulty] || 2;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Validate workout data
 */
export const validateWorkoutData = (workoutData) => {
  if (!workoutData) return false;

  const hasName = workoutData.name && workoutData.name.trim().length > 0;
  const hasExercises =
    workoutData.exercises && workoutData.exercises.length > 0;

  return hasName && hasExercises;
};

/**
 * Get validation errors for workout
 */
export const getWorkoutValidationErrors = (workoutData) => {
  const errors = {};

  if (!workoutData.name?.trim()) {
    errors.name = 'Workout name is required';
  }

  if (!workoutData.exercises?.length) {
    errors.exercises = 'At least one exercise is required';
  }

  if (workoutData.estimatedDuration < 1) {
    errors.estimatedDuration = 'Duration must be at least 1 minute';
  }

  return errors;
};

// ID generation functions
export const generateWorkoutId = () =>
  `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
export const generateExerciseId = () =>
  `exercise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
export const generateSetId = () =>
  `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Get equipment categories for filtering
 */
export const getEquipmentCategories = () => {
  return Object.keys(EQUIPMENT_CATEGORIES).map((key) => ({
    value: key,
    label: EQUIPMENT_CATEGORIES[key],
  }));
};

/**
 * Get muscle group options for filtering
 */
export const getMuscleGroupOptions = () => {
  return Object.keys(MUSCLE_GROUP_LABELS).map((key) => ({
    value: key,
    label: MUSCLE_GROUP_LABELS[key],
  }));
};

/**
 * Format exercise for display
 */
export const formatExerciseForDisplay = (exercise) => {
  return {
    ...exercise,
    primaryMusclesFormatted: exercise.primaryMuscles
      .map((muscle) => MUSCLE_GROUP_LABELS[muscle] || muscle)
      .join(', '),
    equipmentFormatted:
      EQUIPMENT_CATEGORIES[exercise.equipment] || exercise.equipment,
    difficultyFormatted:
      exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1),
  };
};
