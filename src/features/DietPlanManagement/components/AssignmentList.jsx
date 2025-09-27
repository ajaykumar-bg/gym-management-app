/**
 * Assignment List Component
 * Displays and manages diet plan assignments
 */

import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Avatar,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import {
  formatPercentage,
  getAdherenceColor,
  calculateProgress,
  getDaysRemaining,
  formatDate,
} from '../utils/dietPlanUtils';
import {
  ASSIGNMENT_STATUS_LABELS,
  STATUS_COLORS,
  DIET_PLAN_TYPE_LABELS,
} from '../constants';

const AssignmentRow = ({
  assignment,
  plan,
  onViewProgress,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewProgress = () => {
    handleMenuClose();
    onViewProgress(assignment);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(assignment);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(assignment);
  };

  const progress = calculateProgress(assignment.startDate, assignment.endDate);
  const daysRemaining = getDaysRemaining(assignment.endDate);
  const adherence = assignment.progress?.adherence || 0;

  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {assignment.memberName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant='subtitle2' fontWeight='medium'>
              {assignment.memberName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              ID: {assignment.memberId}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <Typography variant='body2' fontWeight='medium'>
            {plan?.name || 'Unknown Plan'}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {plan ? DIET_PLAN_TYPE_LABELS[plan.type] : 'N/A'}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Chip
          label={ASSIGNMENT_STATUS_LABELS[assignment.status]}
          color={STATUS_COLORS[assignment.status]}
          size='small'
        />
      </TableCell>

      <TableCell>
        <Box>
          <Typography variant='body2'>
            {formatDate(assignment.startDate)}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            to {formatDate(assignment.endDate)}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        {assignment.status === 'active' && (
          <Box sx={{ minWidth: 120 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant='caption' color='text.secondary'>
                Progress
              </Typography>
              <Typography variant='caption'>
                {formatPercentage(progress)}
              </Typography>
            </Box>
            <LinearProgress
              variant='determinate'
              value={progress}
              sx={{ height: 6, borderRadius: 3 }}
            />
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ mt: 0.5, display: 'block' }}
            >
              {daysRemaining} days left
            </Typography>
          </Box>
        )}
        {assignment.status === 'completed' && (
          <Typography variant='body2' color='success.main' fontWeight='medium'>
            Completed
          </Typography>
        )}
        {assignment.status === 'paused' && (
          <Typography variant='body2' color='warning.main' fontWeight='medium'>
            Paused
          </Typography>
        )}
      </TableCell>

      <TableCell>
        {assignment.status === 'active' && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h6'
              color={getAdherenceColor(adherence) + '.main'}
              fontWeight='bold'
            >
              {formatPercentage(adherence)}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              adherence
            </Typography>
          </Box>
        )}
      </TableCell>

      <TableCell>
        <IconButton onClick={handleMenuClick} size='small'>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleViewProgress}>
            <VisibilityIcon fontSize='small' sx={{ mr: 1 }} />
            View Progress
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <EditIcon fontSize='small' sx={{ mr: 1 }} />
            Edit Assignment
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize='small' sx={{ mr: 1 }} />
            Delete Assignment
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

const AssignmentList = () => {
  const {
    assignments,
    dietPlans,
    openAssignPlanModal,
    openProgressModal,
    deleteAssignment,
  } = useDietPlan();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Filter and search logic
  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const plan = dietPlans.find((p) => p.id === assignment.dietPlanId);

      const matchesSearch =
        assignment.memberName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (plan?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'all' || assignment.status === filterStatus;
      const matchesType = filterType === 'all' || plan?.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [assignments, dietPlans, searchTerm, filterStatus, filterType]);

  // Group assignments by status for summary
  const assignmentSummary = useMemo(() => {
    return assignments.reduce((acc, assignment) => {
      acc[assignment.status] = (acc[assignment.status] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {});
  }, [assignments]);

  const handleDeleteAssignment = (assignment) => {
    if (
      window.confirm(
        `Are you sure you want to delete the assignment for ${assignment.memberName}? This action cannot be undone.`
      )
    ) {
      deleteAssignment(assignment.id);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant='h5' component='h1'>
            Diet Plan Assignments ({filteredAssignments.length})
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Manage member diet plan assignments and track progress
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={openAssignPlanModal}
          sx={{ minWidth: 160 }}
        >
          Assign Plan
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h4' color='primary.main' fontWeight='bold'>
                {assignmentSummary.total || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Total Assignments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h4' color='success.main' fontWeight='bold'>
                {assignmentSummary.active || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h4' color='info.main' fontWeight='bold'>
                {assignmentSummary.completed || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant='h4' color='warning.main' fontWeight='bold'>
                {assignmentSummary.paused || 0}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Paused
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              fullWidth
              placeholder='Search by member or plan name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label='Status'
                startAdornment={<FilterListIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value='all'>All Status</MenuItem>
                {Object.entries(ASSIGNMENT_STATUS_LABELS).map(
                  ([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Plan Type</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                label='Plan Type'
              >
                <MenuItem value='all'>All Types</MenuItem>
                {Object.entries(DIET_PLAN_TYPE_LABELS).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Assignments Table */}
      {filteredAssignments.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <AssignmentIcon
            sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }}
          />
          <Typography variant='h6' color='text.secondary' gutterBottom>
            {searchTerm || filterStatus !== 'all' || filterType !== 'all'
              ? 'No assignments match your filters'
              : 'No assignments found'}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
            {searchTerm || filterStatus !== 'all' || filterType !== 'all'
              ? 'Try adjusting your search criteria or filters'
              : 'Create your first assignment to get started'}
          </Typography>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={openAssignPlanModal}
          >
            Assign Diet Plan
          </Button>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Diet Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Adherence</TableCell>
                <TableCell width={50}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssignments.map((assignment) => {
                const plan = dietPlans.find(
                  (p) => p.id === assignment.dietPlanId
                );
                return (
                  <AssignmentRow
                    key={assignment.id}
                    assignment={assignment}
                    plan={plan}
                    onViewProgress={openProgressModal}
                    onEdit={() => {}} // TODO: Implement edit assignment
                    onDelete={handleDeleteAssignment}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AssignmentList;
