import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const TrainerScheduleChart = ({ data, title = 'Daily Class Schedule' }) => {
  const theme = useTheme();

  const xAxisData = data.map((item) => item.time);
  const classData = data.map((item) => item.classes);

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
        <LineChart
          width={500}
          height={300}
          series={[
            {
              data: classData,
              label: 'Number of Classes',
              color: theme.palette.warning.main,
              area: true,
            },
          ]}
          xAxis={[{ scaleType: 'point', data: xAxisData }]}
          yAxis={[
            {
              scaleType: 'linear',
              min: 0,
              max: Math.max(...classData) + 1,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default TrainerScheduleChart;
