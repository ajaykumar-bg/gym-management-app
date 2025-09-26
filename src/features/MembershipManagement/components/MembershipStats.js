import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  AttachMoney,
  Warning,
  Refresh,
} from '@mui/icons-material';
import {
  formatCurrency,
  calculateRevenueStats,
  getMembershipStats,
} from '../membership.utils';
import {
  MOCK_MEMBERSHIP_PACKAGES,
  MOCK_MEMBER_SUBSCRIPTIONS,
} from '../membership.constants';

const MembershipStats = ({
  packages = MOCK_MEMBERSHIP_PACKAGES,
  subscriptions = MOCK_MEMBER_SUBSCRIPTIONS,
  onRefresh,
}) => {
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    const revenueStats = calculateRevenueStats(subscriptions);
    const membershipStats = getMembershipStats(subscriptions, packages);

    // Calculate additional metrics
    const activeSubscriptions = subscriptions.filter(
      (sub) => sub.status === 'active'
    );
    const expiredSubscriptions = subscriptions.filter(
      (sub) => sub.status === 'expired'
    );
    const pendingPayments = subscriptions.filter(
      (sub) => sub.paymentStatus === 'pending'
    );
    const overduePayments = subscriptions.filter(
      (sub) => sub.paymentStatus === 'overdue'
    );

    // Package popularity
    const packagePopularity = packages
      .map((pkg) => ({
        ...pkg,
        subscriberCount: subscriptions.filter((sub) => sub.packageId === pkg.id)
          .length,
        revenue: subscriptions
          .filter((sub) => sub.packageId === pkg.id)
          .reduce((sum, sub) => sum + (sub.totalPaid || 0), 0),
      }))
      .sort((a, b) => b.subscriberCount - a.subscriberCount);

    return {
      ...revenueStats,
      ...membershipStats,
      activeSubscriptions: activeSubscriptions.length,
      expiredSubscriptions: expiredSubscriptions.length,
      pendingPayments: pendingPayments.length,
      overduePayments: overduePayments.length,
      packagePopularity,
      totalPackages: packages.length,
      activePackages: packages.filter((pkg) => pkg.status === 'active').length,
    };
  }, [packages, subscriptions]);

  const handleRefresh = async () => {
    setLoading(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setLoading(false), 1000); // Simulate loading
  };

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    color = 'primary',
    trend = null,
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              {title}
            </Typography>
            <Typography variant='h4' component='div' color={`${color}.main`}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant='body2' color='textSecondary'>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {trend > 0 ? (
                  <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} />
                )}
                <Typography
                  variant='body2'
                  color={trend > 0 ? 'success.main' : 'error.main'}
                >
                  {Math.abs(trend)}% vs last month
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: `${color}.light`,
              color: `${color}.contrastText`,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
        }}
      >
        <Typography variant='h5' fontWeight='bold'>
          Membership Statistics
        </Typography>
        <Tooltip title='Refresh Statistics'>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Total Revenue'
            value={formatCurrency(stats.totalRevenue)}
            subtitle='All time'
            icon={<AttachMoney />}
            color='success'
            trend={15.2}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Active Members'
            value={stats.activeSubscriptions}
            subtitle={`${stats.totalSubscriptions} total`}
            icon={<People />}
            color='primary'
            trend={8.1}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Monthly Revenue'
            value={formatCurrency(stats.monthlyRevenue)}
            subtitle='Current month'
            icon={<AttachMoney />}
            color='info'
            trend={-3.5}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title='Average Revenue'
            value={formatCurrency(stats.averageRevenue)}
            subtitle='Per member'
            icon={<TrendingUp />}
            color='secondary'
            trend={12.3}
          />
        </Grid>
      </Grid>

      {/* Alerts and Issues */}
      {(stats.pendingPayments > 0 ||
        stats.overduePayments > 0 ||
        stats.expiredSubscriptions > 0) && (
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title='Attention Required'
            titleTypographyProps={{ variant: 'h6' }}
            avatar={<Warning sx={{ color: 'warning.main' }} />}
          />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={2}>
              {stats.overduePayments > 0 && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h6' color='error'>
                      {stats.overduePayments}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Overdue Payments
                    </Typography>
                  </Box>
                </Grid>
              )}

              {stats.pendingPayments > 0 && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h6' color='warning.main'>
                      {stats.pendingPayments}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Pending Payments
                    </Typography>
                  </Box>
                </Grid>
              )}

              {stats.expiredSubscriptions > 0 && (
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant='h6' color='error'>
                      {stats.expiredSubscriptions}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Expired Subscriptions
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      )}

      <Grid container spacing={3}>
        {/* Package Performance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title='Package Performance'
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <List dense>
                {stats.packagePopularity.slice(0, 5).map((pkg, index) => (
                  <React.Fragment key={pkg.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              variant='body1'
                              sx={{ fontWeight: 500 }}
                            >
                              {pkg.name}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Chip
                                label={`${pkg.subscriberCount} members`}
                                size='small'
                                color='primary'
                              />
                              <Typography
                                variant='body2'
                                color='success.main'
                                sx={{ fontWeight: 600 }}
                              >
                                {formatCurrency(pkg.revenue)}
                              </Typography>
                            </Box>
                          </Box>
                        }
                        secondary={
                          <LinearProgress
                            variant='determinate'
                            value={Math.min(
                              (pkg.subscriberCount / stats.totalSubscriptions) *
                                100,
                              100
                            )}
                            sx={{ mt: 1 }}
                          />
                        }
                      />
                    </ListItem>
                    {index < stats.packagePopularity.slice(0, 5).length - 1 && (
                      <Divider component='li' />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Subscription Status Breakdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardHeader
              title='Subscription Status'
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant='h4' color='success.main'>
                      {stats.activeSubscriptions}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Active
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant='h4' color='error.main'>
                      {stats.expiredSubscriptions}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Expired
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant='h6' color='primary.main'>
                      {stats.totalPackages}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Total Packages
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Box sx={{ textAlign: 'center', p: 1 }}>
                    <Typography variant='h6' color='success.main'>
                      {stats.activePackages}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      Active Packages
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MembershipStats;
