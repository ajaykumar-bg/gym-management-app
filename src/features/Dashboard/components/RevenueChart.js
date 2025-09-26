import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const RevenueChart = ({ data, title = 'Monthly Revenue' }) => {
  const theme = useTheme();

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
        <BarChart
          width={500}
          height={300}
          series={[
            {
              data: data.data,
              label: 'Revenue ($)',
              color: theme.palette.success.main,
            },
          ]}
          xAxis={[{ scaleType: 'band', data: data.labels }]}
          yAxis={[
            {
              scaleType: 'linear',
              valueFormatter: (value) => `$${value.toLocaleString()}`,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
