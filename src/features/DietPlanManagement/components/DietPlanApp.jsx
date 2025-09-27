/**
 * Diet Plan Management App
 * Main container component for the diet plan management feature
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as AssignIcon,
  Dashboard as DashboardIcon,
  List as ListIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import DietPlanDashboard from './DietPlanDashboard';
import DietPlanList from './DietPlanList';
import AssignmentList from './AssignmentList';
import AnalyticsView from './AnalyticsView';
import CreatePlanModal from './CreatePlanModal';
import AssignPlanModal from './AssignPlanModal';
import ProgressModal from './ProgressModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`diet-plan-tabpanel-${index}`}
      aria-labelledby={`diet-plan-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const DietPlanApp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);

  const {
    openCreatePlan,
    openAssignPlan,
    isCreatePlanOpen,
    isAssignPlanOpen,
    isProgressModalOpen,
  } = useDietPlan();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabs = [
    {
      label: 'Dashboard',
      icon: <DashboardIcon />,
      component: <DietPlanDashboard />,
    },
    {
      label: 'Diet Plans',
      icon: <ListIcon />,
      component: <DietPlanList />,
    },
    {
      label: 'Assignments',
      icon: <AssignIcon />,
      component: <AssignmentList />,
    },
    {
      label: 'Analytics',
      icon: <AnalyticsIcon />,
      component: <AnalyticsView />,
    },
  ];

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            Diet Plan Management
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Create, assign, and track customized diet plans for members
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant='outlined'
            startIcon={<AssignIcon />}
            onClick={() => openAssignPlan()}
            size={isMobile ? 'small' : 'medium'}
          >
            Assign Plan
          </Button>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={openCreatePlan}
            size={isMobile ? 'small' : 'medium'}
          >
            Create Plan
          </Button>
        </Box>
      </Box>

      {/* Navigation Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label='diet plan management tabs'
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            sx={{
              px: 2,
              '& .MuiTab-root': {
                minHeight: 64,
                fontWeight: 500,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition='start'
                label={tab.label}
                id={`diet-plan-tab-${index}`}
                aria-controls={`diet-plan-tabpanel-${index}`}
                sx={{
                  '& .MuiTab-iconWrapper': {
                    mb: 0,
                    mr: 1,
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {tab.component}
          </TabPanel>
        ))}
      </Paper>

      {/* Modals */}
      {isCreatePlanOpen && <CreatePlanModal />}
      {isAssignPlanOpen && <AssignPlanModal />}
      {isProgressModalOpen && <ProgressModal />}
    </Container>
  );
};

export default DietPlanApp;
