import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  Box,
  Tabs,
  Tab,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  IconButton,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Cake,
  Home,
  ContactEmergency,
  Star,
  Group,
  FitnessCenter,
  Assignment,
  TrendingUp,
  Edit,
  Close,
  WorkHistory,
} from '@mui/icons-material';
import {
  calculateAge,
  getSpecializationsText,
  getTrainerStatusColor,
  calculateCapacityUtilization,
  getCapacityColor,
  formatWorkSchedule,
  getCertificationStatusColor,
  generatePerformanceSummary,
} from '../utils';

const TrainerProfile = ({ trainer, onEdit, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!trainer) return null;

  const age = calculateAge(trainer.dateOfBirth);
  const capacityUtilization = calculateCapacityUtilization(
    trainer.currentClients,
    trainer.maxClients
  );
  const performanceSummary = generatePerformanceSummary(trainer);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Card sx={{ maxWidth: 1000, mx: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>
            {trainer.name.charAt(0)}
          </Avatar>
        }
        title={<Typography variant='h4'>{trainer.name}</Typography>}
        subheader={
          <Box sx={{ mt: 1 }}>
            <Chip
              label={trainer.status.toUpperCase()}
              color={getTrainerStatusColor(trainer.status)}
              size='small'
              sx={{ mr: 1 }}
            />
            <Chip
              label={getSpecializationsText(
                trainer.specializations.slice(0, 2)
              )}
              color='primary'
              size='small'
            />
          </Box>
        }
        action={
          <Box>
            {onEdit && (
              <IconButton onClick={() => onEdit(trainer)} sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
            )}
            {onClose && (
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            )}
          </Box>
        }
      />

      <CardContent>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Personal Info' />
          <Tab label='Professional' />
          <Tab label='Schedule' />
          <Tab label='Performance' />
          <Tab label='Clients' />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display='flex' alignItems='center' mb={2}>
                <Person sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Full Name
                  </Typography>
                  <Typography variant='h6'>{trainer.name}</Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='center' mb={2}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Email
                  </Typography>
                  <Typography variant='h6'>{trainer.email}</Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='center' mb={2}>
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Phone
                  </Typography>
                  <Typography variant='h6'>{trainer.phone}</Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='center' mb={2}>
                <Cake sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Age
                  </Typography>
                  <Typography variant='h6'>{age} years old</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box display='flex' alignItems='flex-start' mb={2}>
                <Home sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Address
                  </Typography>
                  <Typography variant='body1'>{trainer.address}</Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='flex-start' mb={2}>
                <ContactEmergency
                  sx={{ mr: 2, color: 'primary.main', mt: 0.5 }}
                />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Emergency Contact
                  </Typography>
                  <Typography variant='body1'>
                    {trainer.emergencyContact.name} (
                    {trainer.emergencyContact.relationship})
                    <br />
                    {trainer.emergencyContact.phone}
                  </Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='flex-start' mb={2}>
                <WorkHistory sx={{ mr: 2, color: 'primary.main', mt: 0.5 }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Employment
                  </Typography>
                  <Typography variant='body1'>
                    Hired: {new Date(trainer.hireDate).toLocaleDateString()}
                    <br />
                    {trainer.yearsAtGym} years at gym
                  </Typography>
                </Box>
              </Box>

              {trainer.bio && (
                <Box>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    gutterBottom
                  >
                    Bio
                  </Typography>
                  <Typography variant='body1'>{trainer.bio}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Specializations
              </Typography>
              <Box sx={{ mb: 3 }}>
                {trainer.specializations.map((spec, index) => (
                  <Chip
                    key={index}
                    label={spec}
                    sx={{ mr: 1, mb: 1 }}
                    color='primary'
                    variant='outlined'
                  />
                ))}
              </Box>

              <Typography variant='h6' gutterBottom>
                Experience
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant='body1'>
                  {trainer.experience} level - {trainer.yearsAtGym} years at gym
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Hourly Rate: ${trainer.hourlyRate}
                </Typography>
              </Box>

              <Typography variant='h6' gutterBottom>
                Achievements
              </Typography>
              <List dense>
                {trainer.achievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Star color='warning' />
                    </ListItemIcon>
                    <ListItemText primary={achievement} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Certifications
              </Typography>
              <Box sx={{ mb: 3 }}>
                {trainer.certifications.map((cert, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='flex-start'
                    >
                      <Box>
                        <Typography variant='subtitle1' fontWeight='bold'>
                          {cert.name}
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                          {cert.issuedBy}
                        </Typography>
                        <Typography variant='caption'>
                          Issued:{' '}
                          {new Date(cert.issueDate).toLocaleDateString()}
                          <br />
                          Expires:{' '}
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={cert.status.toUpperCase()}
                        color={getCertificationStatusColor(cert.status)}
                        size='small'
                      />
                    </Box>
                  </Paper>
                ))}
              </Box>

              <Typography variant='h6' gutterBottom>
                Social Media
              </Typography>
              {trainer.socialMedia && (
                <Box>
                  {Object.entries(trainer.socialMedia).map(
                    ([platform, handle]) => (
                      <Typography
                        key={platform}
                        variant='body2'
                        sx={{ mb: 0.5 }}
                      >
                        <strong>{platform}:</strong> {handle}
                      </Typography>
                    )
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Weekly Schedule
              </Typography>
              <Paper sx={{ p: 2 }}>
                <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {formatWorkSchedule(trainer.workSchedule)}
                </pre>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Availability Settings
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='textSecondary'>
                  Available Time Slots
                </Typography>
                {trainer.availability.map((slot, index) => (
                  <Chip
                    key={index}
                    label={slot}
                    sx={{ mr: 1, mb: 1 }}
                    color='info'
                    variant='outlined'
                  />
                ))}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='textSecondary'>
                  Maximum Clients per Day
                </Typography>
                <Typography variant='h6'>
                  {trainer.maxClientsPerDay} clients
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant='body2' color='textSecondary'>
                  Client Capacity
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <LinearProgress
                    variant='determinate'
                    value={capacityUtilization}
                    color={getCapacityColor(capacityUtilization)}
                    sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant='body2'>
                    {trainer.currentClients}/{trainer.maxClients} (
                    {capacityUtilization}%)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Star sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant='h4'>
                  {trainer.averageRating.toFixed(1)}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Average Rating
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Assignment sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant='h4'>{trainer.totalSessions}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  Total Sessions
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <TrendingUp
                  sx={{ fontSize: 40, color: 'success.main', mb: 1 }}
                />
                <Typography variant='h4'>
                  {trainer.clientRetentionRate}%
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  Client Retention
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
                Performance Summary
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Typography variant='body1' gutterBottom>
                  <strong>Overall Score:</strong>{' '}
                  {performanceSummary.overallScore}/100
                </Typography>

                {performanceSummary.strengths.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant='subtitle2'
                      color='success.main'
                      gutterBottom
                    >
                      Strengths:
                    </Typography>
                    <List dense>
                      {performanceSummary.strengths.map((strength, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={strength} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {performanceSummary.areasForImprovement.length > 0 && (
                  <Box>
                    <Typography
                      variant='subtitle2'
                      color='warning.main'
                      gutterBottom
                    >
                      Areas for Improvement:
                    </Typography>
                    <List dense>
                      {performanceSummary.areasForImprovement.map(
                        (area, index) => (
                          <ListItem key={index}>
                            <ListItemText primary={area} />
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Client Overview
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body1'>Current Clients</Typography>
                  <Typography variant='h6'>{trainer.currentClients}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body1'>Maximum Capacity</Typography>
                  <Typography variant='h6'>{trainer.maxClients}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Typography variant='body1'>Utilization Rate</Typography>
                  <Chip
                    label={`${capacityUtilization}%`}
                    color={getCapacityColor(capacityUtilization)}
                    size='small'
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Client Management
              </Typography>
              <Box>
                <Button
                  variant='contained'
                  startIcon={<Group />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  View All Clients
                </Button>
                <Button
                  variant='outlined'
                  startIcon={<Person />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Assign New Client
                </Button>
                <Button
                  variant='outlined'
                  startIcon={<FitnessCenter />}
                  fullWidth
                >
                  Create Workout Plan
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography variant='body2' color='textSecondary' sx={{ mt: 2 }}>
                Client list and management features will be implemented in
                future updates.
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default TrainerProfile;
