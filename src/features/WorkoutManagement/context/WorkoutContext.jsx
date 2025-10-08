/**
 * Workout Management Context
 * Centralized state management for Workout Management feature
 */

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  searchExercises,
  generateWorkoutFromTemplate,
  createCustomWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  completeSet,
  failSet,
  completeWorkout,
  getWorkoutProgress,
  filterWorkouts,
  sortWorkouts,
  validateWorkoutData,
} from '../workout.utils';
import { WORKOUT_TEMPLATES, WORKOUT_STATUS } from '../workout.constants';

const WorkoutContext = createContext(undefined);

export const WorkoutProvider = ({ children }) => {
  // Core state
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState(null);

  // UI state
  const [view, setView] = useState('list'); // 'list', 'create', 'workout', 'templates'
  const [showExerciseSearch, setShowExerciseSearch] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Search and filter state
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [exerciseFilters, setExerciseFilters] = useState({
    muscleGroup: '',
    equipment: '',
    difficulty: '',
    category: '',
  });

  const [workoutFilters, setWorkoutFilters] = useState({
    search: '',
    category: '',
    difficulty: '',
    status: '',
  });

  const [workoutSort, setWorkoutSort] = useState({
    field: 'createdAt',
    direction: 'desc',
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Snackbar actions
  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Navigation actions
  const navigateToList = useCallback(() => {
    setView('list');
    setCurrentWorkout(null);
  }, []);

  const navigateToCreate = useCallback(() => {
    setView('create');
    setCurrentWorkout(null);
  }, []);

  const navigateToTemplates = useCallback(() => {
    setView('templates');
  }, []);

  const navigateToWorkout = useCallback((workout) => {
    setCurrentWorkout(workout);
    setView('workout');
  }, []);

  const openExerciseSearch = useCallback(() => {
    setShowExerciseSearch(true);
  }, []);

  const closeExerciseSearch = useCallback(() => {
    setShowExerciseSearch(false);
  }, []);

  // Workout CRUD operations
  const createWorkout = useCallback(
    (workoutData) => {
      if (!validateWorkoutData(workoutData)) {
        showSnackbar('Please provide valid workout data', 'error');
        return false;
      }

      const newWorkout = createCustomWorkout({
        ...workoutData,
        createdBy: workoutData.createdBy || 'current-user', // Would come from auth context
      });

      setWorkouts((prev) => [newWorkout, ...prev]);
      showSnackbar('Workout created successfully');
      navigateToWorkout(newWorkout);
      return true;
    },
    [showSnackbar, navigateToWorkout]
  );

  const createWorkoutFromTemplate = useCallback(
    (templateId, customization = {}) => {
      const workout = generateWorkoutFromTemplate(templateId, {
        ...customization,
        createdBy: 'current-user', // Would come from auth context
      });

      if (!workout) {
        showSnackbar('Template not found', 'error');
        return false;
      }

      setWorkouts((prev) => [workout, ...prev]);
      showSnackbar(`Workout created from template: ${workout.name}`);
      navigateToWorkout(workout);
      return true;
    },
    [showSnackbar, navigateToWorkout]
  );

  const updateWorkout = useCallback(
    (workoutId, updates) => {
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === workoutId ? { ...workout, ...updates } : workout
        )
      );

      if (currentWorkout?.id === workoutId) {
        setCurrentWorkout((prev) => ({ ...prev, ...updates }));
      }
    },
    [currentWorkout]
  );

  const deleteWorkout = useCallback(
    (workoutId) => {
      if (window.confirm('Are you sure you want to delete this workout?')) {
        setWorkouts((prev) =>
          prev.filter((workout) => workout.id !== workoutId)
        );

        if (currentWorkout?.id === workoutId) {
          navigateToList();
        }

        showSnackbar('Workout deleted successfully');
        return true;
      }
      return false;
    },
    [currentWorkout, navigateToList, showSnackbar]
  );

  const duplicateWorkout = useCallback(
    (workout) => {
      const duplicatedWorkout = {
        ...workout,
        id: `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: `${workout.name} (Copy)`,
        status: WORKOUT_STATUS.DRAFT,
        createdAt: new Date().toISOString(),
        completedAt: null,
        exercises: workout.exercises.map((exercise) => ({
          ...exercise,
          id: `exercise_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          sets: exercise.sets.map((set) => ({
            ...set,
            id: `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            status: 'pending',
            actualReps: null,
            completedAt: null,
            notes: '',
          })),
        })),
      };

      setWorkouts((prev) => [duplicatedWorkout, ...prev]);
      showSnackbar('Workout duplicated successfully');
      return duplicatedWorkout;
    },
    [showSnackbar]
  );

  // Exercise operations
  const addExerciseToCurrentWorkout = useCallback(
    (exercise, setsConfig) => {
      if (!currentWorkout) return false;

      const updatedWorkout = addExerciseToWorkout(
        currentWorkout,
        exercise,
        setsConfig
      );
      setCurrentWorkout(updatedWorkout);
      updateWorkout(currentWorkout.id, updatedWorkout);
      showSnackbar(`${exercise.name} added to workout`);
      return true;
    },
    [currentWorkout, updateWorkout, showSnackbar]
  );

  const removeExerciseFromCurrentWorkout = useCallback(
    (exerciseId) => {
      if (!currentWorkout) return false;

      const updatedWorkout = removeExerciseFromWorkout(
        currentWorkout,
        exerciseId
      );
      setCurrentWorkout(updatedWorkout);
      updateWorkout(currentWorkout.id, updatedWorkout);
      showSnackbar('Exercise removed from workout');
      return true;
    },
    [currentWorkout, updateWorkout, showSnackbar]
  );

  // Set operations
  const completeSetInWorkout = useCallback(
    (exerciseId, setId, setData) => {
      if (!currentWorkout) return false;

      const updatedWorkout = completeSet(
        currentWorkout,
        exerciseId,
        setId,
        setData
      );
      setCurrentWorkout(updatedWorkout);
      updateWorkout(currentWorkout.id, updatedWorkout);

      // Check if workout is complete
      const progress = getWorkoutProgress(updatedWorkout);
      if (progress.isCompleted) {
        const completedWorkout = completeWorkout(updatedWorkout);
        setCurrentWorkout(completedWorkout);
        updateWorkout(currentWorkout.id, completedWorkout);
        showSnackbar('🎉 Workout completed! Great job!', 'success');
      } else {
        showSnackbar('Set completed!');
      }

      return true;
    },
    [currentWorkout, updateWorkout, showSnackbar]
  );

  const failSetInWorkout = useCallback(
    (exerciseId, setId, reason) => {
      if (!currentWorkout) return false;

      const updatedWorkout = failSet(currentWorkout, exerciseId, setId, reason);
      setCurrentWorkout(updatedWorkout);
      updateWorkout(currentWorkout.id, updatedWorkout);
      showSnackbar('Set marked as failed');
      return true;
    },
    [currentWorkout, updateWorkout, showSnackbar]
  );

  const startWorkout = useCallback(
    (workout) => {
      const updatedWorkout = {
        ...workout,
        status: WORKOUT_STATUS.IN_PROGRESS,
        startedAt: new Date().toISOString(),
      };

      setCurrentWorkout(updatedWorkout);
      updateWorkout(workout.id, updatedWorkout);
      navigateToWorkout(updatedWorkout);
      showSnackbar('Workout started!');
    },
    [updateWorkout, navigateToWorkout, showSnackbar]
  );

  const pauseWorkout = useCallback(() => {
    if (!currentWorkout) return false;

    const updatedWorkout = {
      ...currentWorkout,
      status: WORKOUT_STATUS.PAUSED,
    };

    setCurrentWorkout(updatedWorkout);
    updateWorkout(currentWorkout.id, updatedWorkout);
    showSnackbar('Workout paused');
    return true;
  }, [currentWorkout, updateWorkout, showSnackbar]);

  const resumeWorkout = useCallback(() => {
    if (!currentWorkout) return false;

    const updatedWorkout = {
      ...currentWorkout,
      status: WORKOUT_STATUS.IN_PROGRESS,
    };

    setCurrentWorkout(updatedWorkout);
    updateWorkout(currentWorkout.id, updatedWorkout);
    showSnackbar('Workout resumed');
    return true;
  }, [currentWorkout, updateWorkout, showSnackbar]);

  // Search and filter operations
  const updateExerciseSearch = useCallback((search) => {
    setExerciseSearch(search);
  }, []);

  const updateExerciseFilters = useCallback((filters) => {
    setExerciseFilters((prev) => ({ ...prev, ...filters }));
  }, []);

  const clearExerciseFilters = useCallback(() => {
    setExerciseSearch('');
    setExerciseFilters({
      muscleGroup: '',
      equipment: '',
      difficulty: '',
      category: '',
    });
  }, []);

  const updateWorkoutFilters = useCallback((filters) => {
    setWorkoutFilters((prev) => ({ ...prev, ...filters }));
  }, []);

  const updateWorkoutSort = useCallback((field, direction) => {
    setWorkoutSort({ field, direction });
  }, []);

  // Computed values
  const filteredExercises = useMemo(() => {
    return searchExercises(exerciseSearch, exerciseFilters);
  }, [exerciseSearch, exerciseFilters]);

  const filteredAndSortedWorkouts = useMemo(() => {
    const filtered = filterWorkouts(workouts, workoutFilters);
    return sortWorkouts(filtered, workoutSort.field, workoutSort.direction);
  }, [workouts, workoutFilters, workoutSort]);

  const workoutStats = useMemo(
    () => ({
      total: workouts.length,
      completed: workouts.filter((w) => w.status === WORKOUT_STATUS.COMPLETED)
        .length,
      inProgress: workouts.filter(
        (w) => w.status === WORKOUT_STATUS.IN_PROGRESS
      ).length,
      draft: workouts.filter((w) => w.status === WORKOUT_STATUS.DRAFT).length,
    }),
    [workouts]
  );

  const currentWorkoutProgress = useMemo(() => {
    return currentWorkout ? getWorkoutProgress(currentWorkout) : null;
  }, [currentWorkout]);

  const contextValue = {
    // State
    workouts: filteredAndSortedWorkouts,
    currentWorkout,
    exercises: filteredExercises,
    templates: WORKOUT_TEMPLATES,
    view,
    showExerciseSearch,
    selectedTemplate,
    exerciseSearch,
    exerciseFilters,
    workoutFilters,
    workoutSort,
    snackbar,
    workoutStats,
    currentWorkoutProgress,

    // Navigation actions
    navigateToList,
    navigateToCreate,
    navigateToTemplates,
    navigateToWorkout,
    openExerciseSearch,
    closeExerciseSearch,

    // Workout operations
    createWorkout,
    createWorkoutFromTemplate,
    updateWorkout,
    deleteWorkout,
    duplicateWorkout,
    startWorkout,
    pauseWorkout,
    resumeWorkout,

    // Exercise operations
    addExerciseToCurrentWorkout,
    removeExerciseFromCurrentWorkout,

    // Set operations
    completeSetInWorkout,
    failSetInWorkout,

    // Search and filter operations
    updateExerciseSearch,
    updateExerciseFilters,
    clearExerciseFilters,
    updateWorkoutFilters,
    updateWorkoutSort,

    // Snackbar actions
    showSnackbar,
    hideSnackbar,

    // Template selection
    setSelectedTemplate,
  };

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }

  return context;
};

export default WorkoutContext;
