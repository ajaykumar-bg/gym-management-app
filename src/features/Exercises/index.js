import React from 'react';
import { ExercisesProvider } from './context';
import ExerciseApp from './components/ExerciseApp';

// Main Exercise App component with context provider
const ExercisesWithProvider = () => {
  return (
    <ExercisesProvider>
      <ExerciseApp />
    </ExercisesProvider>
  );
};

export default ExercisesWithProvider;

// Core components
export { default as ExerciseList } from './components/ExerciseList';
export { default as ExerciseListInfo } from './components/ExerciseListInfo';
export { default as Exercise } from './components/Exercise';
export { default as ExerciseDetail } from './components/ExerciseDetail';
export { default as SearchFilters } from './components/SearchFilters';

// Exercise sub-components
export * from './components/Exercise';

// Utilities
export * from './utils';

// Custom hooks
export * from './hooks';

// Constants
export * from './constants';

// Context
export * from './context';
