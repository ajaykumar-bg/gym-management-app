import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Box,
  IconButton,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Person,
  Edit,
  Delete,
  Schedule,
  AttachMoney,
  Warning,
  CheckCircle,
  Cancel,
  Pause,
} from '@mui/icons-material';
import {
  SUBSCRIPTION_STATUS,
  PAYMENT_STATUS,
  MOCK_MEMBERSHIP_PACKAGES,
} from '../membershipPackage.constants';
import {
  getSubscriptionStatusColor,
  getPaymentStatusColor,
  formatCurrency,
  getDaysUntilExpiry,
  isExpiringSoon,
  isExpired,
} from '../membershipPackage.utils';

const SubscriptionCard = ({
  subscription,
  memberName,
  onDelete,
  onUpdateStatus,
  canManage = false,
}) => {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(subscription.status);
  const [newPaymentStatus, setNewPaymentStatus] = useState(
    subscription.paymentStatus
  );

  const membershipPackage = MOCK_MEMBERSHIP_PACKAGES.find(
    (pkg) => pkg.id === subscription.packageId
  );
  const daysUntilExpiry = getDaysUntilExpiry(subscription.endDate);
  const isExpiring = isExpiringSoon(subscription.endDate);
  const expired = isExpired(subscription.endDate);

  useEffect(() => {
    setNewStatus(subscription.status);
    setNewPaymentStatus(subscription.paymentStatus);
  }, [subscription.status, subscription.paymentStatus]);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(subscription.id);
  };

  const handleStatusUpdate = () => {
    if (onUpdateStatus) {
      onUpdateStatus(subscription.id, {
        status: newStatus,
        paymentStatus: newPaymentStatus,
      });
    }
    setStatusDialogOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'expired':
        return <Cancel sx={{ color: 'error.main' }} />;
      case 'suspended':
        return <Pause sx={{ color: 'warning.main' }} />;
      case 'cancelled':
        return <Cancel sx={{ color: 'error.main' }} />;
      default:
        return <Schedule sx={{ color: 'info.main' }} />;
    }
  };

  const getPaymentIcon = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'pending':
        return <Schedule sx={{ color: 'warning.main' }} />;
      case 'failed':
        return <Cancel sx={{ color: 'error.main' }} />;
      case 'overdue':
        return <Warning sx={{ color: 'error.main' }} />;
      default:
        return <Schedule sx={{ color: 'info.main' }} />;
    }
  };

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s ease-in-out',
          border: expired ? '2px solid' : '1px solid',
          borderColor: expired ? 'error.main' : 'divider',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Person />
            </Avatar>
          }
          title={memberName || `Member ${subscription.memberId}`}
          titleTypographyProps={{
            variant: 'h6',
            sx: { fontSize: '1rem', fontWeight: 600 },
          }}
          subheader={membershipPackage?.name || 'Unknown Package'}
          subheaderTypographyProps={{
            sx: { fontSize: '0.875rem', color: 'text.secondary' },
          }}
          action={
            canManage && (
              <Box>
                <IconButton
                  size='small'
                  onClick={() => setStatusDialogOpen(true)}
                  sx={{ mr: 0.5 }}
                >
                  <Edit />
                </IconButton>
                <IconButton size='small' onClick={handleDelete} color='error'>
                  <Delete />
                </IconButton>
              </Box>
            )
          }
        />

        <CardContent sx={{ flexGrow: 1, pt: 0 }}>
          {/* Status Alerts */}
          {expired && (
            <Alert severity='error' sx={{ mb: 2 }}>
              Subscription expired {Math.abs(daysUntilExpiry)} days ago
            </Alert>
          )}

          {isExpiring && !expired && (
            <Alert severity='warning' sx={{ mb: 2 }}>
              Expires in {daysUntilExpiry} days
            </Alert>
          )}

          {/* Status Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            <Chip
              icon={getStatusIcon(subscription.status)}
              label={SUBSCRIPTION_STATUS[subscription.status]}
              color={getSubscriptionStatusColor(subscription.status)}
              size='small'
            />
            <Chip
              icon={getPaymentIcon(subscription.paymentStatus)}
              label={PAYMENT_STATUS[subscription.paymentStatus]}
              color={getPaymentStatusColor(subscription.paymentStatus)}
              size='small'
              variant='outlined'
            />
          </Box>

          {/* Subscription Details */}
          <List dense sx={{ py: 0 }}>
            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary='Start Date'
                secondary={new Date(
                  subscription.startDate
                ).toLocaleDateString()}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>

            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary='End Date'
                secondary={new Date(subscription.endDate).toLocaleDateString()}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{
                  variant: 'body2',
                  sx: {
                    color: expired
                      ? 'error.main'
                      : isExpiring
                      ? 'warning.main'
                      : 'text.secondary',
                  },
                }}
              />
            </ListItem>

            <ListItem sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary='Monthly Price'
                secondary={formatCurrency(subscription.price)}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                secondaryTypographyProps={{
                  variant: 'body2',
                  sx: { fontWeight: 600, color: 'success.main' },
                }}
              />
            </ListItem>

            {subscription.nextPaymentDate && (
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <ListItemText
                  primary='Next Payment'
                  secondary={new Date(
                    subscription.nextPaymentDate
                  ).toLocaleDateString()}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            )}

            {subscription.autoRenewal !== undefined && (
              <ListItem sx={{ px: 0, py: 0.5 }}>
                <ListItemText
                  primary='Auto Renewal'
                  secondary={subscription.autoRenewal ? 'Enabled' : 'Disabled'}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    sx: {
                      color: subscription.autoRenewal
                        ? 'success.main'
                        : 'warning.main',
                    },
                  }}
                />
              </ListItem>
            )}
          </List>

          <Divider sx={{ my: 1 }} />

          {/* Footer Info */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              ID: {subscription.id}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AttachMoney
                sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }}
              />
              <Typography variant='body2' color='text.secondary'>
                Total: {formatCurrency(subscription.totalPaid || 0)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Update Subscription Status</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant='subtitle1' gutterBottom>
                {memberName || `Member ${subscription.memberId}`}
              </Typography>
              <Typography variant='body2' color='text.secondary' gutterBottom>
                {membershipPackage?.name || 'Unknown Package'}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Subscription Status</InputLabel>
                <Select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  label='Subscription Status'
                >
                  {Object.entries(SUBSCRIPTION_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Payment Status</InputLabel>
                <Select
                  value={newPaymentStatus}
                  onChange={(e) => setNewPaymentStatus(e.target.value)}
                  label='Payment Status'
                >
                  {Object.entries(PAYMENT_STATUS).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusUpdate} variant='contained'>
            Update Status
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubscriptionCard;
