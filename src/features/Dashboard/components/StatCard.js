import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import {
  People,
  FitnessCenter,
  AttachMoney,
  Build,
  Schedule,
  Timer,
  TrendingUp,
  LocalFireDepartment,
  CardMembership,
  TrendingDown,
  Warning,
  Info,
} from '@mui/icons-material';
import {
  getChangeColor,
  formatNumber,
  formatCurrency,
} from '../dashboard.utils';

// Icon mapping
const iconMap = {
  People,
  FitnessCenter,
  AttachMoney,
  Build,
  Schedule,
  Timer,
  TrendingUp,
  LocalFireDepartment,
  CardMembership,
  TrendingDown,
  Warning,
  Info,
};

const StatCard = ({ stat }) => {
  const IconComponent = iconMap[stat.icon] || Info;
  const changeColor = getChangeColor(stat.changeType);

  // Format the value based on its type
  const formatValue = (value) => {
    if (typeof value === 'string' && value.includes('$')) {
      return value;
    }
    if (typeof value === 'string' && !value.includes('%')) {
      return value;
    }
    if (typeof value === 'number' && stat.id === 'monthlyRevenue') {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box>
            <Typography color='textSecondary' gutterBottom variant='body2'>
              {stat.title}
            </Typography>
            <Typography variant='h4' component='div' fontWeight='bold'>
              {formatValue(stat.value)}
            </Typography>
            <Box display='flex' alignItems='center' mt={1}>
              <Typography
                variant='body2'
                sx={{
                  color: changeColor,
                  fontWeight: 'medium',
                }}
              >
                {stat.change}
              </Typography>
            </Box>
          </Box>
          <Avatar
            sx={{
              bgcolor: `${stat.color}.main`,
              width: 60,
              height: 60,
            }}
          >
            <IconComponent fontSize='large' />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
