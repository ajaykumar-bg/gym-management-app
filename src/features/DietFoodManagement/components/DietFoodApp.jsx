/**
 * Diet Food Management Main App Component
 * Main component that provides routing and layout for food management
 */

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { DietFoodProvider } from '../context/DietFoodContext';
import DietFoodDashboard from './DietFoodDashboard';
import DietFoodList from './DietFoodList';

const DietFoodApp = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderCurrentView = () => {
    switch (currentTab) {
      case 0:
        return <DietFoodDashboard />;
      case 1:
        return <DietFoodList />;
      default:
        return <DietFoodDashboard />;
    }
  };

  return (
    <DietFoodProvider>
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Food Database Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Manage your comprehensive food database with nutritional information
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab
              icon={<DashboardIcon />}
              label='Dashboard'
              iconPosition='start'
            />
            <Tab
              icon={<RestaurantIcon />}
              label='Food Database'
              iconPosition='start'
            />
          </Tabs>
        </Paper>

        {/* Current View */}
        <Box>{renderCurrentView()}</Box>
      </Box>
    </DietFoodProvider>
  );
};

export default DietFoodApp;
