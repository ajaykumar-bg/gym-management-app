import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  FitnessCenter,
  Person,
  Schedule,
} from '@mui/icons-material';

const WORKOUT_TYPES = {
  strength: 'Strength Training',
  cardio: 'Cardiovascular',
  flexibility: 'Flexibility',
  balance: 'Balance',
  hiit: 'HIIT',
  functional: 'Functional Training',
};

const DIFFICULTY_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const MOCK_WORKOUT_PLANS = [
  {
    id: 'WP001',
    name: 'Beginner Full Body',
    description: 'A comprehensive full-body workout for beginners',
    type: 'strength',
    difficulty: 'beginner',
    duration: 45,
    trainerId: '1',
    trainerName: 'John Smith',
    memberId: 'MEM001',
    memberName: 'John Doe',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: 10, rest: 60 },
      { name: 'Bodyweight Squats', sets: 3, reps: 15, rest: 60 },
      { name: 'Plank', sets: 3, duration: 30, rest: 30 },
      { name: 'Walking Lunges', sets: 2, reps: 10, rest: 45 },
    ],
    createdDate: '2024-01-15',
    lastModified: '2024-01-20',
  },
  {
    id: 'WP002',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for fat burning',
    type: 'hiit',
    difficulty: 'intermediate',
    duration: 30,
    trainerId: '3',
    trainerName: 'Mike Rodriguez',
    memberId: 'MEM002',
    memberName: 'Jane Smith',
    exercises: [
      { name: 'Burpees', sets: 4, reps: 8, rest: 20 },
      { name: 'Mountain Climbers', sets: 4, duration: 30, rest: 20 },
      { name: 'Jump Squats', sets: 4, reps: 12, rest: 20 },
      { name: 'High Knees', sets: 4, duration: 20, rest: 10 },
    ],
    createdDate: '2024-01-18',
    lastModified: '2024-01-25',
  },
];

const WorkoutPlanManagement = () => {
  const [workoutPlans, setWorkoutPlans] = useState(MOCK_WORKOUT_PLANS);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'strength',
    difficulty: 'beginner',
    duration: 30,
    exercises: [],
  });

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setFormData({
      name: '',
      description: '',
      type: 'strength',
      difficulty: 'beginner',
      duration: 30,
      exercises: [],
    });
    setShowForm(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      type: plan.type,
      difficulty: plan.difficulty,
      duration: plan.duration,
      exercises: [...plan.exercises],
    });
    setShowForm(true);
  };

  const handleSavePlan = () => {
    const planData = {
      ...formData,
      id: selectedPlan?.id || `WP${Date.now().toString().slice(-3)}`,
      trainerId: '1', // Current trainer
      trainerName: 'Current Trainer',
      memberId: 'TBD',
      memberName: 'To be assigned',
      createdDate:
        selectedPlan?.createdDate || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };

    if (selectedPlan) {
      setWorkoutPlans((prev) =>
        prev.map((plan) => (plan.id === selectedPlan.id ? planData : plan))
      );
    } else {
      setWorkoutPlans((prev) => [...prev, planData]);
    }

    setShowForm(false);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this workout plan?')) {
      setWorkoutPlans((prev) => prev.filter((plan) => plan.id !== planId));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Workout Plans
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={handleCreatePlan}
        >
          Create Plan
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workoutPlans.map((plan) => (
          <Grid key={plan.id} xs={12} md={6} lg={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader
                title={plan.name}
                subheader={
                  <Box>
                    <Chip
                      label={WORKOUT_TYPES[plan.type]}
                      color='primary'
                      size='small'
                      sx={{ mr: 1, mt: 1 }}
                    />
                    <Chip
                      label={DIFFICULTY_LEVELS[plan.difficulty]}
                      color='secondary'
                      size='small'
                      sx={{ mt: 1 }}
                    />
                  </Box>
                }
                action={
                  <Box>
                    <IconButton onClick={() => handleEditPlan(plan)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletePlan(plan.id)}
                      color='error'
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                  {plan.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant='body2'>
                    {plan.duration} minutes
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <FitnessCenter sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant='body2'>
                    {plan.exercises.length} exercises
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant='body2'>
                    Assigned to: {plan.memberName}
                  </Typography>
                </Box>

                <Typography variant='caption' color='text.secondary'>
                  Created: {new Date(plan.createdDate).toLocaleDateString()}
                  <br />
                  Modified: {new Date(plan.lastModified).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Workout Plan Form Dialog */}
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {selectedPlan ? 'Edit Workout Plan' : 'Create New Workout Plan'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Plan Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Description'
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Workout Type</InputLabel>
                  <Select
                    value={formData.type}
                    label='Workout Type'
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={formData.difficulty}
                    label='Difficulty'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        difficulty: e.target.value,
                      }))
                    }
                  >
                    {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label='Duration (minutes)'
                  type='number'
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: parseInt(e.target.value),
                    }))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant='h6' gutterBottom>
                  Exercises
                </Typography>
                {formData.exercises.length === 0 ? (
                  <Typography variant='body2' color='text.secondary'>
                    No exercises added yet. Exercise management will be
                    implemented in future updates.
                  </Typography>
                ) : (
                  <List>
                    {formData.exercises.map((exercise, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={exercise.name}
                          secondary={
                            exercise.reps
                              ? `${exercise.sets} sets × ${exercise.reps} reps`
                              : `${exercise.sets} sets × ${exercise.duration}s`
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
          <Button onClick={handleSavePlan} variant='contained'>
            {selectedPlan ? 'Update' : 'Create'} Plan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutPlanManagement;
