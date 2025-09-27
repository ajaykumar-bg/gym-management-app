import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const MembershipGrowthChart = ({ data, title = 'Membership Growth' }) => {
  const theme = useTheme();

  const xAxisData = data.map((item) => item.month);
  const totalMembersData = data.map((item) => item.members);
  const newMembersData = data.map((item) => item.newMembers);

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
              data: totalMembersData,
              label: 'Total Members',
              color: theme.palette.primary.main,
            },
            {
              data: newMembersData,
              label: 'New Members',
              color: theme.palette.secondary.main,
            },
          ]}
          xAxis={[{ scaleType: 'point', data: xAxisData }]}
          sx={{
            '& .MuiLineElement-root': {
              strokeWidth: 2,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MembershipGrowthChart;
