/**
 * Equipment Statistics Cards Component
 * Displays overview statistics for equipment management
 */

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const EquipmentStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Equipment',
      value: stats.total,
      color: 'primary',
    },
    {
      label: 'Operational',
      value: stats.operational,
      color: 'success.main',
    },
    {
      label: 'In Maintenance',
      value: stats.maintenance,
      color: 'warning.main',
    },
    {
      label: 'Under Repair',
      value: stats.repair,
      color: 'error.main',
    },
    {
      label: 'Out of Order',
      value: stats.outOfOrder,
      color: 'error.dark',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statCards.map((stat, index) => (
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

export default React.memo(EquipmentStats);
