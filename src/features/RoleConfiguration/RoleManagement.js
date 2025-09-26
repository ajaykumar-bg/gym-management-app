import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  FitnessCenter as TrainerIcon,
  Person as MemberIcon,
} from '@mui/icons-material';
import { useUser } from '../../context/UserContext';
import { roleDescriptions } from './role.constants';

const RoleManagement = () => {
  const { user, switchRole } = useUser();

  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Role Management
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          Switch between roles to test different permission levels:
          {roleDescriptions.map((role) => (
            <React.Fragment key={role.name}>
              <br />• <strong>{role.name}:</strong> {role.description}
            </React.Fragment>
          ))}
        </Typography>

        <Stack direction='row' spacing={2} flexWrap='wrap'>
          <Button
            variant={user.role === 'admin' ? 'contained' : 'outlined'}
            color='error'
            startIcon={<AdminIcon />}
            onClick={() => handleRoleSwitch('admin')}
            disabled={user.role === 'admin'}
          >
            Admin
          </Button>
          <Button
            variant={user.role === 'trainer' ? 'contained' : 'outlined'}
            color='warning'
            startIcon={<TrainerIcon />}
            onClick={() => handleRoleSwitch('trainer')}
            disabled={user.role === 'trainer'}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            Trainer
          </Button>
          <Button
            variant={user.role === 'member' ? 'contained' : 'outlined'}
            color='primary'
            startIcon={<MemberIcon />}
            onClick={() => handleRoleSwitch('member')}
            disabled={user.role === 'member'}
            sx={{ mt: { xs: 1, sm: 0 } }}
          >
            Member
          </Button>
        </Stack>

        <Alert severity='info' sx={{ mt: 2 }}>
          Role changes take effect immediately and will update the dashboard
          visibility.
        </Alert>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
