import React from 'react';
import { AdminPanelSettings, FitnessCenter, Person } from '@mui/icons-material';

// Role configuration with icons and labels
export const ROLE_CONFIG = {
  admin: {
    label: 'Switch to Admin',
    icon: <AdminPanelSettings fontSize='small' />,
  },
  trainer: {
    label: 'Switch to Trainer',
    icon: <FitnessCenter fontSize='small' />,
  },
  member: {
    label: 'Switch to Member',
    icon: <Person fontSize='small' />,
  },
};
