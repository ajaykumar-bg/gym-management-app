/**
 * Diet Food Management Module
 * Main entry point for the Diet Food Management feature
 */

export { default as DietFoodApp } from './components/DietFoodApp';
export { default as DietFoodDashboard } from './components/DietFoodDashboard';
export { default as DietFoodList } from './components/DietFoodList';
export { DietFoodProvider, useDietFood } from './context/DietFoodContext';
export * from './constants';
export { default as foodDatabase } from './constants/foodDatabase.json';

// Default export for routing
export { default } from './components/DietFoodApp';
