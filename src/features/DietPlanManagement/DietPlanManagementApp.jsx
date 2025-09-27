/**
 * Diet Plan Management Application
 * Wrapper component with context provider for the entire diet plan management system
 */

import React from 'react';
import { DietPlanProvider } from './context';
import DietPlanApp from './components/DietPlanApp';

const DietPlanManagementApp = () => {
  return (
    <DietPlanProvider>
      <DietPlanApp />
    </DietPlanProvider>
  );
};

export default DietPlanManagementApp;
