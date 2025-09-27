/**
 * Diet Plan Management Feature
 * Main export file for the diet plan management module
 */

// Main App Component with Context Provider
export { default } from './DietPlanManagementApp';

// Individual Components (for advanced usage)
export { default as DietPlanApp } from './components/DietPlanApp';

// Context Provider
export { DietPlanProvider, useDietPlan } from './context';

// All Components
export * from './components';

// Constants
export * from './constants';

// Utilities
export * from './utils/dietPlanUtils';
