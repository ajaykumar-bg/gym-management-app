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
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Cake,
  Home,
  ContactEmergency,
  LocalHospital,
  FitnessCenter,
} from '@mui/icons-material';
import {
  calculateAge,
  calculateBMI,
  getBMICategory,
  getLatestMeasurements,
} from '../utils';

const MemberProfile = ({ member, onEdit, onClose, isOwnProfile = false }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!member) return null;

  const age = calculateAge(member.dateOfBirth);
  const latestMeasurements = getLatestMeasurements(member);
  const bmi = latestMeasurements
    ? calculateBMI(latestMeasurements.weight, latestMeasurements.height)
    : null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 80, height: 80, fontSize: '2rem' }}>
            {member.firstName
              ? member.firstName[0]
              : member.name
              ? member.name[0]
              : '?'}
            {member.lastName
              ? member.lastName[0]
              : member.name
              ? member.name.split(' ')[1]?.[0] || ''
              : ''}
          </Avatar>
        }
        title={
          <Typography variant='h4'>
            {member.firstName && member.lastName
              ? `${member.firstName} ${member.lastName}`
              : member.name || 'Unknown Member'}
          </Typography>
        }
        subheader={
          <Box sx={{ mt: 1 }}>
            <Chip
              label={(
                member.membershipInfo?.status ||
                member.status ||
                'active'
              ).toUpperCase()}
              color='success'
              size='small'
              sx={{ mr: 1 }}
            />
            <Chip
              label={(
                member.membershipInfo?.type ||
                member.membershipType ||
                'basic'
              ).toUpperCase()}
              color='primary'
              size='small'
            />
          </Box>
        }
        action={
          <Box>
            {!isOwnProfile && onEdit && (
              <Button
                variant='outlined'
                onClick={() => onEdit(member)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
            )}
            {!isOwnProfile && onClose && (
              <Button variant='text' onClick={onClose}>
                Close
              </Button>
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
          <Tab label='Health Records' />
          <Tab label='Measurements' />
          <Tab label='Membership' />
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
                  <Typography variant='h6'>
                    {member.firstName && member.lastName
                      ? `${member.firstName} ${member.lastName}`
                      : member.name || 'Unknown Member'}
                  </Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='center' mb={2}>
                <Email sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Email
                  </Typography>
                  <Typography variant='h6'>{member.email}</Typography>
                </Box>
              </Box>

              <Box display='flex' alignItems='center' mb={2}>
                <Phone sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Phone
                  </Typography>
                  <Typography variant='h6'>{member.phone}</Typography>
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
                  <Typography variant='body1'>
                    {member.address?.street ? (
                      <>
                        {member.address.street}
                        <br />
                        {member.address.city}, {member.address.state}{' '}
                        {member.address.zipCode}
                      </>
                    ) : (
                      member.address || 'No address provided'
                    )}
                  </Typography>
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
                    {member.emergencyContact?.name || 'No emergency contact'}
                    {member.emergencyContact?.relation &&
                      ` (${member.emergencyContact.relation})`}
                    {member.emergencyContact?.relationship &&
                      ` (${member.emergencyContact.relationship})`}
                    <br />
                    {member.emergencyContact?.phone || 'No phone provided'}
                  </Typography>
                </Box>
              </Box>

              {member.notes && (
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Notes
                  </Typography>
                  <Typography variant='body1'>{member.notes}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display='flex' alignItems='center' mb={2}>
                <LocalHospital sx={{ mr: 2, color: 'error.main' }} />
                <Box>
                  <Typography variant='body2' color='textSecondary'>
                    Blood Group
                  </Typography>
                  <Typography variant='h6'>
                    {member.healthInfo?.bloodGroup || 'Not specified'}
                  </Typography>
                </Box>
              </Box>

              <Box mb={2}>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Allergies
                </Typography>
                <Box>
                  {member.healthInfo?.allergies?.length > 0 ? (
                    member.healthInfo.allergies.map((allergy, index) => (
                      <Chip
                        key={index}
                        label={allergy}
                        size='small'
                        sx={{ mr: 1, mb: 1 }}
                        color='warning'
                      />
                    ))
                  ) : (
                    <Typography variant='body2' color='textSecondary'>
                      None reported
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Medical Conditions
                </Typography>
                <Box>
                  {member.healthInfo?.medicalConditions?.length > 0 ? (
                    member.healthInfo.medicalConditions.map(
                      (condition, index) => (
                        <Chip
                          key={index}
                          label={condition}
                          size='small'
                          sx={{ mr: 1, mb: 1 }}
                          color='error'
                        />
                      )
                    )
                  ) : (
                    <Typography variant='body2' color='textSecondary'>
                      None reported
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box mb={2}>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  Current Medications
                </Typography>
                <Box>
                  {member.healthInfo?.medications?.length > 0 ? (
                    member.healthInfo.medications.map((medication, index) => (
                      <Chip
                        key={index}
                        label={medication}
                        size='small'
                        sx={{ mr: 1, mb: 1 }}
                        color='info'
                      />
                    ))
                  ) : (
                    <Typography variant='body2' color='textSecondary'>
                      None reported
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          {latestMeasurements ? (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='h6' gutterBottom>
                  Body Composition
                </Typography>
                <Box mb={2}>
                  <Typography variant='body2' color='textSecondary'>
                    Weight
                  </Typography>
                  <Typography variant='h5'>
                    {latestMeasurements.weight} kg
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2' color='textSecondary'>
                    Height
                  </Typography>
                  <Typography variant='h5'>
                    {latestMeasurements.height} cm
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2' color='textSecondary'>
                    BMI
                  </Typography>
                  <Typography variant='h5'>
                    {bmi}{' '}
                    <Chip
                      label={getBMICategory(bmi)}
                      size='small'
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='h6' gutterBottom>
                  Body Fat & Muscle
                </Typography>
                <Box mb={2}>
                  <Typography variant='body2' color='textSecondary'>
                    Body Fat
                  </Typography>
                  <Typography variant='h5'>
                    {latestMeasurements.bodyFat}%
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography variant='body2' color='textSecondary'>
                    Muscle Mass
                  </Typography>
                  <Typography variant='h5'>
                    {latestMeasurements.muscleMass} kg
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant='h6' gutterBottom>
                  Body Measurements
                </Typography>
                <Box display='flex' flexDirection='column' gap={1}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>Chest:</Typography>
                    <Typography variant='body1'>
                      {latestMeasurements.measurements.chest} cm
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>Waist:</Typography>
                    <Typography variant='body1'>
                      {latestMeasurements.measurements.waist} cm
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>Hips:</Typography>
                    <Typography variant='body1'>
                      {latestMeasurements.measurements.hips} cm
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>Biceps:</Typography>
                    <Typography variant='body1'>
                      {latestMeasurements.measurements.biceps} cm
                    </Typography>
                  </Box>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography variant='body2'>Thighs:</Typography>
                    <Typography variant='body1'>
                      {latestMeasurements.measurements.thighs} cm
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant='caption' color='textSecondary'>
                  Last updated:{' '}
                  {new Date(latestMeasurements.date).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Box textAlign='center' py={4}>
              <FitnessCenter
                sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }}
              />
              <Typography variant='h6' color='textSecondary'>
                No measurements recorded
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Add body measurements to track member progress
              </Typography>
            </Box>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Membership Details
              </Typography>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary'>
                  Membership Type
                </Typography>
                <Typography variant='h5'>
                  <Chip
                    label={(
                      member.membershipInfo?.type ||
                      member.membershipType ||
                      'basic'
                    ).toUpperCase()}
                    color='primary'
                    size='large'
                  />
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary'>
                  Status
                </Typography>
                <Typography variant='h5'>
                  <Chip
                    label={(
                      member.membershipInfo?.status ||
                      member.status ||
                      'active'
                    ).toUpperCase()}
                    color='success'
                    size='large'
                  />
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='h6' gutterBottom>
                Membership Duration
              </Typography>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary'>
                  Start Date
                </Typography>
                <Typography variant='h6'>
                  {member.membershipInfo?.startDate
                    ? new Date(
                        member.membershipInfo.startDate
                      ).toLocaleDateString()
                    : member.joinDate
                    ? new Date(member.joinDate).toLocaleDateString()
                    : 'Not specified'}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary'>
                  End Date
                </Typography>
                <Typography variant='h6'>
                  {member.membershipInfo?.endDate
                    ? new Date(
                        member.membershipInfo.endDate
                      ).toLocaleDateString()
                    : 'Not specified'}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant='body2' color='textSecondary'>
                  Join Date
                </Typography>
                <Typography variant='h6'>
                  {member.joinDate
                    ? new Date(member.joinDate).toLocaleDateString()
                    : 'Not specified'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default MemberProfile;
