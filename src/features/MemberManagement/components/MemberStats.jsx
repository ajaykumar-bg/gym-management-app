/**
 * Member Statistics Component
 * Displays member overview statistics
 */

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const MemberStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Members',
      value: stats.total,
      color: 'primary',
    },
    {
      label: 'Active',
      value: stats.active,
      color: 'success.main',
    },
    {
      label: 'Inactive',
      value: stats.inactive,
      color: 'warning.main',
    },
    {
      label: 'Suspended',
      value: stats.suspended,
      color: 'error.main',
    },
    {
      label: 'Expired',
      value: stats.expired,
      color: 'error.dark',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statCards.map((stat) => (
        <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 2.4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant='h4' color={stat.color}>
                {stat.value}
              </Typography>
              <Typography variant='body2'>{stat.label}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(MemberStats);
