import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Typography,
} from '@mui/material';
import {
  PersonAdd,
  Assessment,
  Build,
  AttachMoney,
  Event,
  People,
  TrendingUp,
  FitnessCenter,
  Person,
} from '@mui/icons-material';

// Icon mapping
const iconMap = {
  PersonAdd,
  Assessment,
  Build,
  AttachMoney,
  Event,
  People,
  TrendingUp,
  FitnessCenter,
  Person,
};

const QuickActions = ({ actions, title = 'Quick Actions' }) => {
  const handleActionClick = (path) => {
    // In a real app, you would use React Router here
    console.log(`Navigate to: ${path}`);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {actions.map((action, index) => {
            const IconComponent = iconMap[action.icon] || Event;
            return (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <Button
                  variant='outlined'
                  fullWidth
                  startIcon={<IconComponent />}
                  onClick={() => handleActionClick(action.path)}
                  sx={{
                    py: 1.5,
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    '&:hover': {
                      backgroundColor: 'primary.lighter',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Typography variant='body2' component='span'>
                    {action.label}
                  </Typography>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
