import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Edit,
  Delete,
  CheckCircle,
  People,
  AttachMoney,
} from '@mui/icons-material';
import {
  MEMBERSHIP_TYPES,
  MEMBERSHIP_DURATIONS,
} from '../membership.constants';
import { formatCurrency } from '../membership.utils';

const PackageCard = ({
  package: pkg,
  onEdit,
  onDelete,
  canManage = false,
  subscriptionCount = 0,
}) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(pkg);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(pkg.id);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'basic':
        return 'default';
      case 'premium':
        return 'primary';
      case 'vip':
        return 'secondary';
      case 'student':
        return 'info';
      case 'corporate':
        return 'warning';
      case 'family':
        return 'success';
      default:
        return 'default';
    }
  };

  const getDurationColor = (duration) => {
    switch (duration) {
      case 'monthly':
        return 'primary';
      case 'quarterly':
        return 'secondary';
      case 'semiannual':
        return 'warning';
      case 'annual':
        return 'success';
      case 'lifetime':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardHeader
        title={pkg.name}
        titleTypographyProps={{
          variant: 'h6',
          sx: {
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
          },
        }}
        subheader={
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <Chip
              label={MEMBERSHIP_TYPES[pkg.type]}
              color={getTypeColor(pkg.type)}
              size='small'
            />
            <Chip
              label={MEMBERSHIP_DURATIONS[pkg.duration]}
              color={getDurationColor(pkg.duration)}
              size='small'
              variant='outlined'
            />
            <Chip
              label={pkg.status}
              color={pkg.status === 'active' ? 'success' : 'default'}
              size='small'
              variant='outlined'
            />
          </Box>
        }
        action={
          canManage && (
            <Box>
              <IconButton size='small' onClick={handleEdit} sx={{ mr: 0.5 }}>
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
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            minHeight: '3em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {pkg.description}
        </Typography>

        {/* Price Section */}
        <Box
          sx={{
            mb: 2,
            textAlign: 'center',
            py: 2,
            bgcolor: 'primary.light',
            borderRadius: 1,
          }}
        >
          <Typography
            variant='h4'
            color='primary.contrastText'
            sx={{ fontWeight: 'bold' }}
          >
            {formatCurrency(pkg.price)}
          </Typography>
          <Typography variant='caption' color='primary.contrastText'>
            per{' '}
            {pkg.duration === 'lifetime'
              ? 'one-time'
              : pkg.duration.replace('ly', '')}
          </Typography>
        </Box>

        {/* Stats Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <People sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant='body2' color='text.secondary'>
              {subscriptionCount} members
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoney
              sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }}
            />
            <Typography variant='body2' color='text.secondary'>
              {formatCurrency(pkg.price * subscriptionCount)}
            </Typography>
          </Box>
        </Box>

        {/* Features Section */}
        <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 'bold' }}>
          Features:
        </Typography>
        <List dense sx={{ py: 0 }}>
          {pkg.features.slice(0, 4).map((feature, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={feature}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontSize: '0.875rem',
                }}
              />
            </ListItem>
          ))}
          {pkg.features.length > 4 && (
            <ListItem sx={{ px: 0, py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={`+${pkg.features.length - 4} more features`}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                  color: 'text.secondary',
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
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='caption' color='text.secondary'>
            Created: {new Date(pkg.createdDate).toLocaleDateString()}
          </Typography>
          {pkg.maxMembers && (
            <Chip
              label={`Max: ${pkg.maxMembers}`}
              size='small'
              variant='outlined'
              color='info'
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
