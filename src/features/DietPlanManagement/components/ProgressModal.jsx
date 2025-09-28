/**
 * Progress Modal Component
 * Modal for viewing and updating diet plan assignment progress
 */

import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  Assessment as AssessmentIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDietPlan } from '../context';
import {
  formatPercentage,
  getAdherenceColor,
  calculateProgress,
  getDaysRemaining,
  formatDate,
  calculateBMR,
  calculateTDEE,
} from '../utils/dietPlanUtils';
import {
  ASSIGNMENT_STATUS_LABELS,
  STATUS_COLORS,
  DIET_PLAN_TYPE_LABELS,
} from '../constants';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role='tabpanel'
    hidden={value !== index}
    id={`progress-tabpanel-${index}`}
    aria-labelledby={`progress-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
  </div>
);

const MealTrackingTable = ({ meals, progress }) => {
  const mealProgress = progress?.mealTracking || {};

  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Meal</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align='center'>Calories</TableCell>
            <TableCell align='center'>Protein</TableCell>
            <TableCell align='center'>Carbs</TableCell>
            <TableCell align='center'>Fats</TableCell>
            <TableCell align='center'>Adherence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal, index) => {
            const adherence =
              mealProgress[meal.name] || Math.floor(Math.random() * 30) + 70; // Mock adherence
            return (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant='body2' fontWeight='medium'>
                    {meal.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={meal.type} size='small' variant='outlined' />
                </TableCell>
                <TableCell align='center'>{meal.calories || 0}</TableCell>
                <TableCell align='center'>
                  {meal.macros?.protein || 0}g
                </TableCell>
                <TableCell align='center'>{meal.macros?.carbs || 0}g</TableCell>
                <TableCell align='center'>{meal.macros?.fats || 0}g</TableCell>
                <TableCell align='center'>
                  <Typography
                    variant='body2'
                    color={getAdherenceColor(adherence) + '.main'}
                    fontWeight='bold'
                  >
                    {formatPercentage(adherence)}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProgressModal = ({ open, onClose, assignment }) => {
  const { dietPlans, members, updateAssignmentProgress } = useDietPlan();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProgress, setEditableProgress] = useState({});

  const plan = useMemo(() => {
    return dietPlans.find((p) => p.id === assignment?.dietPlanId);
  }, [dietPlans, assignment]);

  const member = useMemo(() => {
    return members.find((m) => m.id === assignment?.memberId);
  }, [members, assignment]);

  const progress = useMemo(() => {
    if (!assignment) return null;

    const timeProgress = calculateProgress(
      assignment.startDate,
      assignment.endDate
    );
    const daysRemaining = getDaysRemaining(assignment.endDate);

    return {
      timeProgress,
      daysRemaining,
      adherence: assignment.progress?.adherence || 0,
      weightChange: assignment.progress?.weightChange || 0,
      currentWeight: assignment.progress?.currentWeight || member?.weight || 70,
      ...assignment.progress,
    };
  }, [assignment, member]);

  // Mock progress data for charts
  const progressChartData = useMemo(() => {
    if (!assignment) return { dates: [], adherence: [], weight: [] };

    const dates = [];
    const adherence = [];
    const weight = [];

    // Generate weekly data points
    const startDate = new Date(assignment.startDate);
    const now = new Date();
    const weeksElapsed = Math.min(
      8,
      Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000))
    );

    for (let i = 0; i <= weeksElapsed; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i * 7);
      dates.push(
        date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      );

      // Mock data with some variation
      adherence.push(
        Math.max(
          0,
          (assignment.progress?.adherence || 80) + (Math.random() - 0.5) * 20
        )
      );
      weight.push(
        Math.max(40, (member?.weight || 70) + (Math.random() - 0.5) * 5)
      );
    }

    return { dates, adherence, weight };
  }, [assignment, member]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateAssignmentProgress(assignment.id, editableProgress);
    } else {
      // Enter edit mode
      setEditableProgress(assignment.progress || {});
    }
    setIsEditing(!isEditing);
  };

  const handleProgressChange = (field, value) => {
    setEditableProgress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setTabValue(0);
    setIsEditing(false);
    setEditableProgress({});
    onClose();
  };

  if (!assignment || !plan || !member) {
    return null;
  }

  const totalCalories = plan.meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );
  const bmr = calculateBMR(
    member.weight,
    member.height,
    member.age,
    member.gender
  );
  const tdee = calculateTDEE(bmr, member.activityLevel);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      fullWidth
      PaperProps={{
        sx: { height: '90vh' },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AssessmentIcon />
            <Typography variant='h6' component='span'>
              Progress Tracking - {assignment.memberName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={isEditing ? 'contained' : 'outlined'}
              startIcon={<EditIcon />}
              onClick={handleEditToggle}
              size='small'
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        {/* Header Summary */}
        <Box sx={{ p: 3, bgcolor: 'background.default' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      mx: 'auto',
                      mb: 2,
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {assignment.memberName.charAt(0)}
                  </Avatar>
                  <Typography variant='h6' fontWeight='medium'>
                    {assignment.memberName}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    {member.email}
                  </Typography>
                  <Chip
                    label={ASSIGNMENT_STATUS_LABELS[assignment.status]}
                    color={STATUS_COLORS[assignment.status]}
                    size='small'
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant='h6' fontWeight='medium' gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    {DIET_PLAN_TYPE_LABELS[plan.type]}
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    {formatDate(assignment.startDate)} -{' '}
                    {formatDate(assignment.endDate)}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant='caption' color='text.secondary'>
                      Time Progress: {formatPercentage(progress.timeProgress)}
                    </Typography>
                    <LinearProgress
                      variant='determinate'
                      value={progress.timeProgress}
                    />
                  </Box>
                  <Typography variant='caption' color='text.secondary'>
                    {progress.daysRemaining} days remaining
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography
                    variant='h4'
                    color={getAdherenceColor(progress.adherence) + '.main'}
                    fontWeight='bold'
                  >
                    {formatPercentage(progress.adherence)}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                  >
                    Overall Adherence
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Weight Change:{' '}
                    <strong>
                      {progress.weightChange > 0 ? '+' : ''}
                      {progress.weightChange} kg
                    </strong>
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Current: {progress.currentWeight} kg
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label='progress tabs'
          >
            <Tab label='Overview' />
            <Tab label='Nutrition Details' />
            <Tab label='Progress Charts' />
            <Tab label='Notes & Updates' />
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <PersonIcon />
                      Member Information
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Age:</strong> {member.age} years
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Height:</strong> {member.height} cm
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Weight:</strong> {progress.currentWeight} kg
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Activity Level:</strong> {member.activityLevel}
                    </Typography>
                    <Typography variant='body2'>
                      <strong>BMR:</strong> {Math.round(bmr)} cal/day
                    </Typography>
                    <Typography variant='body2'>
                      <strong>TDEE:</strong> {Math.round(tdee)} cal/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <RestaurantIcon />
                      Diet Plan Overview
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Daily Calories:</strong> {totalCalories} kcal
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Meals:</strong> {plan.meals.length} per day
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Duration:</strong> {plan.duration} days
                    </Typography>
                    <Typography variant='body2'>
                      <strong>Goals:</strong> {plan.goals.join(', ')}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant='caption' color='text.secondary'>
                        Calorie Deficit/Surplus:{' '}
                        {totalCalories - Math.round(tdee)} kcal/day
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Nutrition Details Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant='h6' gutterBottom>
              Meal Tracking & Adherence
            </Typography>
            <MealTrackingTable
              meals={plan.meals}
              progress={assignment.progress}
            />
          </TabPanel>

          {/* Progress Charts Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Adherence Over Time
                    </Typography>
                    <Box sx={{ height: 250 }}>
                      {progressChartData.dates.length > 1 ? (
                        <LineChart
                          xAxis={[
                            {
                              data: progressChartData.dates,
                              scaleType: 'point',
                            },
                          ]}
                          series={[
                            {
                              data: progressChartData.adherence,
                              label: 'Adherence %',
                              color: '#1976d2',
                            },
                          ]}
                          height={240}
                          margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <Typography color='text.secondary'>
                            Not enough data points
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card variant='outlined'>
                  <CardContent>
                    <Typography variant='h6' gutterBottom>
                      Weight Progress
                    </Typography>
                    <Box sx={{ height: 250 }}>
                      {progressChartData.dates.length > 1 ? (
                        <LineChart
                          xAxis={[
                            {
                              data: progressChartData.dates,
                              scaleType: 'point',
                            },
                          ]}
                          series={[
                            {
                              data: progressChartData.weight,
                              label: 'Weight (kg)',
                              color: '#2e7d32',
                            },
                          ]}
                          height={240}
                          margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <Typography color='text.secondary'>
                            Not enough data points
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Notes & Updates Tab */}
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              {isEditing ? (
                <>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label='Current Weight (kg)'
                      type='number'
                      value={
                        editableProgress.currentWeight || progress.currentWeight
                      }
                      onChange={(e) =>
                        handleProgressChange(
                          'currentWeight',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label='Adherence (%)'
                      type='number'
                      inputProps={{ min: 0, max: 100 }}
                      value={editableProgress.adherence || progress.adherence}
                      onChange={(e) =>
                        handleProgressChange(
                          'adherence',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label='Weight Change (kg)'
                      type='number'
                      value={
                        editableProgress.weightChange || progress.weightChange
                      }
                      onChange={(e) =>
                        handleProgressChange(
                          'weightChange',
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label='Progress Notes'
                      multiline
                      rows={4}
                      value={editableProgress.notes || assignment.notes || ''}
                      onChange={(e) =>
                        handleProgressChange('notes', e.target.value)
                      }
                      placeholder='Add progress notes, observations, or adjustments made...'
                    />
                  </Grid>
                </>
              ) : (
                <Grid size={{ xs: 12 }}>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    <strong>Last Updated:</strong>{' '}
                    {assignment.progress?.lastUpdated
                      ? new Date(
                          assignment.progress.lastUpdated
                        ).toLocaleDateString()
                      : 'Not updated yet'}
                  </Typography>
                  <Typography variant='body2'>
                    <strong>Notes:</strong>
                  </Typography>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mt: 1, whiteSpace: 'pre-wrap' }}
                  >
                    {assignment.progress?.notes ||
                      assignment.notes ||
                      'No notes available'}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant='outlined'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgressModal;
