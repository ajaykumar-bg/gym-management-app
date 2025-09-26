import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const WorkoutChart = ({ data, title = 'Weekly Workouts' }) => {
  const theme = useTheme();

  const xAxisData = data.map((item) => item.day);
  const workoutData = data.map((item) => item.workouts);

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
              data: workoutData,
              label: 'Workouts',
              color: theme.palette.primary.main,
            },
          ]}
          xAxis={[{ scaleType: 'band', data: xAxisData }]}
          yAxis={[
            {
              scaleType: 'linear',
              min: 0,
              max: Math.max(...workoutData) + 2,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;
