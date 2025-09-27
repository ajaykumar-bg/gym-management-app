/**
 * Assign Plan Modal Component
 * Modal for assigning diet plans to members
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
} from '@mui/material';
import {
  Close as CloseIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Restaurant as RestaurantIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useDietPlan } from '../context';
import { DIET_PLAN_TYPE_LABELS, DIET_GOAL_LABELS } from '../constants';

const MemberCard = ({ member, selected, onClick }) => (
  <Card
    variant='outlined'
    sx={{
      cursor: 'pointer',
      border: selected ? 2 : 1,
      borderColor: selected ? 'primary.main' : 'divider',
      bgcolor: selected ? 'primary.50' : 'background.paper',
      '&:hover': {
        borderColor: 'primary.main',
        bgcolor: 'primary.50',
      },
    }}
    onClick={onClick}
  >
    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {member.name.charAt(0)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant='subtitle1' fontWeight='medium'>
            {member.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {member.email}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Chip
              label={member.membershipType}
              size='small'
              variant='outlined'
            />
            <Chip
              label={member.status}
              size='small'
              color={member.status === 'active' ? 'success' : 'default'}
            />
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const PlanCard = ({ plan, selected, onClick }) => {
  const totalCalories = plan.meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  return (
    <Card
      variant='outlined'
      sx={{
        cursor: 'pointer',
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        bgcolor: selected ? 'primary.50' : 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box>
          <Typography variant='subtitle1' fontWeight='medium' gutterBottom>
            {plan.name}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              mb: 1,
            }}
          >
            {plan.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            <Chip
              label={DIET_PLAN_TYPE_LABELS[plan.type]}
              size='small'
              color='primary'
              variant='outlined'
            />
            {plan.goals.slice(0, 2).map((goal) => (
              <Chip
                key={goal}
                label={DIET_GOAL_LABELS[goal]}
                size='small'
                variant='outlined'
              />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='caption' color='text.secondary'>
              {plan.meals.length} meals • {totalCalories} cal/day
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {plan.duration} days
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const AssignPlanModal = ({ open, onClose, preselectedPlan = null }) => {
  const { members, dietPlans, assignDietPlan } = useDietPlan();

  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [planSearch, setPlanSearch] = useState('');

  const [errors, setErrors] = useState({});

  // Filter active plans and members
  const activePlans = useMemo(() => {
    return dietPlans.filter((plan) => plan.isActive);
  }, [dietPlans]);

  const activeMembers = useMemo(() => {
    return members.filter((member) => member.status === 'active');
  }, [members]);

  // Filter members and plans based on search
  const filteredMembers = useMemo(() => {
    return activeMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
        member.email.toLowerCase().includes(memberSearch.toLowerCase())
    );
  }, [activeMembers, memberSearch]);

  const filteredPlans = useMemo(() => {
    return activePlans.filter(
      (plan) =>
        plan.name.toLowerCase().includes(planSearch.toLowerCase()) ||
        plan.description.toLowerCase().includes(planSearch.toLowerCase())
    );
  }, [activePlans, planSearch]);

  // Calculate end date based on selected plan
  const endDate = useMemo(() => {
    if (selectedPlan && startDate) {
      const start = new Date(startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + selectedPlan.duration);
      return end.toISOString().split('T')[0];
    }
    return '';
  }, [selectedPlan, startDate]);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedMember) {
      newErrors.member = 'Please select a member';
    }

    if (!selectedPlan) {
      newErrors.plan = 'Please select a diet plan';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      assignDietPlan({
        memberId: selectedMember.id,
        memberName: selectedMember.name,
        dietPlanId: selectedPlan.id,
        startDate,
        endDate,
        notes,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedMember(null);
    setSelectedPlan(preselectedPlan);
    setStartDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setMemberSearch('');
    setPlanSearch('');
    setErrors({});
    onClose();
  };

  React.useEffect(() => {
    if (preselectedPlan) {
      setSelectedPlan(preselectedPlan);
    }
  }, [preselectedPlan]);

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
            <AssignmentIcon />
            <Typography variant='h6' component='span'>
              Assign Diet Plan
            </Typography>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Member Selection */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <PersonIcon />
                Select Member
                {errors.member && (
                  <Typography variant='caption' color='error'>
                    *
                  </Typography>
                )}
              </Typography>
              <TextField
                fullWidth
                placeholder='Search members...'
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>

            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {filteredMembers.length === 0 ? (
                <Typography
                  color='text.secondary'
                  sx={{ textAlign: 'center', py: 4 }}
                >
                  {memberSearch
                    ? 'No members found matching your search'
                    : 'No active members available'}
                </Typography>
              ) : (
                filteredMembers.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    selected={selectedMember?.id === member.id}
                    onClick={() => setSelectedMember(member)}
                  />
                ))
              )}
            </Box>
          </Grid>

          {/* Plan Selection */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <RestaurantIcon />
                Select Diet Plan
                {errors.plan && (
                  <Typography variant='caption' color='error'>
                    *
                  </Typography>
                )}
              </Typography>
              <TextField
                fullWidth
                placeholder='Search diet plans...'
                value={planSearch}
                onChange={(e) => setPlanSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>

            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {filteredPlans.length === 0 ? (
                <Typography
                  color='text.secondary'
                  sx={{ textAlign: 'center', py: 4 }}
                >
                  {planSearch
                    ? 'No plans found matching your search'
                    : 'No active diet plans available'}
                </Typography>
              ) : (
                filteredPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedPlan?.id === plan.id}
                    onClick={() => setSelectedPlan(plan)}
                  />
                ))
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Assignment Details */}
        {selectedMember && selectedPlan && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <CalendarIcon />
              Assignment Details
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Start Date'
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  error={!!errors.startDate}
                  helperText={errors.startDate}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='End Date'
                  type='date'
                  value={endDate}
                  InputProps={{ readOnly: true }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Duration'
                  value={`${selectedPlan.duration} days`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label='Notes (Optional)'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              placeholder='Add any special instructions or notes for this assignment...'
            />

            {/* Assignment Summary */}
            <Card
              variant='outlined'
              sx={{ mt: 2, bgcolor: 'background.default' }}
            >
              <CardContent>
                <Typography
                  variant='subtitle1'
                  fontWeight='medium'
                  gutterBottom
                >
                  Assignment Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Member:</strong> {selectedMember.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Email:</strong> {selectedMember.email}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Diet Plan:</strong> {selectedPlan.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      <strong>Type:</strong>{' '}
                      {DIET_PLAN_TYPE_LABELS[selectedPlan.type]}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={handleClose} variant='outlined'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!selectedMember || !selectedPlan}
        >
          Assign Plan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignPlanModal;
