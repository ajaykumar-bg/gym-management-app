/**
 * PermissionGuard Component
 * Handles access control for the Trainer Management feature
 */

import React, { memo } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useUser } from '../../../context/UserContext';

const PermissionGuard = memo(({ children }) => {
  const { permissions } = useUser();

  if (!permissions.canViewTrainers) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity='error' icon={<LockIcon />} sx={{ mb: 2 }}>
          <Typography variant='h6' component='div' sx={{ mb: 1 }}>
            Access Denied
          </Typography>
          <Typography variant='body2'>
            You don't have permission to view trainer information. Please
            contact your administrator if you believe this is an error.
          </Typography>
        </Alert>

        <Box
          sx={{
            textAlign: 'center',
            mt: 3,
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            Required Permission: View Trainers
          </Typography>
        </Box>
      </Box>
    );
  }

  return children;
});

PermissionGuard.displayName = 'PermissionGuard';

export default PermissionGuard;
