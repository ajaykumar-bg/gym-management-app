import React from 'react';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  Build as BuildIcon,
  Assignment as AssignmentIcon,
  CardMembership as CardMembershipIcon,
} from '@mui/icons-material';

// Base navigation items available to all users
const BASE_NAVIGATION_ITEMS = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
];

// Business module navigation items for admin and trainer
const BUSINESS_MODULE_ITEMS = [
  {
    label: 'Member Management',
    path: '/members',
    icon: <PeopleIcon />,
  },
  {
    label: 'Trainer Management',
    path: '/trainers',
    icon: <FitnessCenterIcon />,
  },
  {
    label: 'Equipment Management',
    path: '/equipment',
    icon: <BuildIcon />,
  },
  {
    label: 'Membership & Packages',
    path: '/membership-packages',
    icon: <CardMembershipIcon />,
  },
];

// Trainer-specific additional items
const TRAINER_SPECIFIC_ITEMS = [
  {
    label: 'Workout Plans',
    path: '/workout-plans',
    icon: <AssignmentIcon />,
  },
];

// Member-specific navigation items
const MEMBER_NAVIGATION_ITEMS = [
  {
    label: 'My Profile',
    path: '/my-profile',
    icon: <PeopleIcon />,
  },
  {
    label: 'Trainers',
    path: '/trainers',
    icon: <FitnessCenterIcon />,
  },
];

// Admin-only navigation items
const ADMIN_ONLY_ITEMS = [
  {
    label: 'Role Configuration',
    path: '/role-configuration',
    icon: <TuneIcon />,
  },
];

// Settings available to all users
const SETTINGS_ITEM = {
  label: 'Settings',
  path: '/settings',
  icon: <SettingsIcon />,
};

/**
 * Generate navigation items based on user role
 * @param {string} role - User role (admin, trainer, member)
 * @returns {Array} Array of navigation items
 */
export const getNavigationItems = (role) => {
  let roleSpecificItems = [];

  // Add role-specific navigation items
  switch (role) {
    case 'admin':
      roleSpecificItems = [...BUSINESS_MODULE_ITEMS, ...ADMIN_ONLY_ITEMS];
      break;

    case 'trainer':
      roleSpecificItems = [...BUSINESS_MODULE_ITEMS, ...TRAINER_SPECIFIC_ITEMS];
      break;

    case 'member':
      roleSpecificItems = [...MEMBER_NAVIGATION_ITEMS];
      break;

    default:
      // Default case for unknown roles
      roleSpecificItems = [];
      break;
  }

  // Return new array with all items using spread operator
  return [...BASE_NAVIGATION_ITEMS, ...roleSpecificItems, SETTINGS_ITEM];
};
