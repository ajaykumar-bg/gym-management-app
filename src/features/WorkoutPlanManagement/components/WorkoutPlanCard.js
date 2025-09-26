import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import {
  Edit,
  Delete,
  FitnessCenter,
  Person,
  Schedule,
  LocalFireDepartment,
  Assignment,
} from '@mui/icons-material';
import {
  WORKOUT_TYPES,
  DIFFICULTY_LEVELS,
  PLAN_STATUS,
} from '../workoutPlan.constants';
import {
  getDifficultyColor,
  getStatusColor,
  getEstimatedCalories,
} from '../workoutPlan.utils';

const WorkoutPlanCard = ({
  plan,
  onEdit,
  onDelete,
  onView,
  canManage = false,
}) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(plan);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(plan.id);
  };

  const handleView = () => {
    if (onView) onView(plan);
  };

  return (
    <Card
      sx={{
        height: '100%',
        cursor: onView ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: onView ? 'translateY(-4px)' : 'none',
          boxShadow: onView ? 4 : 1,
        },
      }}
      onClick={handleView}
    >
      <CardHeader
        title={plan.name}
        titleTypographyProps={{
          variant: 'h6',
          sx: {
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          },
        }}
        subheader={
          <Box sx={{ mt: 1 }}>
            <Chip
              label={WORKOUT_TYPES[plan.type]}
              color='primary'
              size='small'
              sx={{ mr: 1, mb: 0.5 }}
            />
            <Chip
              label={DIFFICULTY_LEVELS[plan.difficulty]}
              color={getDifficultyColor(plan.difficulty)}
              size='small'
              sx={{ mr: 1, mb: 0.5 }}
            />
            <Chip
              label={PLAN_STATUS[plan.status]}
              color={getStatusColor(plan.status)}
              size='small'
              variant='outlined'
              sx={{ mb: 0.5 }}
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
      <CardContent sx={{ pt: 0 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.5em',
          }}
        >
          {plan.description}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
            <Typography variant='body2' color='text.secondary'>
              {plan.duration} minutes
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FitnessCenter
              sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }}
            />
            <Typography variant='body2' color='text.secondary'>
              {plan.exercises.length} exercises
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalFireDepartment
              sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }}
            />
            <Typography variant='body2' color='text.secondary'>
              ~{getEstimatedCalories(plan)} calories
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Person sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              {plan.memberName || 'Unassigned'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              by {plan.trainerName}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{ mt: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Typography variant='caption' color='text.secondary'>
            Created: {new Date(plan.createdDate).toLocaleDateString()}
          </Typography>
          {plan.lastModified !== plan.createdDate && (
            <Typography variant='caption' color='text.secondary' sx={{ ml: 1 }}>
              • Modified: {new Date(plan.lastModified).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutPlanCard;
