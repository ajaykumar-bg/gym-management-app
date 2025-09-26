import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const ClassAttendanceChart = ({ data, title = 'Class Attendance' }) => {
  const theme = useTheme();

  const chartData = data.map((item, index) => ({
    id: index,
    value: item.attendance,
    label: item.class,
  }));

  const colors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

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
        <PieChart
          series={[
            {
              data: chartData,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={300}
          colors={colors}
        />
      </CardContent>
    </Card>
  );
};

export default ClassAttendanceChart;
