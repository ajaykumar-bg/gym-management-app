import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import { formatTimeAgo } from '../dashboard.utils';

const RecentActivity = ({ activities, title = 'Recent Activities' }) => {
  const getAvatarColor = (color) => {
    switch (color) {
      case 'primary':
        return 'primary.main';
      case 'success':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'info':
        return 'info.main';
      case 'error':
        return 'error.main';
      default:
        return 'grey.500';
    }
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
      <CardContent sx={{ pt: 0 }}>
        <List disablePadding>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              alignItems='flex-start'
              sx={{
                px: 0,
                py: 1.5,
                borderBottom:
                  index < activities.length - 1 ? '1px solid' : 'none',
                borderColor: 'divider',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(activity.color),
                    width: 40,
                    height: 40,
                    fontSize: '0.875rem',
                  }}
                >
                  {activity.avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
                    {activity.message}
                  </Typography>
                }
                secondary={
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    mt={0.5}
                  >
                    <Typography variant='caption' color='textSecondary'>
                      {formatTimeAgo(activity.time)}
                    </Typography>
                    <Chip
                      label={activity.type}
                      size='small'
                      variant='outlined'
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
