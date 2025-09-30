/**
 * Permission Guard Component
 * Handles access control for member management
 */

import React from 'react';
import { Box, Typography } from '@mui/material';

const PermissionGuard = ({ permissions, children }) => {
  if (!permissions.canViewDashboard) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          Access Denied
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          You do not have permission to access member management.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default React.memo(PermissionGuard);
