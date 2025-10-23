import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Login as CheckInIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { useAttendance } from '../context/AttendanceContext';
import { formatDuration } from '../utils/attendanceUtils';

const AttendanceOverview = () => {
  const { stats, filteredRecords, openDialog, setSelectedMember } =
    useAttendance();

  const handleCheckIn = () => {
    setSelectedMember(null);
    openDialog('checkIn');
  };

  // Get currently checked-in members
  const checkedInMembers = filteredRecords.filter(
    (record) => record.status === 'checked_in'
  );

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Sessions',
      value: stats?.totalSessions || 0,
      icon: <TodayIcon />,
      color: 'primary.main',
      bgColor: 'primary.light',
    },
    {
      title: 'Active Members',
      value: stats?.activeSessions || 0,
      icon: <PeopleIcon />,
      color: 'success.main',
      bgColor: 'success.light',
    },
    {
      title: 'Avg Duration',
      value: formatDuration(stats?.averageDuration || 0),
      icon: <TimeIcon />,
      color: 'info.main',
      bgColor: 'info.light',
    },
    {
      title: 'Unique Members',
      value: stats?.uniqueMembers || 0,
      icon: <TrendingUpIcon />,
      color: 'warning.main',
      bgColor: 'warning.light',
    },
  ];

  return (
    <Box>
      {/* Quick Actions */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant='contained'
          startIcon={<CheckInIcon />}
          onClick={handleCheckIn}
          size='large'
        >
          Check In Member
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: card.bgColor,
                      color: card.color,
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant='h4' component='div'>
                      {card.value}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Currently Checked In Members */}
      {checkedInMembers.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              Currently Checked In ({checkedInMembers.length})
            </Typography>

            <Grid container spacing={2}>
              {checkedInMembers.map((record) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={record.id}>
                  <Card variant='outlined'>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: 'success.light',
                            mr: 2,
                            width: 32,
                            height: 32,
                          }}
                        >
                          <PeopleIcon fontSize='small' />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant='subtitle2' noWrap>
                            {record.memberName}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            {record.membershipId}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant='body2' color='text.secondary'>
                          Since:{' '}
                          {new Date(record.checkInTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                        <Chip
                          label='Active'
                          color='success'
                          size='small'
                          variant='outlined'
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats Summary */}
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Today's Summary
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Session Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`${stats?.activeSessions || 0} Active`}
                    color='success'
                    variant='outlined'
                    size='small'
                  />
                  <Chip
                    label={`${stats?.completedSessions || 0} Completed`}
                    color='primary'
                    variant='outlined'
                    size='small'
                  />
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  Total Activity Time
                </Typography>
                <Typography variant='h6'>
                  {formatDuration(stats?.totalDuration || 0)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttendanceOverview;
