import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  FitnessCenter as TrainerIcon,
  Person as MemberIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';

const UserInformation = () => {
  const { user } = useUser();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminIcon />;
      case 'trainer':
        return <TrainerIcon />;
      default:
        return <MemberIcon />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'trainer':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Current User
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Name
          </Typography>
          <Typography variant='body1'>{user.name}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Email
          </Typography>
          <Typography variant='body1'>{user.email}</Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant='body2' color='text.secondary'>
            Role
          </Typography>
          <Chip
            icon={getRoleIcon(user.role)}
            label={user.role.toUpperCase()}
            color={getRoleColor(user.role)}
            variant='filled'
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserInformation;
