/**
 * Diet Food Management Main App Component
 * Main component that provides routing and layout for food management
 */

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Add as AddIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { DietFoodProvider } from '../context/DietFoodContext';
import DietFoodDashboard from './DietFoodDashboard';
import DietFoodList from './DietFoodList';

const DRAWER_WIDTH = 240;

const DietFoodApp = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      description: 'Overview and statistics',
    },
    {
      id: 'foods',
      label: 'Food Database',
      icon: <RestaurantIcon />,
      description: 'Browse and manage foods',
    },
    {
      id: 'add-food',
      label: 'Quick Add Food',
      icon: <AddIcon />,
      description: 'Add new food quickly',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <AnalyticsIcon />,
      description: 'Food trends and insights',
    },
  ];

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setMobileOpen(false);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DietFoodDashboard />;
      case 'foods':
        return <DietFoodList />;
      case 'add-food':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              Quick Add Food
            </Typography>
            <Typography color='text.secondary'>
              This feature will be implemented soon
            </Typography>
          </Box>
        );
      case 'analytics':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant='h5' gutterBottom>
              Food Analytics
            </Typography>
            <Typography color='text.secondary'>
              Analytics dashboard will be implemented soon
            </Typography>
          </Box>
        );
      default:
        return <DietFoodDashboard />;
    }
  };

  const getCurrentViewTitle = () => {
    const item = menuItems.find((item) => item.id === currentView);
    return item ? item.label : 'Diet Food Management';
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Food Management
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={currentView === item.id}
              onClick={() => handleMenuClick(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} secondary={item.description} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <DietFoodProvider>
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position='fixed'
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap component='div'>
              {getCurrentViewTitle()}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Navigation Drawer */}
        <Box
          component='nav'
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop drawer */}
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <Toolbar />
          <Container maxWidth='xl' sx={{ mt: 2, mb: 4 }}>
            <Paper elevation={1} sx={{ minHeight: '80vh' }}>
              {renderCurrentView()}
            </Paper>
          </Container>
        </Box>
      </Box>
    </DietFoodProvider>
  );
};

export default DietFoodApp;
